import { Component } from '@angular/core';

import { CatalogueComponent } from '../../components/catalogue/catalogue.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CatalogueComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {

}
