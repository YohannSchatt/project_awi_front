import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Session } from '../../Model/SessionClass';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SessionService } from '../../services/session/session.service';


@Component({
  selector: 'app-sessiontab-public',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './sessiontab-public.component.html',
  styleUrl: './sessiontab-public.component.scss'
})
export class SessiontabPublicComponent {

  public tabSession!: Session[];

  public sessionActuelle!: Session;

  public OnAdminPage! : boolean;

  public selectedSessionId: number = -1;

  constructor(private router : Router, private http : HttpClient, private sessionService : SessionService) { }

  ngOnInit() {
    this.loadSession();
    this.checkCurrentUrl(this.router.url);

  }

  private checkCurrentUrl(url: string) {
    this.OnAdminPage = url.includes('GestionSession');
    console.log('OnAdminPage:', this.OnAdminPage);
  }

  private getSessionActuelle() {
    const dateActuelle = new Date();
    this.tabSession.forEach((session: Session) => {
      if (session.dateDebut < dateActuelle && session.dateFin > dateActuelle) {
        this.sessionActuelle = session;
      }
    });
  }

  private getNextSession() {
    const dateActuelle = new Date();
    this.tabSession.forEach((session: Session) => {
      if (session.dateDebut > dateActuelle) {
        this.sessionActuelle = session;
      }
    });
  }

  private loadSession() {
    const data = require('./session.json');
    this.tabSession = data.map((item: any) => new Session(item.lieu, item.dateDebut, item.dateFin, item.titre));
  }

  public modifierSession(session: Session) {
    console.log(session);
  }

  public supprimerSession(session: Session) {
    console.log(session);
  }
  
  public onButtonClick(session : Session) {
    if (this.selectedSessionId === session.id) {
      this.selectedSessionId = -1;
      this.sessionService.setSessionSelectionne(null);
    }
    else {
      this.selectedSessionId = session.id;
      this.sessionService.setSessionSelectionne(session);
    }
  }

}
