import { Component } from '@angular/core';
import { ChangeMdpComponent } from '../../components/change-mdp/change-mdp.component';
import { InfoPersoComponent } from '../../components/info-perso/info-perso.component';

@Component({
  selector: 'app-mon-compte-page',
  standalone: true,
  imports: [ChangeMdpComponent, InfoPersoComponent],
  templateUrl: './mon-compte-page.component.html',
  styleUrl: './mon-compte-page.component.scss'
})
export class MonComptePageComponent {}
