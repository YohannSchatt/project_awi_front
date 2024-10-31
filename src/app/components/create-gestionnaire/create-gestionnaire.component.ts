import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    this.GestionnaireGroup = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
    });
  }

  submit() : void {
    console.log(this.GestionnaireGroup.value);
  }
}
