import { Component, OnInit } from '@angular/core';
import { ExternalAuth } from '../models/external-auth';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user:any = {};
  isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService) { }
  
  ngOnInit(): void {
    this.isUserAuthenticated = this._authService.isUserAuthenticated();
    if(this.isUserAuthenticated)
          this.user = this._authService.getUser();
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
  }

  public externalLogin = () => {
    this._authService.signInWithGoogle()
    .then(res => {
      const externalAuth: ExternalAuth = {
        provider: res.provider,
        idToken: res.idToken
      };

      this.validateExternalAuth(externalAuth);
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

  public externalLogout = () => {
    this._authService.signOutExternal();
  }
}
