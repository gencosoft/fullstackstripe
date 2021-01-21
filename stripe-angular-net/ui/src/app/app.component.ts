import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe-angular';
  links = [
    {label:'PREBUILD CHECKOUT FLOW', route:'/prebuild-checkout'}, 
    {label:'CUSTOM PAYMENT FLOW', route:'/custom-payment'},
    {label:'SUBSCRIPTION', route:'/subscription'}
  ];
  activeLink = this.links[0];

}
