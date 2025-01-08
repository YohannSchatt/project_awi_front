import { Component, Input, OnDestroy } from '@angular/core';
import { InfoJeuUnitaireDto } from '../../services/catalogue/response-catalogue.dto';
import { CatalogueService } from '../../services/catalogue/catalogue.service';
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
  this.catalogueService.unSelectJeu();
}
  @Input()
  selected : boolean = false;
  @Input() jeu: InfoJeuUnitaireDto = new InfoJeuUnitaireDto();

  unopath = "assets/image/uno.jpg";
  nopath = "";

  path = this.unopath;

  constructor(private catalogueService: CatalogueService) { }

  makeMeTheBoss() : void {
    this.catalogueService.setSelectedJeu(this.jeu);
  }

}
