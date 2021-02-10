import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }
}
