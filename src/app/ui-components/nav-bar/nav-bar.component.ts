import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() themes: themeItem[] = [];
  @Input() isAuthenticated: boolean; // Is a user authenticated ?
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit();
  }

  onLogin() {
    this.login.emit();
  }

}

export interface themeItem {
  name: string;
  class_name: string;
}
