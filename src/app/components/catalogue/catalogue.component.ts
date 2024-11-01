import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CatalogueDto, InfoJeuUnitaireDto } from '../../services/catalogue/response-catalogue.dto';
import { CatalogueService } from '../../services/catalogue/catalogue.service';
import { JeuxUnitaireComponent } from '../jeux-unitaire/jeux-unitaire.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [JeuxUnitaireComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  error: HttpErrorResponse | undefined = undefined; // Store the error
  currentPageJeux: InfoJeuUnitaireDto[] = [];
  currentJeuInfo : InfoJeuUnitaireDto | undefined = undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    console.log('CatalogueComponent initializing...');

    this.catalogueService.initialize();

    // Subscribe to getCurrentPageJeux to get the current page's games
    this.subscriptions.add(
      this.catalogueService.getCurrentPageJeux().subscribe({
        next: (jeux) => {
          this.currentPageJeux = jeux;
        },
        error: (error) => {
          // console.error('Error fetching current page jeux:', error);
          this.error = error;
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  // // Method to set the current page
  // setCurrentPage(page: number): void {
  //   this.catalogueService.setCurrentPage(page);
  //   this.subscriptions.add(
  //     this.catalogueService.addCatalogue(page).subscribe({
  //       next: () => {},
  //       error: (error) => {
  //         console.error('Error fetching catalogue for page:', page, error);
  //         this.error = error;
  //       }
  //     })
  //   );
  // }

  // // Method to set the current game being looked at in detail
  // setCurrentJeu(jeu: InfoJeuUnitaireDto | undefined): void {
  //   this.catalogueService.setCurrentJeu(jeu);
  // }
}
