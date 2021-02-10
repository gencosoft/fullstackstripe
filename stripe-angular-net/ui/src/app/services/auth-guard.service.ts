import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthenticationService, private router: Router) { }

  canActivate(){
    if(this._authService.isUserAuthenticated()) return true;

    this.router.navigate(['/']);
    return false;
  }
}
