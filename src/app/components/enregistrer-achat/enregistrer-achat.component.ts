import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { JeuService } from '../../../app/services/jeu/jeu.service';
import { InfoAchatJeuUnitaireDisponibleDto } from '../../services/jeu/dto/info-achat-jeu-unitaire-disponible.dto';


@Component({
  selector: 'app-enregistrer-achat',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, AsyncPipe, RouterModule],
  templateUrl: './enregistrer-achat.component.html',
  styleUrl: './enregistrer-achat.component.scss'
})
export class EnregistrerAchatComponent implements OnInit {

  submitAchat(): void {
    if (this.enregistrerAchatForm.valid) {
      const idJeuUnitaire = this.enregistrerAchatForm.get('idJeuUnitaire')!.value;
      this.jeuService.enregisterAchat(idJeuUnitaire).subscribe({
        next: () => {
          alert('Achat enregistré');
          //we reload fully the component
          window.location.reload();
        },
        error: (error) => {
          alert('Erreur lors de l\'enregistrement de l\'achat');
        }
      });

    }
  }

  enregistrerAchatForm: FormGroup = new FormGroup({
   idJeuUnitaire: new FormControl('', [Validators.required, this.idValidator()]),
   validationEncaissement: new FormControl(false, Validators.requiredTrue), // Add the checkbox control
  });

  filteredIdJeuUnitaire: Observable<number[]> = new Observable<number[]>();
  listIdJeuUnitaire: number[] = [];
  listInfoJeuAchat: InfoAchatJeuUnitaireDisponibleDto[] = [];
  jeuSelectionne : InfoAchatJeuUnitaireDisponibleDto | undefined = undefined;
  errorMessage: string | undefined = undefined;
  prixCommission: number = 2;// à implémenter

  getPrixTotal(): number {
    if (this.jeuSelectionne) {
      return Number (this.jeuSelectionne.prix + this.prixCommission);
    }
    else {
      return this.prixCommission;
    }
  }
  constructor(private jeuService: JeuService) { }

  getJeuUnitaire(): void {
    this.jeuService.getListeJeuUnitaire().subscribe({
      next: (data) => {
        this.listInfoJeuAchat = data;
        this.listIdJeuUnitaire = this.listInfoJeuAchat.map(
          (jeu) => jeu.idJeuUnitaire
        );
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  ngOnInit(): void {
    this.getJeuUnitaire();
    this.enregistrerAchatForm.get('idJeuUnitaire')!.valueChanges.subscribe((idJeuUnitaire) => {
      this.jeuSelectionne = this.listInfoJeuAchat.find(
        (jeu) => String(jeu.idJeuUnitaire) === String(idJeuUnitaire)
      );
    }
    );

    this.filteredIdJeuUnitaire = this.enregistrerAchatForm.get('idJeuUnitaire')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterIdJeuUnitaire(value || '')),
    );
  }

  idValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const id = Number(value);
      return this.listIdJeuUnitaire.includes(id) ? null : { invalidIdJeuUnitaire: true };
    };
  }

  private _filterIdJeuUnitaire(value: string): number[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.listIdJeuUnitaire.filter(idJeuUnitaire => idJeuUnitaire.toString().toLowerCase().includes(filterValue));
  }
}
