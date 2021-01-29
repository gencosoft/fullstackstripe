import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  links = [
    {label:'PREBUILD CHECKOUT FLOW', route:'/prebuild-checkout'}, 
    {label:'CUSTOM PAYMENT FLOW', route:'/custom-flow'},
    {label:'SUBSCRIPTION', route:'/subscription'}
  ];
  activeLink = this.links[0];

  constructor(private _router: Router) { }

  navigate(route){
    this._router.navigate([route]);
  }
}
