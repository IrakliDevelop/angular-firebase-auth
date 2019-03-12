import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { JWT_OPTIONS, JwtInterceptor, JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
    localStorage.removeItem('refreshToken');
  }

  getCurrentUserToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          localStorage.setItem('accessToken', token);
          return token;
        }
      );
    localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    if (!!localStorage.getItem('refreshToken')) {
      localStorage.setItem('refreshToken', firebase.auth().currentUser.refreshToken);
    }
    localStorage.getItem('refreshToken');
  }

  isAuthenticated() {
    return !!(localStorage.getItem('accessToken'));
  }

  // TODO: implement
  refresh() {
    this.getCurrentUserToken();
    this.getRefreshToken();
  }
}
