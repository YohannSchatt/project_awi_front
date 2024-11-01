import { Component } from '@angular/core';
import { Gestionnaire } from '../../Model/GestionnaireClass';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './tab-gestionnaire.component.html',
  styleUrl: './tab-gestionnaire.component.scss'
})
export class TabGestionnaireComponent {

  public tabGestionnaire! : Gestionnaire[];

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.loadGestionnaires(this.RecupGestionnaire());
  }

  private loadGestionnaires(data : any) {
    this.tabGestionnaire = data.map((item: any) => new Gestionnaire(item.nom, item.prenom, item.email));
  }

  private RecupGestionnaire(){
    const options = {
      withCredentials: true // This is the key part to include cookies
    };
    const result = this.http.get('http://localhost:3000/admin/getGestionnaire',options).subscribe(
      (response) => {
        this.loadGestionnaires(response);
      },
      (error) => {
        this.tabGestionnaire = [];
      }
    )
  }

  public delete(Gestionnaire : Gestionnaire){
    const options = {
      withCredentials: true // This is the key part to include cookies
    };
    const body = {
      email: Gestionnaire.email
    };
    this.http.post('http://localhost:3000/admin/deleteGestionnaire', body, options).subscribe(
      (response) => {
        console.log(response);
        this.tabGestionnaire = this.tabGestionnaire.filter((item) => item.email !== Gestionnaire.email);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
