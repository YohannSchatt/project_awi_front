import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Session } from '../../Model/SessionClass';


@Component({
  selector: 'app-sessiontab-public',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sessiontab-public.component.html',
  styleUrl: './sessiontab-public.component.scss'
})
export class SessiontabPublicComponent {

  public tabSession!: Session[];

  public sessionActuelle!: Session;

  constructor() { }

  ngOnInit() {
    this.loadSession();
    this.getSessionActuelle();
    this.getNextSession();
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


}
