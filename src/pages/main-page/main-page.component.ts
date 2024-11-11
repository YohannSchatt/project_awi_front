import { Component } from '@angular/core';
import { NavbarComponent } from '../../app/components/navbar/navbar.component';
import { AuthService } from '../../app/services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {}
