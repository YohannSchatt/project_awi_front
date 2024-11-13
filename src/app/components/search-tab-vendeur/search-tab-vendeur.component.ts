import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VendeurInfoDto } from '../../services/vendeur/dto/vendeur.info.dto';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';


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

  idSelectedVendeur : number = -1;

  constructor(private http : HttpClient) {  }

  ngOnInit(): void {
    this.VendeurSearchGroup = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
    });
    this.loadVendeurs();
  }

  submit(): void{
    console.log("submit");
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

  loadVendeurs(): void {
    const data: VendeurInfoDto[] = require('./exemple.json');
    this.tabVendeur = data;
  }

  
}
