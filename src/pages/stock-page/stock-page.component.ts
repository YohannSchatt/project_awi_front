import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchTabJeuxComponent } from '../../app/components/search-tab-jeux/search-tab-jeux.component';
import { SearchTabVendeurComponent } from "../../app/components/search-tab-vendeur/search-tab-vendeur.component";
import { VendeurInfoDto } from '../../app/services/vendeur/dto/vendeur.info.dto';
import { InfoJeuDBDto } from '../../app/services/jeu/dto/jeuDB.dto';
import { environment } from '../../environment/environment';
import { StockBoardComponent } from "../../app/components/stock-board/stock-board.component";
import { JeuService } from '../../app/services/jeu/jeu.service';
import { Statut } from '../../app/Model/Statut';
import { InfoJeuUnitaireDisponibleDto } from '../../app/services/jeu/dto/info-jeu-unitaire-disponible.dto';
import { InfoJeuStockDto } from '../../app/services/jeu/dto/infoJeuStock.dto';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [SearchTabJeuxComponent, ReactiveFormsModule, CommonModule, SearchTabVendeurComponent, StockBoardComponent],
  templateUrl: './stock-page.component.html',
  styleUrl: './stock-page.component.scss'
})
export class StockPageComponent {
  SelectedSearchComponent: number = 0;

  JeuSelected: InfoJeuDBDto = new InfoJeuDBDto();
  VendeurSelected: VendeurInfoDto = new VendeurInfoDto();
  StatutSelected: Statut = Statut.DEPOSE;

  infoStock: InfoJeuStockDto[] = [];

  choiceStatut : Statut[] = [Statut.DEPOSE, Statut.DISPONIBLE];

  statutControl = new FormControl(Statut.DEPOSE);

  constructor(private jeuService : JeuService) {}

  ngOnInit(): void {}

  public onJeuSelected(jeu: InfoJeuDBDto): void {
    this.JeuSelected = jeu;
  }

  public onVendeurSelected(vendeur: VendeurInfoDto): void {
    this.VendeurSelected = vendeur;
  }

  public chercher(): void{
    this.StatutSelected = this.statutControl.value!;
    this.jeuService.getJeuxByEtat(this.StatutSelected, this.JeuSelected.idJeu, this.VendeurSelected.idVendeur).subscribe(
      (data: InfoJeuStockDto[]) => {
        this.infoStock = data;
        console.log(data);
      }
    );
    
  }

  public choiceComponent(number : number): void {
    this.SelectedSearchComponent = number;
  }

}
