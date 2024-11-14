import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VendeurInfoDto } from '../../services/vendeur/dto/vendeur.info.dto';
import { VendeurService } from '../../services/vendeur/vendeur.service';

@Component({
  selector: 'app-info-vendeur',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './info-vendeur.component.html',
  styleUrl: './info-vendeur.component.scss'
})
export class InfoVendeurComponent {

  @Input() vendeur : VendeurInfoDto = new VendeurInfoDto();

  VendeurGroup!: FormGroup;

  Message: string = '';

  constructor(private vendeurService : VendeurService ) {  }

  ngOnInit(): void {
    this.VendeurGroup = new FormGroup({
      nom: new FormControl(this.vendeur.nom),
      prenom: new FormControl(this.vendeur.prenom),
      email: new FormControl(this.vendeur.email),
      numero: new FormControl(this.vendeur.numero),
    });
  }

  ngOnChanges(): void {
    this.VendeurGroup = new FormGroup({
      nom: new FormControl(this.vendeur.nom),
      prenom: new FormControl(this.vendeur.prenom),
      email: new FormControl(this.vendeur.email),
      numero : new FormControl(this.vendeur.numero),
    });
  }

  submit(): void{
    if (this.vendeur.idVendeur == -1){
      this.vendeur.nom = this.VendeurGroup.get('nom')?.value;
      this.vendeur.prenom = this.VendeurGroup.get('prenom')?.value;
      this.vendeur.email = this.VendeurGroup.get('email')?.value;
      this.vendeur.numero = this.VendeurGroup.get('numero')?.value;
      this.vendeurService.createVendeur(this.vendeur).subscribe(
        (data : VendeurInfoDto) => {
          this.Message = "Vendeur créé";
        }
      );
    }
    else {
      this.vendeur.nom = this.VendeurGroup.get('nom')?.value;
      this.vendeur.prenom = this.VendeurGroup.get('prenom')?.value;
      this.vendeur.email = this.VendeurGroup.get('email')?.value;
      this.vendeur.numero = this.VendeurGroup.get('numero')?.value;
      this.vendeurService.updateVendeur(this.vendeur).subscribe(
        (data : VendeurInfoDto) => {
          this.Message = "Vendeur mis à jour";
        }
      );
    }
  }

  createVendeur(): VendeurInfoDto{
    return new VendeurInfoDto();
  }

}
