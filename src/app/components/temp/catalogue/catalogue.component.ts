import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoJeuUnitaireDto } from '../../../services/catalogue/response-catalogue.dto';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { JeuxUnitaireComponent } from '../../jeux-unitaire/jeux-unitaire.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [JeuxUnitaireComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy{

  errorMessage : String | undefined = undefined; // Store the error
  currentPageJeux: InfoJeuUnitaireDto[] = [];
  currentJeuInfo: InfoJeuUnitaireDto | undefined = undefined;
  private subscriptions: Subscription = new Subscription();


  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    // console.log('CatalogueComponent initializing...');

    this.catalogueService.initialize();


    // Subscribe to errorMessage$ to get the error message

    this.subscriptions.add(
      this.catalogueService.errorMessage$.subscribe({
        next: (errorMessage) => {
          // console.log('Error message:', errorMessage);
          this.errorMessage = errorMessage;
        },
      })
    );
    // Subscribe to getCurrentPageJeux to get the current page's games
    this.subscriptions.add(
      this.catalogueService.getCurrentPageJeux().subscribe({
        next: (jeux) => {
          this.currentPageJeux = jeux;
        },
      })
    );

    // Subscribe to currentJeuInfo$ to get the selected game
    this.subscriptions.add(
      this.catalogueService.currentJeuInfo$.subscribe({
        next: (jeu) => {
          // console.log('Selected jeu in catalogue comp:', jeu);
          this.currentJeuInfo = jeu;
        },

      })
    );
  }

  setPage(page: number): void {
    // console.log('Setting current page to:', page);
    this.catalogueService.setCurrentPage(page);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

}
