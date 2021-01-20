import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gotoDashboard(){
    // window.open('https://stripe.com/');
    window.location.href = 'https://stripe.com/';
  }
}
