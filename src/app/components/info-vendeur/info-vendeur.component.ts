import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VendeurInfoDto } from '../../services/vendeur/dto/vendeur.info.dto';

@Component({
  selector: 'app-info-vendeur',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './info-vendeur.component.html',
  styleUrl: './info-vendeur.component.scss'
})
export class InfoVendeurComponent {

  constructor() {  }

  @Input() vendeur : VendeurInfoDto = new VendeurInfoDto();

  VendeurGroup!: FormGroup;

  Message: string = '';

  ngOnInit(): void {
    this.VendeurGroup = new FormGroup({
      nom: new FormControl(this.vendeur.nom),
      prenom: new FormControl(this.vendeur.prenom),
      email: new FormControl(this.vendeur.email),
    });
  }

  ngOnChanges(): void {
    this.VendeurGroup = new FormGroup({
      nom: new FormControl(this.vendeur.nom),
      prenom: new FormControl(this.vendeur.prenom),
      email: new FormControl(this.vendeur.email),
    });
  }

  submit(): void{
    console.log("submit");
  }

  createVendeur(): VendeurInfoDto{
    return new VendeurInfoDto();
  }

}
