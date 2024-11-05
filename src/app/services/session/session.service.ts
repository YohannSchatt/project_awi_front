import { Injectable } from '@angular/core';
import { Session } from '../../Model/SessionClass';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSelectionne: Session | null = null;

  private sessionSelectionneSubject = new BehaviorSubject<Session | null>(null);
  sessionSelectionne$ = this.sessionSelectionneSubject.asObservable();

  constructor() { }

  public getSessionSelectionne(): Session | null {
    return this.sessionSelectionneSubject.getValue();
  }

  public setSessionSelectionne(session: Session | null): void {
    this.sessionSelectionneSubject.next(session);
  }

  private CreateSession(lieu: string, dateDebut: Date, dateFin: Date, titre: string): Session {
    return new Session(lieu, dateDebut, dateFin, titre);
  }

  private UpdateSession(lieu: string, dateDebut: Date, dateFin: Date, titre: string): void {
    this.sessionSelectionne!.lieu = lieu;
    this.sessionSelectionne!.dateDebut = dateDebut;
    this.sessionSelectionne!.dateFin = dateFin;
    this.sessionSelectionne!.titre = titre;
  }

  private DeleteSession(session: Session) {
    console.log('Session supprimée');
  }

  public UpdateOrCreateSession(Session: Session) {
    if (this.sessionSelectionne === null) {
      this.CreateSession(Session.titre, Session.dateDebut, Session.dateFin, Session.lieu);
    } else {
      this.UpdateSession(Session.titre, Session.dateDebut, Session.dateFin, Session.lieu);
    }
  }

}
