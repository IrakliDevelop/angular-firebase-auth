import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignIngComponent } from './auth/sign-ing/sign-ing.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';



const appRoutes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignIngComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignIngComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({})
  ],
  providers: [AuthService, AuthGuard, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
