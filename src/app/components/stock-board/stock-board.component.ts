import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Statut } from '../../Model/Statut';
import { InfoJeuUnitaireDisponibleDto } from '../../services/jeu/dto/info-jeu-unitaire-disponible.dto';
import { JeuService } from '../../services/jeu/jeu.service';
import { CommonModule } from '@angular/common';
import { InfoJeuStockDto } from '../../services/jeu/dto/infoJeuStock.dto';

@Component({
  selector: 'app-stock-board',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './stock-board.component.html',
  styleUrl: './stock-board.component.scss'
})
export class StockBoardComponent {

  choiceStatut : Statut[] = [Statut.DEPOSE, Statut.DISPONIBLE];
  
  statutControl = new FormControl(Statut.DEPOSE);

  Message: string = "";

  JeuUnitaireSelected: InfoJeuStockDto;

  @Input() tabJeu : InfoJeuStockDto[] = [];
  @Output() statutUpdated = new EventEmitter<void>();

  constructor(private jeuService : JeuService) {
    this.JeuUnitaireSelected = {idJeuUnitaire : -1, prix : -1, nom : "", editeur : "", statut : Statut.DEPOSE, description : ""};
  }

  ngOnInit() {}

  modifierStatut(): void {
    const selectedStatut = this.statutControl.value!;
    this.jeuService.updateStatut(this.JeuUnitaireSelected.idJeuUnitaire, selectedStatut).subscribe(
      () => {
        this.JeuUnitaireSelected = {idJeuUnitaire : -1, prix : -1, nom : "", editeur : "", statut : Statut.DEPOSE, description : ""};
        this.statutUpdated.emit();
      },
      (error) => {
        this.Message = "Erreur lors de la modification du statut";
      }
    )
  }

  public selectJeuUnitaire(jeuUnitaire: InfoJeuStockDto): void {
    if (this.JeuUnitaireSelected.idJeuUnitaire == jeuUnitaire.idJeuUnitaire) {
      this.JeuUnitaireSelected = {idJeuUnitaire : -1, prix : -1, nom : "", editeur : "", statut : Statut.DEPOSE, description : ""};
    }
    else {
      this.JeuUnitaireSelected = jeuUnitaire;
    }
  }

}
