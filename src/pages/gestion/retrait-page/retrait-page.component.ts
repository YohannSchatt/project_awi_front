import { Component } from '@angular/core';
import { RetraitJeuComponent } from '../../../app/components/retrait-jeu/retrait-jeu.component';

@Component({
  selector: 'app-retrait-page',
  standalone: true,
  imports: [RetraitJeuComponent],
  templateUrl: './retrait-page.component.html',
  styleUrl: './retrait-page.component.scss'
})
export class RetraitPageComponent {

}
