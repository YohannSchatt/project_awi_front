import { Component } from '@angular/core';
import { CreateGestionnaireComponent } from "../../app/components/create-gestionnaire/create-gestionnaire.component";
import { TabGestionnaireComponent } from "../../app/components/tab-gestionnaire/tab-gestionnaire.component";

@Component({
  selector: 'app-gestion-gestionnaire-page',
  standalone: true,
  imports: [CreateGestionnaireComponent, TabGestionnaireComponent],
  templateUrl: './gestion-gestionnaire-page.component.html',
  styleUrl: './gestion-gestionnaire-page.component.scss'
})
export class GestionGestionnairePageComponent {

}
