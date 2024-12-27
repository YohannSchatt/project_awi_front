import { Component } from '@angular/core';
import { ConnexionComponent } from '../../../app/components/connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-connexion-page',
  standalone: true,
  imports: [ConnexionComponent, HttpClientModule],
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss'
})
export class ConnexionPageComponent {

}
