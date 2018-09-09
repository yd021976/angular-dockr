import { Component, HostBinding, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';


import { themeItem } from '../shared/ui-components/nav-bar/nav-bar.component';
import * as sandbox from './sandbox-app';
import { BackdropComponent } from '../shared/ui-components/backdrop/backdrop.component';
import { OutletComponent } from '../shared/ui-components/outlet/outlet.component';
import { InitServiceErrorComponent } from './init-service-error/init-service-error.component';
import { IConnectionState } from '../shared/services/feathers/feathers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];

  // @HostBinding('@.disabled')
  @HostBinding('class') componentCssClass; // Binding for theme change
  private dialogConnection: MatDialogRef<InitServiceErrorComponent>;

  constructor(
    @Inject(sandbox.sandboxAppToken) public sandbox: sandbox.ISandboxApp,
    public router: Router,
    private dialogService: MatDialog) {
    this.sandbox.ApiServiceConnectionState$.subscribe((connectionState) => {
      this.onApiServiceConnection_change(connectionState);
    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  onLogin() {
    this.sandbox.navigateLogin();
  }
  onLogout() {
    this.sandbox.navigateLogout();
  }

  onApiServiceConnection_change(connectionStatus: IConnectionState) {
    switch (connectionStatus.isConnected) {
      // When connection is established, close modal if opened
      case true:
        if (this.dialogConnection) {
          this.dialogConnection.close();
          this.dialogConnection = null;
        }
        break;

      // If no connection, open dialog if not already opened
      case false:
        if (!this.dialogConnection) {
          this.dialogConnection = this.dialogService.open(InitServiceErrorComponent, { disableClose: true, data: { connectionAttemptCount: connectionStatus.attemptNumber } });
        } else {
          // If dialog already opened, then update connection attempt number
          this.dialogConnection.componentInstance.connectionAttemptCount = connectionStatus.attemptNumber;
        }
        break;

      // No default case because of boolean con only take 2 value. This line is here only to respect coding rules
      default:
        break;
    }
  }
}
