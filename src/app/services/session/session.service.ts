import { Injectable } from '@angular/core';
import { Session } from '../../Model/SessionClass';
import { BehaviorSubject, Observable, of  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSelectionne: Session | null = null;

  private sessionSelectionneSubject = new BehaviorSubject<Session | null>(null);
  sessionSelectionne$ = this.sessionSelectionneSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getSessionSelectionne(): Session | null {
    return this.sessionSelectionneSubject.getValue();
  }

  public setSessionSelectionne(session: Session | null): void {
    this.sessionSelectionneSubject.next(session);
    console.log(this.sessionSelectionneSubject.getValue());
  }

  public HasSessionSelectionne(): boolean {
    return this.sessionSelectionneSubject.getValue() !== null;
  }

  createSession(lieu: string, dateDebut: Date, dateFin: Date, titre : string): Observable<string> {
    const body = {
      titre: titre,
      dateDebut: dateDebut,
      dateFin: dateFin,
      lieu: lieu
    };
    const options = {
      withCredentials: true 
    };
    return this.http.post(`${environment.apiUrl}/admin/createSession`, body, options).pipe(
      map((response) => 'Session créée'),
      catchError((error) => of('Une erreur est survenue'))
    );
  }

  private UpdateSession(lieu: string, dateDebut: Date, dateFin: Date, titre: string): Observable<string> {
    this.sessionSelectionne!.lieu = lieu;
    this.sessionSelectionne!.dateDebut = dateDebut;
    this.sessionSelectionne!.dateFin = dateFin;
    this.sessionSelectionne!.titre = titre;
    const body = {
      titre: titre,
      dateDebut: dateDebut,
      dateFin: dateFin,
      lieu: lieu
    };
    const options = {
      withCredentials: true 
    };
    return this.http.put(`${environment.apiUrl}/admin/createSession`, body, options).pipe(
      map((response) => 'Session Modifiée'),
      catchError((error) => of('Une erreur est survenue'))
    );
  }

  private DeleteSession(session: Session) {
    console.log('Session supprimée');
  }

  public UpdateOrCreateSession(Session: Session) : Observable<string> {
    if (!this.HasSessionSelectionne()) {
      console.log('create');
      return this.createSession(Session.titre, Session.dateDebut, Session.dateFin, Session.lieu);
    } else {
      console.log('update');
      return this.UpdateSession(Session.titre, Session.dateDebut, Session.dateFin, Session.lieu);
    }
  }

}
