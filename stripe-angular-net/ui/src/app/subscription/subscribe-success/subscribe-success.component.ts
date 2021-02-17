import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-subscribe-success',
  templateUrl: './subscribe-success.component.html',
  styleUrls: ['./subscribe-success.component.css']
})
export class SubscribeSuccessComponent implements OnInit {
  sessionId: string;
  customerId: string;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthenticationService) {
    this.sessionId =  this._route.snapshot.queryParams.sessionId;
  }

  ngOnInit(): void {
    let user = this._authService.getUser();
    this.customerId = user.id
  }
}
