import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { VendeurService } from '../../../app/services/vendeur/vendeur.service';
import { VendeurInfoDto } from '../../../app/services/vendeur/dto/vendeur.info.dto';
import { JeuService } from '../../../app/services/jeu/jeu.service';
import { InfoJeuDto } from '../../../app/services/jeu/dto/jeu.info.dto';

@Component({
  selector: 'app-enregistrer-jeu-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, AsyncPipe, RouterModule],
  templateUrl: './enregistrer-jeu-page.component.html',
  styleUrls: ['./enregistrer-jeu-page.component.scss']
})
export class EnregistrerJeuPageComponent implements OnInit {

  vmails: string[] = [];
  filteredVmails: Observable<string[]> = new Observable<string[]>();
  listvendeur: VendeurInfoDto[] = [];
  vendeurName: string | undefined = undefined;
  vendeurFirstName: string | undefined = undefined;

  jeuNoms: string[] = [];
  filteredJeuNoms: Observable<string[]> = new Observable<string[]>();
  listJeux: InfoJeuDto[] = [];
  // jeuGenre: string | undefined = undefined;
  // jeuEditeur: string | undefined = undefined;

  errorMessage: string | undefined = undefined;

  enregistrerJeuForm: FormGroup = new FormGroup({
    mailVendeur: new FormControl('', [Validators.required, this.emailValidator()]),
    nomJeu: new FormControl('', [Validators.required, this.jeuValidator()]),
    prix: new FormControl('', [Validators.required, Validators.min(0.5)]),
  });

  constructor(private vendeurService: VendeurService, private jeuService: JeuService) { }


  ngOnInit(): void {
    this.getVendeurInfo();
    this.getJeuInfo();

    this.filteredVmails = this.enregistrerJeuForm.get('mailVendeur')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterVmails(value || '')),
    );

    this.filteredJeuNoms = this.enregistrerJeuForm.get('nomJeu')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterJeuNoms(value || '')),
    );

    this.enregistrerJeuForm.get('mailVendeur')?.valueChanges.subscribe(value => {
      this.onMailVendeurChange(value);
    });

    // this.enregistrerJeuForm.get('nomJeu')?.valueChanges.subscribe(value => {
      //   this.onNomJeuChange(value);
      // });
    }

    emailValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return this.vmails.includes(value) ? null : { invalidEmail: true };
      };
    }
    getFormValidationErrors() {
      const errors: string[] = [];
      Object.keys(this.enregistrerJeuForm.controls).forEach(key => {
      const control = this.enregistrerJeuForm.get(key);
      const controlErrors: ValidationErrors | null = this.enregistrerJeuForm.get(key)!.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
        if (errorKey === 'required') {
          if(key === 'mailVendeur') {
            errors.push(`l'email du vendeur est requis`);
          }
          else if(key === 'nomJeu') {
            errors.push(`le nom du jeu est requis`);
          }
          else{
            errors.push(`${key} est requis`);}
        } else if (errorKey === 'min') {
          errors.push(`le prix doit être au moins ${controlErrors[errorKey].min}`);
        } else if (errorKey === 'invalidEmail' && control?.value !== '') {
          errors.push(`l'email du vendeur n'est pas valide`);
        } else if (errorKey === 'invalidJeu' && control?.value !== '') {
          errors.push(`le nom du jeu n'est pas valide`);
        } else {
          // errors.push(`${key}: ${errorKey}`);
        }
        });
      }
      });
      return errors.join(', ');
    }

  jeuValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return this.jeuNoms.includes(value) ? null : { invalidJeu: true };
    };
  }

  refreshVendeur(): void {
    this.getVendeurInfo();
    this.enregistrerJeuForm.get('mailVendeur')?.setValidators([Validators.required, this.emailValidator()]);
    this.enregistrerJeuForm.get('mailVendeur')?.updateValueAndValidity();
  }

  refreshJeu(): void {
    this.getJeuInfo();
    this.enregistrerJeuForm.get('nomJeu')?.setValidators([Validators.required, this.jeuValidator()]);
    this.enregistrerJeuForm.get('nomJeu')?.updateValueAndValidity();
  }

  getVendeurInfo(): void {
    this.vendeurService.getVendeurs().subscribe({
      next: (vendeurs) => {
        this.listvendeur = vendeurs;
        this.vmails = vendeurs.map(vendeur => vendeur.email);
      },
      error: (error) => {
        this.errorMessage = `HTTP Error: ${error.status} ${error.statusText}`;
      },
    });
  }

  getJeuInfo(): void {
    this.jeuService.getJeux().subscribe({
      next: (jeux) => {
        this.listJeux = jeux;
        this.jeuNoms = jeux.map(jeu => jeu.nom);
      },
      error: (error) => {
        this.errorMessage = `HTTP Error: ${error.status} ${error.statusText}`;
      },
    });
  }

  private _filterVmails(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vmails.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterJeuNoms(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.jeuNoms.filter(option => option.toLowerCase().includes(filterValue));
  }

  onMailVendeurChange(email: string): void {
    const vendeur: VendeurInfoDto | undefined = this.listvendeur.find(vendeur => vendeur.email === email);
    if (vendeur) {
      this.vendeurName = vendeur.nom;
      this.vendeurFirstName = vendeur.prenom;
    } else {
      this.vendeurName = undefined;
      this.vendeurFirstName = undefined;
    }
  }

  // onNomJeuChange(nomJeu: string): void {
  //   const jeu: InfoJeuDto | undefined = this.listJeux.find(jeu => jeu.nom === nomJeu);
  //   if (jeu) {
  //     this.jeuGenre = jeu.genre;
  //     this.jeuEditeur = jeu.editeur;
  //   } else {
  //     this.jeuGenre = undefined;
  //     this.jeuEditeur = undefined;
  //   }
  // }

  logInfo() {
    console.log(this.enregistrerJeuForm.value);
  }
}
