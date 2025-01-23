import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { JeuxUnitaireComponent } from '../jeux-unitaire/jeux-unitaire.component';
import { InfoJeuUnitaireDto } from '../../services/catalogue/response-catalogue.dto';
import { Subscription } from 'rxjs';
import { CatalogueService } from '../../services/catalogue/catalogue.service';
import { CatalogueService2 } from '../../services/catalogue2/catalogue2.service';
@Component({
  selector: 'app-catalogue2',
  standalone: true,
  imports: [NgClass, JeuxUnitaireComponent],
  templateUrl: './catalogue2.component.html',
  styleUrl: './catalogue2.component.scss'
})
export class Catalogue2Component {

  filterMenuOpen = true;        // Open by default
  filterMenuIconOpened = false;
  errorMessage : String | undefined = undefined;
  currentJeuInfo: InfoJeuUnitaireDto | undefined = undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(private catalogueService2: CatalogueService2) { }
  // Icon initially not toggled

  toggleFilterMenu(): void {
    // Toggle the panel open/close
    this.filterMenuOpen = !this.filterMenuOpen;
    // Toggle the icon bars animation
    this.filterMenuIconOpened = !this.filterMenuIconOpened;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.subscriptions.add(
      // Subscribe to currentJeuInfo$ to get the selected game
      this.subscriptions.add(
        this.catalogueService2.currentJeuInfo$.subscribe({
          next: (jeu) => {
            // console.log('Selected jeu in catalogue comp:', jeu);
            this.currentJeuInfo = jeu;
          },

        })
      )
    );
  }
}




