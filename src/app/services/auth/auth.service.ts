import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then( res => {
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
    firebase.auth().signOut();

    localStorage.removeItem('isLoggedIn');
  }

  getCurrentUserToken() {
    firebase.auth().currentUser.getIdToken()
                                .then(
                                  (token: string) => {
                                    localStorage.setItem('isLoggedIn', token);
                                  }
                                );
    localStorage.getItem('isLoggedIn');
  }

  isAuthenticated() {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }
}
