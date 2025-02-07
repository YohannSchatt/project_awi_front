import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
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

@HostBinding('class.selected')
get hostSelected(): boolean {
  return this.selected;
}
  @Input()
  selected : boolean = false;
  @Input() jeu: CatalogueItemResponseDto = new CatalogueItemResponseDto();

  // Retire les anciens chemins unopath, nopath, path
  // Ajoute une propriété calculée pour construire la source de l'image
  get imageSrc(): string {
    return this.jeu.image
      ? 'data:image/png;base64,' + this.jeu.image
      : 'assets/image/notfound.png';
  }

  constructor(private catalogueService2: CatalogueService2) { }

  makeMeTheBoss() : void {
    this.catalogueService2.setSelectedJeu(this.jeu);
  }

}
