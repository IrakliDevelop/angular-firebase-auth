import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-ing',
  templateUrl: './sign-ing.component.html',
  styleUrls: ['./sign-ing.component.css']
})
export class SignIngComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
    });
  }

  signin() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.pass);
  }

}
