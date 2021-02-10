import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>()

  public authChanged = this._authChangeSub.asObservable();

  constructor(
    private _jwtHelper: JwtHelperService,
    private _http: HttpClient, 
    private _externalAuthService: SocialAuthService) {
    this._authChangeSub.next(this.isUserAuthenticated());
  }

  public getUser(){
    let decodedToken = this._jwtHelper.decodeToken(
      localStorage.getItem("token")
    );
    if (decodedToken == null) return null;
    return {
      name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      id: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"],
      role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  }

  public isUserAuthenticated = (): boolean => {
    return localStorage.getItem("token") != undefined;
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public externalLogin(data): Observable<any>{
    return this._http.post(environment.baseApiUrl + '/account/external-login', data);
  }
  
  public logout = () => { 
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public signOutExternal = ():void => {
    this.logout();
    this._externalAuthService.signOut();
  }
}
