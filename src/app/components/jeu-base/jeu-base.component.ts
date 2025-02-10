import { Component, ViewChild, ElementRef } from '@angular/core';
import { GetJeuResponseDto } from '../../services/jeu/dto/get-jeu-response';
import { CreateJeuDto } from '../../services/jeu/dto/create-jeu.dto';
import { UpdateJeuDto } from '../../services/jeu/dto/updtate-jeu.dto';
import { JeuService } from '../../services/jeu/jeu.service';
import { OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { InfoJeuDto } from '../../services/jeu/dto/jeu.info.dto';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-jeu-base',
  standalone: true,
imports: [MatAutocompleteModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, AsyncPipe , NgIf],
  templateUrl: './jeu-base.component.html',
  styleUrl: './jeu-base.component.scss'
})
export class JeuBaseComponent {
@ViewChild('fileInput') fileInput!: ElementRef;

deleteImage() {
  this.currentImage = undefined;
  this.jeuForm.patchValue({ image: this.currentImage });

}
// Dans JeuBaseComponent
createJeu(): void {
  // Vérifier que les champs "nom" et "editeur" sont renseignés
  if (!this.jeuForm.get('nom')?.value || !this.jeuForm.get('editeur')?.value) {
    return;
  }

  const dto = {
    nom: this.jeuForm.get('nom')?.value,
    editeur: this.jeuForm.get('editeur')?.value,
    description: this.jeuForm.get('description')?.value,
    image: this.jeuForm.get('image')?.value || ''
  };

  this.jeuService.createJeu(dto)
    .then(() => {
      alert('Jeu créé avec succès');
      window.location.reload();
    })
    .catch((error: any) => {
      alert('Erreur lors de la création du jeu il est possible que l\'image soit trop lourde');
      window.location.reload();
    });
}

updateJeu(): void {
  // Vérifier qu'un jeu existant a été sélectionné et que "nom" et "editeur" sont renseignés
  if (!this.currentId || !this.jeuForm.get('nom')?.value || !this.jeuForm.get('editeur')?.value) {
    alert('Veuillez sélectionner un jeu existant et renseigner les champs "nom" et "editeur"');
    return;
  }

  const dto = {
    idJeu: this.currentId?.toString(),
    nom: this.jeuForm.get('nom')?.value,
    editeur: this.jeuForm.get('editeur')?.value,
    description: this.jeuForm.get('description')?.value,
    image: this.jeuForm.get('image')?.value || ''
  };

  this.jeuService.updateJeu(dto)
    .then(() => {
      alert('Jeu mis à jour avec succès');
      window.location.reload();
    })
    .catch((error: any) => {
      alert('Erreur lors de la mise à jour du jeu , il est possible que l\'image soit trop lourde' );
      // window.location.reload();
    });
}


  constructor(private jeuService: JeuService) { }
  imageSource() : string{
    console.log("on tente de récupérer l'image");
    return this.currentImage
    ? 'data:image/png;base64,' + this.currentImage
    : 'assets/image/notfound.png';
  }



  currentIsNew : boolean = true;
  currentId : number | undefined = undefined;
  currentNom : string = '';
  currentEditeur : string = '';
  currentDescription : string | undefined = '';
  currentImage : string | undefined = undefined;


  deleteJeu() {
    this.jeuService.deleteJeu(this.currentId!).then((response: boolean) => {
      if (response) {
        alert('Jeu supprimé avec succès');
      } else {
        alert('Impossible de supprimer ce jeu');
      }
      window.location.reload();
    }).catch((error: { message: string; }) => {
      alert('Impossible de supprimer ce jeu');
      window.location.reload();
    });
  }

  initNewForm() {
    this.currentIsNew = true;
    this.currentId = undefined;
    this.currentNom = '';
    this.currentEditeur = '';
    this.currentDescription = '';
    this.currentImage = undefined;
    this.choixJeuForm.reset({
      nomJeu: ''
    });
    this.jeuForm.reset({
      nom: this.currentNom,
      editeur: this.currentEditeur,
      description: this.currentDescription,
      image: this.currentImage
    });
  }
  private _filterJeuNoms(value: string): string[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.jeuNoms.filter(option => option.toLowerCase().includes(filterValue));
  }

  choixJeuForm: FormGroup = new FormGroup({
    nomJeu: new FormControl('', Validators.required)
  });

  jeuNoms: string[] = [];
  filteredJeuNoms: Observable<string[]> = new Observable<string[]>();
  listJeux: InfoJeuDto[] = [];

  jeuForm: FormGroup = new FormGroup({
    nom: new FormControl(this.currentNom),
    editeur: new FormControl(this.currentEditeur),
    description: new FormControl(this.currentDescription),
    image: new FormControl(this.currentImage)
  });


  async ngOnInit() {
    this.getJeuInfo();

    this.filteredJeuNoms = this.choixJeuForm.get('nomJeu')!.valueChanges.pipe(
      startWith(''),
          map(value => this._filterJeuNoms(value || '')),
        );

      }

      getJeuInfo(): void {
        this.jeuService.getJeux().subscribe({
          next: (jeux) => {
            this.listJeux = jeux;
            this.jeuNoms = jeux.map(jeu => jeu.nom);
          },
          error: (error) => {
            alert('Erreur lors de la récupération des jeux : ' + error.message);
      },
    });
  }

  choisirJeu() {
    const nomJeu = this.choixJeuForm.get('nomJeu')?.value;
    const jeu = this.listJeux.find(j => j.nom === nomJeu);
    if (jeu) {
      this.jeuService.getJeu(jeu.idJeu).subscribe({
        next: (jeuDetails) => {
          this.currentIsNew = false;
          this.currentId = jeuDetails.idJeu;
          this.currentNom = jeuDetails.nom;
          this.currentEditeur = jeuDetails.editeur;
          this.currentDescription = jeuDetails.description;
          this.currentImage = jeuDetails.image;
          this.jeuForm.patchValue({
            nom: this.currentNom,
            editeur: this.currentEditeur,
            description: this.currentDescription,
            image: this.currentImage
          });
        },
        error: (error) => {
          alert('Erreur lors de la récupération du jeu : ' + error.message);
        }
      });
    } else {
      alert('Jeu non trouvé');
      this.choixJeuForm.get('nomJeu')?.setValue('');
      this.initNewForm();

    }
  }


  refreshJeu(): void {
    this.getJeuInfo();
    this.choixJeuForm.get('nomJeu')?.setValue('');
    this.initNewForm();
  }

  onImagePlaceholderClick(): void {
    // Déclenche l'ouverture du sélecteur de fichier en cliquant sur l'image
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // On récupère simplement la partie base64 du Data URL
        const base64String = e.target.result.split(',')[1];
        this.currentImage = base64String;
        this.jeuForm.patchValue({ image: base64String });
      };
      reader.readAsDataURL(file);
      console.log('Image sélectionnée');
    } else {
      alert('Veuillez sélectionner un fichier PNG.');
    }
  }

}
