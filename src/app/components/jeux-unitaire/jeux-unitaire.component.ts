import { Component, Input, OnDestroy } from '@angular/core';
import { CatalogueItemResponseDto } from '../../services/catalogue2/catalogue-response.dto';
import { CatalogueService } from '../../services/catalogue/catalogue.service';
import { CatalogueService2 } from '../../services/catalogue2/catalogue2.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-jeux-unitaire',
  standalone: true,
  imports: [NgClass],
  templateUrl: './jeux-unitaire.component.html',
  styleUrl: './jeux-unitaire.component.scss'
})
export class JeuxUnitaireComponent {

byebye() {
  this.catalogueService2.unSelectJeu();
}
  @Input()
  selected : boolean = false;
  @Input() jeu: CatalogueItemResponseDto = new CatalogueItemResponseDto();

  unopath = "assets/image/uno.jpg";
  nopath = "";

  path = this.unopath;

  constructor(private catalogueService2: CatalogueService2) { }

  makeMeTheBoss() : void {
    this.catalogueService2.setSelectedJeu(this.jeu);
  }

}
