import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { JeuService } from '../../../app/services/jeu/jeu.service';
import { InfoJeuUnitaireDisponibleDto } from '../../services/jeu/dto/info-achat-jeu-unitaire-disponible.dto';
import { FormsModule } from '@angular/forms';
import { DetailArticleComponent } from './detail-article/detail-article.component';

@Component({
  selector: 'app-enregistrer-achat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    FormsModule,
    RouterModule,
    DetailArticleComponent,
  ],
  templateUrl: './enregistrer-achat.component.html',
  styleUrls: ['./enregistrer-achat.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class EnregistrerAchatComponent implements OnInit {
  // All data
  setInfoJeuAchat: InfoJeuUnitaireDisponibleDto[] = [];
  setIdJeuUnitaire: Set<number> = new Set<number>();

  // IDs of remaining jeux unitaires
  setIdJeuUnitaireRestant: Set<number> = new Set<number>();

  // Input for adding a jeu
  inputJeuSelectionneId: string = '';
  isInputValid: boolean = false;

  // Observable for filtered IDs
  filteredIdJeuUnitaire!: Observable<number[]>;

  // Selected jeux
  idsJeuSelectionne: Set<number> = new Set<number>();
  jeuxSelectionne: InfoJeuUnitaireDisponibleDto[] = [];

  // Error message
  errorMessage: string | undefined = undefined;

  // Form group
// Add the validator function to the FormGroup
enregistrerAchatForm: FormGroup = new FormGroup(
  {
    validationEncaissement: new FormControl(false, Validators.requiredTrue),
  },
  {
    validators: [this.idsSelectionnesValidator.bind(this)],
  }
);


  constructor(private jeuService: JeuService) {}

  ngOnInit(): void {
    this.getJeuUnitaire();

    // Initialize filteredIdJeuUnitaire
    this.filteredIdJeuUnitaire = new Observable((observer) => {
      observer.next(Array.from(this.setIdJeuUnitaireRestant));
    });

    // Update filteredIdJeuUnitaire when input changes
    this.enregistrerAchatForm.valueChanges.subscribe(() => {
      this.filteredIdJeuUnitaire = this.getFilteredOptions(
        this.inputJeuSelectionneId
      );
    });
  }

  validateInput(): void {
    const id = Number(this.inputJeuSelectionneId);
    this.isInputValid = this.setIdJeuUnitaireRestant.has(id);
  }

  getJeuUnitaire(): void {
    this.jeuService.getListeJeuUnitaire().subscribe({
      next: (data) => {
        this.setInfoJeuAchat = data;
        // Initialize the set with available IDs
        this.setIdJeuUnitaire = new Set(
          this.setInfoJeuAchat.map((jeu) => jeu.idJeuUnitaire)
        );
        this.setIdJeuUnitaireRestant = new Set(this.setIdJeuUnitaire);


        // Initialize filteredIdJeuUnitaire with all IDs
        this.filteredIdJeuUnitaire = this.getFilteredOptions('');
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  // Custom validator to check if selected IDs are in setIdJeuUnitaire
// Custom validator to check if selected IDs are in setIdJeuUnitaire and the list is not empty
idsSelectionnesValidator(formGroup: AbstractControl): ValidationErrors | null {
  const invalidIds = Array.from(this.idsJeuSelectionne).filter(
    (id) => !this.setIdJeuUnitaire.has(id)
  );

  if (this.idsJeuSelectionne.size === 0) {
    return { emptySelection: true };
  }

  return invalidIds.length > 0 ? { invalidIdsSelected: invalidIds } : null;
}

  ajouterJeu(): void {
    const id = Number(this.inputJeuSelectionneId);
    if (id && this.setIdJeuUnitaireRestant.has(id)) {
      this.idsJeuSelectionne.add(id);
      this.setIdJeuUnitaireRestant.delete(id);
      this.inputJeuSelectionneId = '';
      this.isInputValid = false;
      // Update selected jeux info
      this.updateJeuxSelectionne();

      // Update filtered options
      this.filteredIdJeuUnitaire = this.getFilteredOptions('');
    }
  }

  onDeleteJeu($event: number) {
    this.removeJeu($event);
  }

  removeJeu(id: number): void {
    if (this.idsJeuSelectionne.has(id)) {
      this.idsJeuSelectionne.delete(id);
      this.setIdJeuUnitaireRestant.add(id);
      // Update selected jeux info
      this.updateJeuxSelectionne();

      // Update filtered options
      this.filteredIdJeuUnitaire = this.getFilteredOptions(
        this.inputJeuSelectionneId
      );
    }
  }

  updateJeuxSelectionne(): void {
    this.jeuxSelectionne = this.setInfoJeuAchat.filter((jeu) =>
      this.idsJeuSelectionne.has(jeu.idJeuUnitaire)
    );
  }

  getFilteredOptions(value: string): Observable<number[]> {
    const filterValue = value.toLowerCase();
    const filteredIds = Array.from(this.setIdJeuUnitaireRestant).filter((id) =>
      id.toString().toLowerCase().includes(filterValue)
    );
    return new Observable((observer) => {
      observer.next(filteredIds);
    });
  }

  submitAchat(): void {
      if (this.enregistrerAchatForm.valid) {
        this.jeuService.enregisterAchat(this.idsJeuSelectionne).subscribe({
          next: () => {
            alert('Achat enregistré');
            //we reload fully the component
            window.location.reload();
          },
          error: (error) => {
            alert('Erreur lors de l\'enregistrement de l\'achat: ' + error.message);
          }
        });
      }
}
roundToPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

getPrixJeuxTotal(): number {
  const total = this.jeuxSelectionne.reduce((total, jeu) => total + jeu.prix, 0);
  return this.roundToPrecision(total, 2);
}

getPrixCommission(): number {
  const commission = 0.1 * this.getPrixJeuxTotal();
  return this.roundToPrecision(commission, 2);
}

getPrixTotal(): number {
  const total = this.getPrixJeuxTotal() + this.getPrixCommission();
  return this.roundToPrecision(total, 2);
}

}
