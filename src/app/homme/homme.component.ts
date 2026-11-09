import { Component } from '@angular/core';
import { Router, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css',
})
export class HommeComponent {
  constructor(private Route: Router) {}

  // declaration de vaiable
  menus:boolean = true
  redirecto() {
    this.Route.navigate(['/page']);
  }

  menu(){
    this.menus = !this.menus
  }
}
