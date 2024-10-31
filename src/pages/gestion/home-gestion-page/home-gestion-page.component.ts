import { Component } from '@angular/core';
import { UserService } from '../../../app/services/user/user.service';

@Component({
  selector: 'app-home-gestion-page',
  standalone: true,
  imports: [],
  templateUrl: './home-gestion-page.component.html',
  styleUrl: './home-gestion-page.component.scss'
})
export class HomeGestionPageComponent {

  constructor(private userService : UserService) {}

  ngOnInit() {
    console.log(this.userService.getUser());
    console.log(this.userService.getNom());
    console.log(this.userService.getPrenom());
    console.log(this.userService.getEmail());
  }

}
