import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

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
    ) { }

    ngOnInit() {
      firebase.initializeApp({
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: ''
      });
    }

    onLogout() {

    }

    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') ? true : false;
    }
}
