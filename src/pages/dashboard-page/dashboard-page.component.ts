import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SearchTabSessionComponent } from '../../app/components/search-tab-session/search-tab-session.component';
import { SearchTabVendeurComponent } from '../../app/components/search-tab-vendeur/search-tab-vendeur.component';
import { DashboardComponent } from "../../app/components/dashboard/dashboard.component";
import { SessionInfoDto } from '../../app/services/session/dto/session.info.dto';
import { VendeurInfoDto } from '../../app/services/vendeur/dto/vendeur.info.dto';
import { DashboardDto } from '../../app/services/dto/dashboard.dto';
import { HttpClient } from '@angular/common/http';

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

  infoDashboard: any = null;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {}

  public onSessionSelected(session: SessionInfoDto): void {
    this.SessionSelected = session;
  }

  public onVendeurSelected(vendeur: VendeurInfoDto): void {
    this.VendeurSelected = vendeur;
  }

  public chercher(): void{
    if (this.SessionSelected.idSession != -1 && this.VendeurSelected.idVendeur != -1){
      this.DashboardVendeurSession();
    }
    else if (this.SessionSelected.idSession != -1){
      this.DashboardVendeur();
    }
    else if (this.VendeurSelected.idVendeur != -1){
      this.DashboardSession();
    }
    else {
      this.Dashboard();
    }
  }

  public DashboardVendeurSession(): void {
    const option = {
      withCredentials: true
    };
    this.http.get<DashboardDto>("http://localhost:3000/gestionnaire/dashboard/vendeur/" + this.VendeurSelected.idVendeur + "/session/" + this.SessionSelected.idSession, option).subscribe(
      data => {
        this.infoDashboard = data;
    });
  }

  public DashboardVendeur(): void {
    const option = {
      withCredentials: true
    };
    this.http.get<DashboardDto>("http://localhost:3000/gestionnaire/dashboard/vendeur/" + this.VendeurSelected.idVendeur, option).subscribe(
      data => {
        this.infoDashboard = data;
      }
    );
  }

  public DashboardSession(): void {
    const option = {
      withCredentials: true
    };
    this.http.get<DashboardDto>("http://localhost:3000/gestionnaire/dashboard/session/" + this.SessionSelected.idSession, option).subscribe(
      data => {
        this.infoDashboard = data;
      }
    );
  }

  public Dashboard(): void {
    const option = {
      withCredentials: true
    };
    this.http.get("http://localhost:3000/gestionnaire/dashboard", option).subscribe(
      data => {
        this.infoDashboard = data;
      }
    );
  }

  public choiceComponent(number : number): void {
    this.SelectedSearchComponent = number;
  }

}
