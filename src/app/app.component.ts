import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from '../pages/public/home-page/home-page.component';
import { ConnexionPageComponent } from '../pages/gestion/connexion-page/connexion-page.component';
import { HomeGestionPageComponent } from '../pages/gestion/home-gestion-page/home-gestion-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, ConnexionPageComponent, HomeGestionPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'awi_front';
}
