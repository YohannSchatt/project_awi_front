import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoJeuUnitaireDisponibleDto } from '../../../services/jeu/dto/info-jeu-unitaire-disponible.dto';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss'
})
export class DetailArticleComponent {

  @Input() jeuUnitaire : InfoJeuUnitaireDisponibleDto | undefined;
  @Output() deleteJeuSelect = new EventEmitter<number>();
  onDelete(): void {
    this.deleteJeuSelect.emit(this.jeuUnitaire?.idJeuUnitaire);
  }

}
