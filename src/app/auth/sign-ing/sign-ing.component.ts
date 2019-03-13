import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sign-ing',
  templateUrl: './sign-ing.component.html',
  styleUrls: ['./sign-ing.component.css']
})
export class SignIngComponent implements OnInit {

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
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
    });
  }

  signin() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.pass);
  }

}
