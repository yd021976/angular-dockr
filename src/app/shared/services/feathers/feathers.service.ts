import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { FEATHERS_CONFIG, feathersConfig } from './feathers.config';
import { config } from './feathers.default.config';
import * as feathersClient from 'feathers/client';
import * as hooks from 'feathers-hooks';
import * as feathersAuthenticate from 'feathers-authentication-client';
import * as feathersSocket from 'feathers-socketio/client';
import * as socketio from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

export const feathersServiceToken: InjectionToken<FeathersService> = new InjectionToken<FeathersService>('FEATHERS_SERVICE_BASE');

/**
 * Event types
 */
export enum feathersEvents {
  'connect_error', // SocketIO connection error
  'connect_timeout', // SocketIO connect time out
  'connect', // SocketIO connect successfull
  'authenticated', // Feathers authenticate successfull
  'logout', // Feathers logout
  'reauthentication-error' // Feathers reauth. error
}

/**
 * SocketIO and Feathers Auth event handler callback signature 
 */
export type eventHandler = (eventName: string, eventData: any) => void;
export interface IConnectionState {
  isConnected: boolean;
  attemptNumber: number;
  connectionError: any;
  user: any;
}

@Injectable()
export class FeathersService {
  private _feathers: feathersClient.Application = null;
  private _socketio: socketio.Socket = null;
  private _eventHandlers: eventHandler[] = [];
  private connectionState: IConnectionState = { isConnected: false, attemptNumber: 0, connectionError: '', user: null }
  private currentCounter: number = 0; // For debug purpose ONLY ==> Copy of static "count" property

  public connectionState$: BehaviorSubject<IConnectionState>; // Service connection state observable

  static count: number = 0; // Class instances count

  /**
   * 
   * @param config 
   */
  constructor(@Optional() @Inject(FEATHERS_CONFIG) private _config: feathersConfig) {
    if (this._config == null) this._config = config;

    // Init Behavior subject for connection state
    this.connectionState
    this.connectionState$ = new BehaviorSubject<IConnectionState>(this.connectionState);

    // Class instance count 
    FeathersService.count++;
    this.currentCounter = FeathersService.count;

    this._initSocketClient();
    this._configureFeathers();
  }

  private _initSocketClient(): void {
    this._socketio = socketio(this._config.apiEndPoint);
    this._initSocketClientHandlers();
  }
  private _initSocketClientHandlers(): void {
    this._socketio.on('connect_error', (error) => {
      Object.assign(this.connectionState, { isConnected: false, connectionError: error });
      this.connectionState$.next(this.connectionState);
    });

    this._socketio.on('connect_timeout', (error) => {
      Object.assign(this.connectionState, { isConnected: false, connectionError: error });
      this.connectionState$.next(this.connectionState);
    });

    this._socketio.on('reconnect_attempt', (attempt) => {
      Object.assign(this.connectionState, { isConnected: false, attemptNumber: attempt });
      this.connectionState$.next(this.connectionState);
    })

    this._socketio.on('connect', (status) => {
      Object.assign(this.connectionState, { isConnected: true, connectionError: '', attemptNumber: 0 });
      this.connectionState$.next(this.connectionState);
    });
  }


  /**
   * 
   */
  private _configureFeathers() {
    this._feathers = feathersClient()
      .configure(feathersSocket(this._socketio))
      .configure(hooks())
      .configure(feathersAuthenticate({
        storage: window.localStorage
      }));

    this._feathers.on('authenticated', (event) => {
      Object.assign(this.connectionState, { user: this._feathers.get('user') });
      this.connectionState$.next(this.connectionState);
    });
    this._feathers.on('logout', (event) => {
      // Clear current user
      this._feathers.set('user', null);
      Object.assign(this.connectionState, { user: null });
      this.connectionState$.next(this.connectionState);
    });

    this._feathers.on('reauthentication-error', (event) => {
      if (event.data.name == 'TokenExpiredError') {
        const user = this._feathers.get('user');
        // if token has expired and user was anonymous, just auth again as anonymous
        if (user['anonymous']) this.authenticate({ strategy: 'anonymous' })
          .then(user => {
            this._feathers.set('user', user)
          })
          .catch(error => {
            Object.assign(this.connectionState, { user: null });
            this.connectionState$.next(this.connectionState);
          });
      }
    });
  }

  public service(name: string): feathersClient.Service<any> {
    return this._feathers.service(name);
  }

  /**
   * Authenticate user and sets <user> property of this service
   */
  public authenticate(credentials?): Promise<any> {
    return this._feathers.authenticate(credentials ? credentials : {})
      .then(response => {
        return this._feathers.passport.verifyJWT(response.accessToken)
      })
      .then((payload: any) => {
        return this._feathers.service('users').get(payload.userId);
      })
      .then(user => {
        this._feathers.set('user', user);
        return user;
      })
  }

  public logout(): Promise<any> {
    return this._feathers.logout();
  }

  /** 
   * Check if user is authenticated.
   * 
   * NOTE : 
   * - For anonymous users, return FALSE
   * - You must authenticate if user is authenticated, this method DO NOT authenticated user even if payload is valid !!!
  */
  public isAuth(): Promise<boolean> {
    var isAuth = false, jwt = null, jwt_data = '';

    return new Promise((resolve, reject) => {
      this._feathers.passport.getJWT()
        .then((token) => {
          jwt = token;
          if (jwt !== null && jwt !== undefined) {
            this._feathers.passport.verifyJWT(jwt)
              .then((data) => {
                jwt_data = data;
                isAuth = this._feathers.passport.payloadIsValid(jwt);
                resolve(isAuth);
              })
              .catch(error => resolve(isAuth))
          } else {
            resolve(isAuth);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
