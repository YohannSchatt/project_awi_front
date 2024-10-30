import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HomePageComponent } from '../pages/public/home-page/home-page.component';
import { ConnexionPageComponent } from '../pages/gestion/connexion-page/connexion-page.component';
import { HomeGestionPageComponent } from '../pages/gestion/home-gestion-page/home-gestion-page.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    HomePageComponent,
    ConnexionPageComponent,
    HomeGestionPageComponent,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'awi_front';
}
