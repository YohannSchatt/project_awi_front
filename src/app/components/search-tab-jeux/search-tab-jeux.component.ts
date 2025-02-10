import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { EtatJeuDto } from '../../services/jeu/dto/EtatJeu.dto';
import { InfoJeuDBDto } from '../../services/jeu/dto/jeuDB.dto';
import { JeuService } from '../../services/jeu/jeu.service';

@Component({
  selector: 'app-search-tab-jeux',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-tab-jeux.component.html',
  styleUrl: './search-tab-jeux.component.scss'
})
export class SearchTabJeuxComponent {

  @Output() JeuSelected = new EventEmitter<InfoJeuDBDto>();

  Message: string = '';

  JeuSearchGroup!: FormGroup;

  tabJeu : InfoJeuDBDto[] = [];

  idSelectedJeu : number = -1;

  constructor(private jeuService : JeuService ) {
    this.idSelectedJeu = -1;
    }

  ngOnInit(): void {
    this.JeuSearchGroup = new FormGroup({
      nom: new FormControl(''),
      editeur: new FormControl(''),
    });
    this.loadJeu();
  }

  submit(): void{
    const nom : string = this.JeuSearchGroup.get('nom')?.value;
    const editeur : string = this.JeuSearchGroup.get('editeur')?.value;
    this.loadJeu(nom,editeur);
  }

  chercher(Jeu : InfoJeuDBDto): void{
    if (Jeu.idJeu == this.idSelectedJeu){
      this.idSelectedJeu = -1;
      this.JeuSelected.emit(new InfoJeuDBDto());
    }
    else {
      this.idSelectedJeu = Jeu.idJeu;
      this.JeuSelected.emit(Jeu);
    }

  }

  public loadJeu(nom? : string, editeur?: string): void {
      this.jeuService.getJeuxDB(nom, editeur).subscribe(
        (data: InfoJeuDBDto[]) => {
          this.tabJeu = data.map(Jeu => {
            return Jeu;
          });
        },
      (error) => {
        console.error('Error loading vendeurs:', error);
      }
    );
  } 
}


