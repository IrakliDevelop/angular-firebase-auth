import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
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
        },
        error => console.log
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    firebase.auth().signOut().then(res => {
      console.log(res);
    }, error => console.log(error));
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
    return (localStorage.getItem('accessToken')) ? true : false;
  }
}
