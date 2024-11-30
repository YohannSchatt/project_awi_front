import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SearchTabSessionComponent } from '../../app/components/search-tab-session/search-tab-session.component';
import { SearchTabVendeurComponent } from '../../app/components/search-tab-vendeur/search-tab-vendeur.component';
import { DashboardComponent } from "../../app/components/dashboard/dashboard.component";
import { SessionInfoDto } from '../../app/services/session/dto/session.info.dto';
import { VendeurInfoDto } from '../../app/services/vendeur/dto/vendeur.info.dto';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SearchTabSessionComponent, SearchTabVendeurComponent, NgIf, NgClass, DashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  SelectedSearchComponent: number = 0;

  SessionSelected: SessionInfoDto = new SessionInfoDto();
  VendeurSelected: VendeurInfoDto = new VendeurInfoDto();

  constructor() { }

  ngOnInit(): void {}

  public onSessionSelected(session: SessionInfoDto): void {
    this.SessionSelected = session;
  }

  public onVendeurSelected(vendeur: VendeurInfoDto): void {
    this.VendeurSelected = vendeur;
  }

  public chercher(): void{
    console.log(this.SessionSelected);
    console.log(this.VendeurSelected);
  }

  public choiceComponent(number : number): void {
    this.SelectedSearchComponent = number;
  }


}
