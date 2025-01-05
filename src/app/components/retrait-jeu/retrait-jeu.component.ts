import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { VendeurService } from '../../services/vendeur/vendeur.service';
import { JeuService } from '../../services/jeu/jeu.service';
import { VendeurInfoDto } from '../../services/vendeur/dto/vendeur.info.dto';
import { InfoJeuUnitaireDto } from '../../services/catalogue/response-catalogue.dto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoJeuUnitaireDisponibleDto } from '../../services/jeu/dto/info-jeu-unitaire-disponible.dto';
;

@Component({
  selector: 'app-retrait-jeu',
  templateUrl: './retrait-jeu.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, AsyncPipe, RouterModule],
  styleUrls: ['./retrait-jeu.component.scss']
})
export class RetraitJeuComponent implements OnInit {
  retraitJeuForm: FormGroup;

  vmails: string[] = [];
  filteredVmails: Observable<string[]> = new Observable<string[]>();
  listvendeur: VendeurInfoDto[] = [];
  vendeurName?: string;
  vendeurFirstName?: string;
  vendeurId?: number;

  jeuUnitaireIds: number[] = [];
  filteredJeuUnitaireIds: Observable<number[]> = new Observable<number[]>();
  listJeuUnitaires: InfoJeuUnitaireDisponibleDto[] = [];

  jeuSelectionne: InfoJeuUnitaireDisponibleDto[] = [];

