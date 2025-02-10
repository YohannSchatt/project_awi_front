import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from '../pages/public/home-page/home-page.component';
import { ConnexionPageComponent } from '../pages/gestion/connexion-page/connexion-page.component';
import { HomeGestionPageComponent } from '../pages/gestion/home-gestion-page/home-gestion-page.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { JeuBaseComponent } from './components/jeu-base/jeu-base.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    JeuBaseComponent,
    NavbarComponent,
    MatDialogModule,
    MatButtonModule,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jeutaro';

  OnConnexionPage : boolean = false;

  constructor(private router : Router, private auth : AuthService, private titleService : Title) { }

  async ngOnInit() {

    this.setTitle(this.title);

    await this.auth.isAuthenticated();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.OnConnexionPage = event.url === '/gestion';
    });
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
