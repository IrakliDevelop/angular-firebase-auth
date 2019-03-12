import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import * as credentials from './config/credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: 'Cool App';
  token: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    firebase.initializeApp(credentials);
  }

  onLogout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken');
  }

}
