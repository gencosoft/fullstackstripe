import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  links = [
    {label:'PREBUILD CHECKOUT FLOW', route:'/prebuild-checkout'}, 
    {label:'CUSTOM PAYMENT FLOW', route:'/product'},
    {label:'SUBSCRIPTION', route:'/subscription'}
  ];
  activeLink = this.links[0];

  constructor() { }
}
