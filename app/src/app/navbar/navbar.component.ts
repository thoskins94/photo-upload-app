import { Component, OnInit } from '@angular/core';
import AuthService from '../auth/auth.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor( public nav: NavbarService ) {}
}
