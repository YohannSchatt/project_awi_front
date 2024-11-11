import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

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
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, AsyncPipe],
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
    prix: new FormControl('', [Validators.required, Validators.min(1)]),
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
