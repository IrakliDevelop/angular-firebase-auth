import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private helper: JwtHelperService,
  ) {
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
          console.log('successfull sign up');
        },
        error => console.log);
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => {
          this.router.navigate(['home']);
          this.getCurrentUserToken();
          this.refresh();
        },
        error => console.log
      );
  }

  logout() {
    firebase.auth().signOut().then(res => {
      console.log(res);
    }, error => console.log(error));
    localStorage.removeItem('accessToken');
  }

  getCurrentUserToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          localStorage.setItem('accessToken', token);
        }
      );
    localStorage.getItem('accessToken');
  }

  isAuthenticated() {
    return !!(localStorage.getItem('accessToken'));
  }

  // TODO: implement
  refresh() {
    if (this.isAuthenticated()) {
      if (this.helper.getTokenExpirationDate() <= (new Date()).getMilliseconds() + 300000 /* 5 minutes*/) {
        this.getCurrentUserToken();
      }
    }
  }
}
