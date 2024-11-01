import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-gestionnaire',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-gestionnaire.component.html',
  styleUrl: './create-gestionnaire.component.scss'
})
export class CreateGestionnaireComponent {

  public GestionnaireGroup! : FormGroup;

  public Message : string = '';

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.GestionnaireGroup = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
    });
  }

  submit() : void {
    this.Message = 'Création du gestionnaire en cours...';
    const body : any = {
      nom: this.GestionnaireGroup.value.nom,
      prenom: this.GestionnaireGroup.value.prenom,
      email: this.GestionnaireGroup.value.email
    };
    const options = {
      withCredentials: true 
    };
    this.http.post('http://localhost:3000/admin/createGestionnaire', body, options).subscribe(
      (response) => {
        this.Message = 'Gestionnaire créé';
      },
      (error) => {
        this.Message = 'Une erreur est survenue';
      }
    )
  }
}
