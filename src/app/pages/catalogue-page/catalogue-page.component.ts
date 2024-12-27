import { Component } from '@angular/core';
import { CatalogueComponent } from '../../../app/components/catalogue/catalogue.component';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [CatalogueComponent],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.scss'
})
export class CataloguePageComponent {

}
