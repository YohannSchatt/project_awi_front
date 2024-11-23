import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoAchatJeuUnitaireDisponibleDto } from '../../../services/jeu/dto/info-achat-jeu-unitaire-disponible.dto';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss'
})
export class DetailArticleComponent {

  @Input() jeuUnitaire : InfoAchatJeuUnitaireDisponibleDto | undefined;
  @Output() deleteJeuSelect = new EventEmitter<number>();
  onDelete(): void {
    this.deleteJeuSelect.emit(this.jeuUnitaire?.idJeuUnitaire);
  }

}
