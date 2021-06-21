import { Injectable } from '@angular/core';
import AuthService from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean;
  constructor(private authService: AuthService) {
    this.visible = false;
  }
  
  hide(){
    this.visible = false
  }

  show() {
    this.visible = true;
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }}
