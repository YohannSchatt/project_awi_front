import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchSessionDto } from '../../services/session/dto/search-Session.dto';
import { SessionInfoDto } from '../../services/session/dto/session.info.dto';
import { formatDate, NgClass } from '@angular/common';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-search-tab-session',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './search-tab-session.component.html',
  styleUrl: './search-tab-session.component.scss'
})
export class SearchTabSessionComponent {

  @Output() vendeurSelected = new EventEmitter<SessionInfoDto>();

  Message: string = '';

  SessionSearchGroup!: FormGroup;

  tabSession : SessionInfoDto[] = [];

  idSelectedSession : number = -1;

  constructor(private vendeurService : SessionService ) {  }

  ngOnInit(): void {
    this.SessionSearchGroup = new FormGroup({
      titre: new FormControl(''),
      lieu: new FormControl(''),
      dateDebut: new FormControl(''),
      DateFin: new FormControl(''),
    });
    this.loadSession();
  }

  submit(): void{
    const searchSession : SearchSessionDto = new SearchSessionDto();
    searchSession.titre = this.SessionSearchGroup.get('titre')?.value;
    searchSession.lieu = this.SessionSearchGroup.get('lieu')?.value;
    searchSession.dateDebut = this.SessionSearchGroup.get('dateDebut')?.value;
    searchSession.dateFin = this.SessionSearchGroup.get('dateFin')?.value;
    this.loadSession(searchSession);
  }

  chercher(session : SessionInfoDto): void{
    if (session.idSession == this.idSelectedSession){
      this.idSelectedSession = -1;
      this.vendeurSelected.emit(new SessionInfoDto());
    }
    else {
      this.idSelectedSession = session.idSession;
      this.vendeurSelected.emit(session);
    }

  }

  public loadSession(session? : SearchSessionDto): void {
      this.vendeurService.getSessions(session).subscribe(
        (data: SessionInfoDto[]) => {
          this.tabSession = data.map(session => {
            console.log(session);
            session.dateDebut = this.formatDateJJMMYYYY(session.dateDebut);
            session.dateFin = this.formatDateJJMMYYYY(session.dateFin);
            return session;
          });
        },
      (error) => {
        console.error('Error loading vendeurs:', error);
      }
    );
  } 

  formatDateJJMMYYYY(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

