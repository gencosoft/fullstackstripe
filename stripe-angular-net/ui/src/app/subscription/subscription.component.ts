import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit{
  isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService){ }

  ngOnInit(): void {
    this.isUserAuthenticated = this._authService.isUserAuthenticated();
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
  }

}