  argentRetrait: number = 0;

  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private vendeurService: VendeurService,
    private jeuService: JeuService
  ) {
    this.retraitJeuForm = this.fb.group({
      mailVendeur: ['', [Validators.required, this.emailValidator()]],
      idJeuUnitaire: [''],
      retraitArgent: [false]
    });
  }

  ngOnInit(): void {
    this.getVendeurInfo();

    this.filteredVmails = this.retraitJeuForm.get('mailVendeur')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterVmails(value || ''))
    );

    this.retraitJeuForm.get('mailVendeur')!.valueChanges.subscribe(value => {
      this.onMailVendeurChange(value);
    });

    this.filteredJeuUnitaireIds = this.retraitJeuForm.get('idJeuUnitaire')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterJeuUnitaireIds(value || ''))
    );
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return this.vmails.includes(value) ? null : { invalidEmail: true };
    };
  }

  idJeuUnitaireValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (!formGroup) {
        return null;
      }
  
      // On suppose que 'retraitArgent' est un boolean (checkbox)
      const retraitArgent = formGroup.get('retraitArgent')?.value === true;
      const jeuxNonVides = this.jeuSelectionne?.length > 0;
  
      // Si la checkbox est cochée OU la liste des jeux n'est pas vide, c'est valide
      if (retraitArgent || jeuxNonVides) {
        return null;
      }
  
      // Sinon, on invalide
      return { invalidIdJeuUnitaire: true };
    };
  }

  getVendeurInfo(): void {
    this.vendeurService.getAllVendeurs().subscribe({
      next: vendeurs => {
        this.listvendeur = vendeurs;
        this.vmails = vendeurs.map(vendeur => vendeur.email);
      },
      error: error => {
        this.errorMessage = `HTTP Error: ${error.status} ${error.statusText}`;
      }
    });
  }

  private _filterVmails(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vmails.filter(option => option.toLowerCase().includes(filterValue));
  }

  onMailVendeurChange(email: string): void {
    const vendeur = this.listvendeur.find(vendeur => vendeur.email === email);
    if (vendeur) {
      this.vendeurId = vendeur.idVendeur;
      this.vendeurName = vendeur.nom;
      this.vendeurFirstName = vendeur.prenom;
      this.getJeuUnitairesByVendeur(vendeur.idVendeur);
      this.getArgent();
    } else {
      this.vendeurName = undefined;
      this.vendeurFirstName = undefined;
      this.jeuUnitaireIds = [];
      this.listJeuUnitaires = [];
      this.jeuSelectionne = [];
    }
  }


  addJeuUnitaire(idJeu: number | string): void {
    if (typeof idJeu === 'string') {
      idJeu = Number(idJeu);
    }
    const jeuUnitaire = this.listJeuUnitaires.find(jeu => jeu.idJeuUnitaire === idJeu);
    const exist : boolean = this.jeuSelectionne.some(jeu => jeu.idJeuUnitaire === idJeu);
    if (jeuUnitaire && !exist) {
      this.jeuSelectionne.push(jeuUnitaire);
    }
  }

  deleteGame(idJeu: number): void {
    this.jeuSelectionne = this.jeuSelectionne.filter(jeu => jeu.idJeuUnitaire !== idJeu);
  }

  getJeuUnitairesByVendeur(idVendeur: number): void {
    this.jeuService.getJeuUnitairesByVendeur(idVendeur).subscribe({
      next: jeuUnitaires => {
        this.listJeuUnitaires = jeuUnitaires;
        this.listJeuUnitaires = this.listJeuUnitaires.filter(
          jeu => !this.jeuSelectionne.some(
            sel => sel.idJeuUnitaire === jeu.idJeuUnitaire
          )
        );
        this.jeuUnitaireIds = this.listJeuUnitaires.map(jeu => jeu.idJeuUnitaire);
      },
      error: error => {
        this.errorMessage = `HTTP Error: ${error.status} ${error.statusText}`;
        this.jeuUnitaireIds = [];
        this.listJeuUnitaires = [];
      }
    });
  }

  private _filterJeuUnitaireIds(value: string | number): number[] {
    let realValue: string;
    if (typeof value === 'number') {
      realValue = value.toString();
    } else {
      realValue = value;
    }
    const filterValue = value.toString().toLowerCase();
    return this.jeuUnitaireIds
      .filter(id => !this.jeuSelectionne.some(sel => sel.idJeuUnitaire === id))
      .filter(id => id.toString().toLowerCase().includes(filterValue));
  }

  submitRetrait(): void {
    const formValue = this.retraitJeuForm.value;
    const vendeur = this.listvendeur.find(v => v.email === formValue.mailVendeur);
    const retirerArgent : boolean = formValue.retraitArgent;

    const idJeuUnitaire = this.jeuSelectionne.map(jeu => jeu.idJeuUnitaire);

    if (vendeur && (this.jeuSelectionne.length > 0 || retirerArgent)) {
      console.log(retirerArgent)
      this.vendeurService.postRetraitJeuArgent(vendeur.idVendeur, idJeuUnitaire, retirerArgent)
        .then(([success, message]) => {
          if (success) {
            alert(message);
            this.retraitJeuForm.reset();
            this.vendeurName = undefined;
            this.vendeurFirstName = undefined;
            this.jeuUnitaireIds = [];
            this.listJeuUnitaires = [];
          } else {
            alert(message);
          }
        })
        .catch(error => {
          alert('Erreur lors du retrait du jeu');
          console.error('An error occurred:', error);
        });
    } else {
      alert("Le vendeur ou les données du retrait ne sont pas sélectionnés");
    }
  }

  refreshVendeur(): void {
    this.getVendeurInfo();
    this.retraitJeuForm.reset();
    // this.retraitJeuForm.get('mailVendeur')?.updateValueAndValidity();
  }

  refreshJeuUnitaire(): void {
    this.retraitJeuForm.get('idJeuUnitaire')?.reset();
    const email = this.retraitJeuForm.get('mailVendeur')?.value;
    const vendeur = this.listvendeur.find(v => v.email === email);
    if (vendeur) {
      this.getJeuUnitairesByVendeur(vendeur.idVendeur);
    }
  }

  getArgent(): void {
    if (this.vendeurId) {
      this.vendeurService.getArgentVendeur(this.vendeurId).then(
        (montant) => {
          this.argentRetrait = montant;
        },
        (error) => {
          console.error('An error occurred:', error);
          this.errorMessage = 'Erreur lors de la récupération du montant';
        }
      );
    }
  } 
}
