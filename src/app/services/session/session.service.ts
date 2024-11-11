import { Injectable } from '@angular/core';
import { Session } from '../../Model/SessionClass';
import { BehaviorSubject, Observable, of, tap  } from 'rxjs';
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

  private sessionsUpdatedSubject = new BehaviorSubject<void>(undefined);
  sessionsUpdated$ = this.sessionsUpdatedSubject.asObservable();

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

  createSession(lieu: string, dateDebut: Date, dateFin: Date, titre : string, description : string): Observable<string> {
    const body = {
      titre: titre,
      dateDebut: dateDebut,
      dateFin: dateFin,
      lieu: lieu,
      description: description,
    };
    const options = {
      withCredentials: true 
    };
    return this.http.post<string>(`${environment.apiUrl}/session/CreateSession`, body, options).pipe(
      tap(() => this.sessionsUpdatedSubject.next())
    );
  }

  private UpdateSession(lieu: string, dateDebut: Date, dateFin: Date, titre: string, description : string): Observable<string> {
    const body : any = {
      id: this.sessionSelectionneSubject.getValue()?.getId(),
      titre: titre,
      dateDebut: dateDebut,
      dateFin: dateFin,
      lieu: lieu,
      description: description,
    };
    const options = {
      withCredentials: true 
    };
    return this.http.put<string>(`${environment.apiUrl}/session/UpdateSession`, body, options).pipe(
      tap(() => this.sessionsUpdatedSubject.next()),
    );
  }

  public getActuelSessionDB() {
    return this.http.get(`${environment.apiUrl}/session/ActualSession`)
  }

  public GetNextSessionDB() {
    return this.http.get(`${environment.apiUrl}/session/NextSession`)
  }

  public deleteSession(session: Session) {
    console.log("session");
    console.log(session);
    const options = {
      withCredentials: true 
    };
    const body = {
      id: session.getId()
    };
    return this.http.post(`${environment.apiUrl}/session/DeleteSession`, body, options).subscribe(
      (response) => {
        console.log('Session supprimée');
      },
      (error) => {
        console.log('Une erreur est survenue');
      }
    );
  }

  public UpdateOrCreateSession(Session: Session) : Observable<string> {
    if (!this.HasSessionSelectionne()) {
      console.log('create');
      return this.createSession(Session.lieu, Session.dateDebut, Session.dateFin, Session.titre, Session.description);
    } else {
      console.log('update', Session);
      return this.UpdateSession(Session.lieu, Session.dateDebut, Session.dateFin, Session.titre, Session.description);
    }
  }

}
