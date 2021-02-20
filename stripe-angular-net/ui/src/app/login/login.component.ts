import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ExternalAuth } from '../models/external-auth';
import { AuthenticationService } from '../services/authentication.service';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  user:any = {};
  isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
      this.matIconRegistry.addSvgIcon("logo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    }

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
