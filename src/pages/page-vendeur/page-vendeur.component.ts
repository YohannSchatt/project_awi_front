import { Component } from '@angular/core';
import { InfoVendeurComponent } from '../../app/components/info-vendeur/info-vendeur.component';
import { SearchTabVendeurComponent } from '../../app/components/search-tab-vendeur/search-tab-vendeur.component';
import { VendeurInfoDto } from '../../app/services/vendeur/dto/vendeur.info.dto';

@Component({
  selector: 'app-page-vendeur',
  standalone: true,
  imports: [InfoVendeurComponent, SearchTabVendeurComponent],
  templateUrl: './page-vendeur.component.html',
  styleUrl: './page-vendeur.component.scss'
})
export class PageVendeurComponent {
  selectedVendeur: VendeurInfoDto  = new VendeurInfoDto();

  onVendeurSelected(vendeur: VendeurInfoDto): void {
    this.selectedVendeur = vendeur;
  }

  onVendeurCreated(): void {
    // Recharger les vendeurs dans SearchTabVendeurComponent
    const searchTabVendeurComponent = document.querySelector('app-search-tab-vendeur') as any;
    if (searchTabVendeurComponent) {
      searchTabVendeurComponent.loadVendeurs();
    }
  }
}