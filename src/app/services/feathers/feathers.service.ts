import { Injectable, Inject, Optional } from '@angular/core';
import { FEATHERS_CONFIG, feathersConfig } from './feathers.config';
import { config } from './feathers.default.config';
import * as feathersClient from 'feathers/client';
import * as hooks from 'feathers-hooks';
import * as feathersAuthenticate from 'feathers-authentication-client';
import * as feathersSocket from 'feathers-socketio/client';
import * as socketio from 'socket.io-client';
import * as user_services from '../../shared/user/services';

@Injectable()
export class FeathersService implements user_services.userService {
  private _feathers: feathersClient.Application = null;
  private _socketio: socketio.Socket = null;
  public user: any = null;
  static count: number = 0;
  currentCounter;

  /**
   * 
   * @param config 
   */
  constructor(@Optional() @Inject(FEATHERS_CONFIG) private _config: feathersConfig) {
    if (this._config == null) this._config = config;
    this._initSocketClient();
    this._configureFeathers();
    FeathersService.count++;
    this.currentCounter = FeathersService.count;
  }

  /**
   * 
   */
  private _initSocketClient() {
    this._socketio = socketio(this._config.apiEndPoint);
    this._socketio.on('connect_error', (error) => {
      //TODO: Do something on socket connection error
    });
    this._socketio.on('connect_timeout', (error) => {
      //TODO: Do something on socket connection time out
    });
    this._socketio.on('connect', (status) => {
      //TODO: Do something on socket connection success
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
    this.user = null;
    return this._feathers.logout();
  }

  /** 
   * Check if user is authenticated
   * NOTE : You must authenticate if user is authenticated, this method DO NOT authenticated user even if payload is valid !!!
  */
  public isAuth(): Promise<boolean> {
    var isAuth = false, jwt = null, jwt_data = '';

    return new Promise((resolve, reject) => {
      this._feathers.passport.getJWT()
        .then((token) => {
          jwt = token;
          if (jwt !== null && jwt) {
            this._feathers.passport.verifyJWT(jwt)
              .then((data) => {
                jwt_data = data;
                isAuth = this._feathers.passport.payloadIsValid(jwt);
                resolve(isAuth);
              });
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
