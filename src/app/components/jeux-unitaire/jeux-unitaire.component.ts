import { Component, Input } from '@angular/core';
import { InfoJeuUnitaireDto } from '../../services/catalogue/response-catalogue.dto';
@Component({
  selector: 'app-jeux-unitaire',
  standalone: true,
  imports: [],
  templateUrl: './jeux-unitaire.component.html',
  styleUrl: './jeux-unitaire.component.scss'
})
export class JeuxUnitaireComponent {

  @Input() jeu: InfoJeuUnitaireDto = new InfoJeuUnitaireDto();

}
