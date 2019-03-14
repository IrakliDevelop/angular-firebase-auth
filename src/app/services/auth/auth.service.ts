import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private helper: JwtHelperService
  ) {
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
          console.log('successfull sign up');
        },
        error => console.log);
  }

  async signIn(email: string, password: string) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => {
          this.getCurrentUserToken(false);
          this.getRefreshToken();
          this.router.navigate(['home']).then((response) => {
              console.log(response);
            },
            error => console.error(error));
        },
        (error) => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut().then(res => {
      console.log(res);
    }, error => console.log(error));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getCurrentUserToken(refresh: boolean) {
    firebase.auth().currentUser.getIdToken(refresh)
      .then(
        (token: string) => {
          localStorage.setItem('accessToken', token);
          return token;
        }
      );
    localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    console.log('getRefreshToken() called');
    const refreshToken = firebase.auth().currentUser.refreshToken;
    if (!localStorage.getItem('refreshToken')) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    localStorage.getItem('refreshToken');
  }

  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    try {
      const expirationDate = this.helper.getTokenExpirationDate(token);
      return !!token && (expirationDate > (new Date()));
    } catch (err) {
      console.error('Token has not been set!!!');
    }
    return !!token;
  }

  // TODO: test
  refresh(): Observable<any> {
    return from(firebase.auth().currentUser.getIdToken(true));
  }
}
