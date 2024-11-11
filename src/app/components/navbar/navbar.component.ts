import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public userService : UserService, public dialog: MatDialog, public router : Router, private auth : AuthService) {}


  public logout() : void {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.logout();
        this.router.navigate(['/gestion']);
      };
    });
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
