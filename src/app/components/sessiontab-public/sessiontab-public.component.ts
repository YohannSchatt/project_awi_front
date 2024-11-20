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
    this.getActualSession();
    this.getNextSession();
    this.checkCurrentUrl(this.router.url);

    this.sessionService.sessionsUpdated$.subscribe(() => {
      this.getActualSession();
      this.getNextSession();
    });
  }

  ngOnDestroy() {
    this.sessionService.setSessionSelectionne(null);
  }

  public formatDateToDDMMYYYY(dateString: Date): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ajout des parenthèses
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajout des parenthèses et correction de l'indexation des mois
    const year = date.getFullYear().toString(); // Ajout des parenthèses
  
    return `${day}-${month}-${year}`;
  }

  private checkCurrentUrl(url: string) {
    this.OnAdminPage = url.includes('GestionSession');
    console.log('OnAdminPage:', this.OnAdminPage);
  }

  private getActualSession() {
    this.sessionService.getActuelSessionDB().subscribe((data : any) => {
      this.sessionActuelle = new Session(data.lieu, new Date(data.dateDebut), new Date(data.dateFin), data.titre, data.description, data.idSession, data.comission);
    });
  }

  private getNextSession() {
    this.sessionService.GetNextSessionDB().subscribe((data) => {
      console.log(data);
      this.loadSession(data);
    });
  }

  private loadSession(data : any) {
    this.tabSession = data.map((item: any) => new Session(item.lieu, item.dateDebut, item.dateFin, item.titre, item.description, item.idSession, item.comission));
  }

  public supprimerSession(session: Session) {
    this.sessionService.deleteSession(session)
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
