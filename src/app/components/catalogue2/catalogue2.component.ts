import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { JeuxUnitaireComponent } from '../jeux-unitaire/jeux-unitaire.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CatalogueService2 } from '../../services/catalogue2/catalogue2.service';
import { CatalogueItemResponseDto, CatalogueResponseDto } from '../../services/catalogue2/catalogue-response.dto';
import { NgIf } from '@angular/common';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-catalogue2',
  standalone: true,
  imports: [NgClass, JeuxUnitaireComponent, ReactiveFormsModule, NgIf, NgFor, NgForOf],
  templateUrl: './catalogue2.component.html',
  styleUrls: ['./catalogue2.component.scss']
})
export class Catalogue2Component implements OnInit {

  public CatalogueForm!: FormGroup;          // Ajout du FormGroup
  public Message: string = '';               // Par souci de cohérence avec l'exemple
  public currentJeuInfo: CatalogueItemResponseDto | undefined = undefined;
  public errorMessage: string | undefined = undefined;

  public pages: number[] = [];
  public selectedPage: number = 1;

  public currentPage: CatalogueResponseDto | undefined = undefined;
  public currentmaxPage: number = 1;

  private subscriptions: Subscription = new Subscription();

  constructor(private catalogueService2: CatalogueService2) {}

  filterMenuOpen = true;        // Open by default
  filterMenuIconOpened = false;
  currentPageIndex = 1;


  toggleFilterMenu(): void {
    // Toggle the panel open/close
    this.filterMenuOpen = !this.filterMenuOpen;
    // Toggle the icon bars animation
    this.filterMenuIconOpened = !this.filterMenuIconOpened;
  }

  ngOnInit(): void {
    // Création du FormGroup comme dans create-gestionnaire.component.ts
    this.CatalogueForm = new FormGroup({
      nom: new FormControl(''),
      editeur: new FormControl(''),
      prixMin: new FormControl(null),
      prixMax: new FormControl(null),
    });

    // Souscription aux observables
    this.subscriptions.add(
      this.catalogueService2.currentJeuInfo$.subscribe((jeu) => {
        this.currentJeuInfo = jeu;
      })
    );

    this.subscriptions.add(
      this.catalogueService2.errorMessage$.subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
      })
    );

    // Chargement par défaut (page 1, aucun filtre)
    this.loadCatalogueDefault();
  }

  // Fonction pour charger la page 1 sans filtres
  loadCatalogueDefault(): void {
    this.catalogueService2.getCatalogueDefault().subscribe({
      next: (response) => {
        this.currentPage = response;
        this.currentmaxPage = response.totalPages;
        this.currentPageIndex = 1;
        this.generatePages();
      },
      error: (err) => {
        console.error('Error loading catalogue:', err);
      }
    });
  }

  generatePages(): void {
    this.pages = Array.from({ length: this.currentmaxPage }, (_, i) => i + 1);
  }

  goToPage(pageNum: number): void {
    this.selectedPage = pageNum;
    this.submit(); // Re-lance la recherche avec la page choisie
  }

  // Méthode submit, comme dans create-gestionnaire, pour valider le formulaire
  submit(): void {
    this.Message = 'Recherche en cours...';
    const body = {
      page: this.selectedPage,
      nom: this.CatalogueForm.value.nom,
      editeur: this.CatalogueForm.value.editeur,
      prixMin: this.CatalogueForm.value.prixMin,
      prixMax: this.CatalogueForm.value.prixMax,
    };
    this.catalogueService2.getCatalogue(body).subscribe({
      next: (response) => {
        this.Message = 'Catalogue chargé avec succès';
        this.currentPage = response;
        this.currentmaxPage = response.totalPages;
        this.generatePages();
      },
      error: () => {
        this.Message = 'Une erreur est survenue lors du chargement du catalogue';
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}




