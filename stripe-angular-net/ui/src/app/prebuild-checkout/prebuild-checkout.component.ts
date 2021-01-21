import { Component } from '@angular/core';

@Component({
  selector: 'app-prebuild-checkout',
  templateUrl: './prebuild-checkout.component.html',
  styleUrls: ['./prebuild-checkout.component.css']
})
export class PrebuildCheckoutComponent {
  count: number;

  constructor() {
    this.count = 0;
  }

  add(){
    this.count ++;
  }

  remove(){
    if(this.count > 0) this.count --;
  }
}
