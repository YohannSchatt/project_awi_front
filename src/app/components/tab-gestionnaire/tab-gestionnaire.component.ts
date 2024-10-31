import { Component } from '@angular/core';
import { Gestionnaire } from '../../Model/GestionnaireClass';

@Component({
  selector: 'app-tab-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './tab-gestionnaire.component.html',
  styleUrl: './tab-gestionnaire.component.scss'
})
export class TabGestionnaireComponent {

  public tabGestionnaire! : Gestionnaire[];

  ngOnInit() {
    this.loadGestionnaires();
  }

  private loadGestionnaires() {
    const data = require('./example.json');
    this.tabGestionnaire = data.map((item: any) => new Gestionnaire(item.nom, item.prenom, item.email));
  }

  public delete(){
    console.log("delete");
    this.tabGestionnaire.pop();
  }
}
