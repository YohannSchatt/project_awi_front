import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VendeurInfoDto } from '../../services/vendeur/dto/vendeur.info.dto';
import { NgClass } from '@angular/common';
import { VendeurService } from '../../services/vendeur/vendeur.service';
import { SearchVendeurDto } from '../../services/vendeur/dto/search-Vendeur.dto';


@Component({
  selector: 'app-search-tab-vendeur',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './search-tab-vendeur.component.html',
  styleUrl: './search-tab-vendeur.component.scss'
})
export class SearchTabVendeurComponent {

  @Output() vendeurSelected = new EventEmitter<VendeurInfoDto>();

  Message: string = '';

  VendeurSearchGroup!: FormGroup;

  tabVendeur : VendeurInfoDto[] = [];

  idSelectedVendeur : number;

  constructor(private vendeurService : VendeurService ) {
    this.idSelectedVendeur = -1;
    }

  ngOnInit(): void {
    this.VendeurSearchGroup = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
      numero: new FormControl(''),
    });
    this.loadVendeurs();
  }

  submit(): void{
    const searchVendeur : SearchVendeurDto = new SearchVendeurDto();
    searchVendeur.nom = this.VendeurSearchGroup.get('nom')?.value;
    searchVendeur.prenom = this.VendeurSearchGroup.get('prenom')?.value;
    searchVendeur.email = this.VendeurSearchGroup.get('email')?.value;
    searchVendeur.numero = this.VendeurSearchGroup.get('numero')?.value;
    this.loadVendeurs(searchVendeur);
  }

  chercher(vendeur : VendeurInfoDto): void{
    if (vendeur.idVendeur == this.idSelectedVendeur){
      this.idSelectedVendeur = -1;
      this.vendeurSelected.emit(new VendeurInfoDto());
    }
    else {
      this.idSelectedVendeur = vendeur.idVendeur;
      this.vendeurSelected.emit(vendeur);
    }

  }

  public loadVendeurs(vendeur? : SearchVendeurDto): void {
      this.vendeurService.getVendeurs(vendeur).subscribe(
      (data : VendeurInfoDto[]) => {
        this.tabVendeur = data;
        console.log("data");
      },
      (error) => {
        console.error('Error loading vendeurs:', error);
      }
    );
  }
  
}
