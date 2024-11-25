import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SearchTabSessionComponent } from '../../app/components/search-tab-session/search-tab-session.component';
import { SearchTabVendeurComponent } from '../../app/components/search-tab-vendeur/search-tab-vendeur.component';
import { DashboardComponent } from "../../app/components/dashboard/dashboard.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SearchTabSessionComponent, SearchTabVendeurComponent, NgIf, NgClass, DashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  SelectedSearchComponent: number = 0;

  constructor() { }

  ngOnInit(): void {}

  public choiceComponent(number : number): void {
    this.SelectedSearchComponent = number;
  }


}
