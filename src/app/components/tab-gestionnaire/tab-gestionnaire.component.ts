import { Component } from '@angular/core';
import { Gestionnaire } from '../../Model/GestionnaireClass';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

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
    this.RecupGestionnaire();
  }

  private loadGestionnaires(data : any) {
    this.tabGestionnaire = data.map((item: any) => new Gestionnaire(item.nom, item.prenom, item.email));
  }

  private RecupGestionnaire(){
    const options = {
      withCredentials: true
    };
    const result = this.http.get(`${environment.apiUrl}/admin/getGestionnaire`,options).subscribe(
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
      withCredentials: true
    };
    const body = {
      email: Gestionnaire.email
    };
    this.http.post(`${environment.apiUrl}/admin/deleteGestionnaire`, body, options).subscribe(
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
