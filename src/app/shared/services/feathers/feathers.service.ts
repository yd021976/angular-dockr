import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { FEATHERS_CONFIG, feathersConfig } from './feathers.config';
import { config } from './feathers.default.config';
import * as feathersClient from 'feathers/client';
import * as hooks from 'feathers-hooks';
import * as feathersAuthenticate from 'feathers-authentication-client';
import * as feathersSocket from 'feathers-socketio/client';
import * as socketio from 'socket.io-client';

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

@Injectable()
export class FeathersService {
  private _feathers: feathersClient.Application = null;
  private _socketio: socketio.Socket = null;
  private _eventHandlers: eventHandler[] = [];

  public isInit: boolean = false; // is service correctly connected ?
  static count: number = 0;
  private currentCounter: number = 0; // For debug purpose ONLY ==> Copy of static "count" property

  /**
   * 
   * @param config 
   */
  constructor(@Optional() @Inject(FEATHERS_CONFIG) private _config: feathersConfig) {
    if (this._config == null) this._config = config;
    FeathersService.count++;
    this.currentCounter = FeathersService.count;

    this._initSocketClient2();
    this._configureFeathers();
  }

  /**
   * Subscribe to SocketIo and Feathers events 
   * 
   * @param handler 
   */
  public subscribe(handler: eventHandler) {
    return this._eventHandlers.push(handler) - 1;
  }
  public unsubscribe(handlerRef: number) {
    this._eventHandlers.splice(handlerRef, 1);
  }
  /**
   * Initialize service
   * 
   * @param handler : Event handler callback to be notified of SokcetIO and Feathers events (@see eventHandler function type)
   */
  public initService() {
    // Initialize service
    return this._initSocketClient().then(() => {
      this._configureFeathers();
    });
  }

  /**
   * Notify subscribers of any event
   * 
   * @param eventName 
   * @param eventData 
   */
  private sendEvent(eventName: string, eventData: any) {
    this._eventHandlers.forEach(handler => {
      handler(eventName, eventData);
    })
  }

  private _initSocketClient2():void{
    this._socketio = socketio(this._config.apiEndPoint);
  }
  /**
   * 
   */
  private _initSocketClient(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this._socketio = socketio(this._config.apiEndPoint);
        /**
         * single shot event handler on "connect" and "connect error" : Set init flag
         */
        this._socketio.once('connect_error', (error) => {
          this.isInit = false;
          resolve(false);
        });
        this._socketio.once('connect', () => {
          this.isInit = true;
          resolve(true);
        });

        this._socketio.on('connect_error', (error) => {
          this.sendEvent('connect_error', error);
        });
        this._socketio.on('connect_timeout', (error) => {
          this.sendEvent('connect_timeout', error);
        });

        this._socketio.on('connect', (status) => {
          this.sendEvent('connect', status);
        });
      }
      // General socket error
      catch (error) {
        this.sendEvent('init_socket_error', error);
        reject(error);
      }
    })
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
      this.sendEvent('authenticated', event);
    });
    this._feathers.on('logout', (event) => {
      // TODO: Clear current user
      this._feathers.set('user', null);

      // Notify subscribers
      this.sendEvent('logout', event);
    });

    this._feathers.on('reauthentication-error', (event) => {
      this.sendEvent('reauthentication-error', event);

      if (event.data.name == 'TokenExpiredError') {
        const user = this._feathers.get('user');
        // if token has expired and user was anonymous, just auth again as anonymous
        if (user['anonymous']) this.authenticate({ strategy: 'anonymous' })
          .then(user => {
            this._feathers.set('user', user)
          })
          .catch(error => {
            let a = 0;
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
