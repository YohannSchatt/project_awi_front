import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public userService : UserService) {}

  public logout() : void {
    this.userService.logout();
  }

  public isAuth() : boolean {
    if (this.userService.getUser() != null) {
      return true;
    }
    return false
  }

  public isAdmin() : boolean {
    if (this.userService.getUser() != null) {
      return this.userService.getRole() === 'ADMIN';
    }
    return false;
  }

  public isGestionnaire() : boolean {
    if (this.userService.getUser() != null) {
      return this.userService.getRole() === 'GESTIONNAIRE' || this.userService.getRole() === 'ADMIN';
    }
    return false;
  }

}
