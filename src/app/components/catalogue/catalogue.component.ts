import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  standalone : true,
  imports: [NgFor],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})

export class CatalogueComponent {
  items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);
}
