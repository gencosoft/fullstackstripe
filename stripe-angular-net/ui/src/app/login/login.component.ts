import { Component } from '@angular/core';
import { ExternalAuth } from '../models/external-auth';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  user:any = {};
  isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService) { }

  public externalLogin = () => {
    this._authService.signInWithGoogle()
    .then(res => {
      this.validateExternalAuth({
        provider: res.provider,
        idToken: res.idToken
      });
    }, error => console.log('error-signin', error))
  }

  private validateExternalAuth(externalAuth: ExternalAuth) {
    this._authService.externalLogin(externalAuth)
      .subscribe(res => {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.user = this._authService.getUser();
      },
      error => {
        console.log('validation-error', error);
        this._authService.signOutExternal();
      });
  }
}
