import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SigninComponent implements OnInit {

  title = 'Cool App';
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

    if (!this.authService.isAuthenticated() && !!firebase.auth().currentUser) {
      this.authService.getCurrentUserToken(true);
    }
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
    });
  }

  signin() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.pass);
  }

}
