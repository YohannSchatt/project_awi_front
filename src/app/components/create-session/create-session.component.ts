import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session/session.service';
import { Session } from '../../Model/SessionClass'; // Assurez-vous d'importer le modèle de session
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.scss'
})
export class CreateSessionComponent {

  public SessionGroup! : FormGroup;

  public Message : string = '';

  public sessionSubscription!: Subscription;

  public isEditing: boolean = false;

  constructor(private http : HttpClient, private sessionService : SessionService) { }

  ngOnInit(): void {
    this.SessionGroup = new FormGroup({
      titre: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      lieu: new FormControl(''),
      description : new FormControl('')
    });

    this.sessionSubscription = this.sessionService.sessionSelectionne$.subscribe(session => {
      if (session) {
        this.isEditing = true;
        this.SessionGroup.patchValue({
          titre: session.titre,
          dateDebut: this.formatDateToYYYYMMDD(new Date(session.dateDebut)),
          dateFin: this.formatDateToYYYYMMDD(new Date(session.dateFin)),
          lieu: session.lieu,
          description : session.description
        });
      }
      else {
        this.isEditing = false;
        this.SessionGroup.patchValue({
          titre: '',
          dateDebut: '',
          dateFin: '',
          lieu: '',
          description : ''
        });
      }
    });

    // Initial load
    const initialSession = this.sessionService.getSessionSelectionne();
    if (initialSession) {
      this.SessionGroup.patchValue({
        titre: initialSession.titre,
        dateDebut: this.formatDateToYYYYMMDD(new Date(initialSession.dateDebut)),
        dateFin: this.formatDateToYYYYMMDD(new Date(initialSession.dateFin)),
        lieu: initialSession.lieu,
        description : initialSession.description
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  private formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submit() : void {
    console.log('submit');
    if (this.isEditing) {
      this.Message = 'Mise à jour de la session en cours...';
    }
    else {
      this.Message = 'Création de la session en cours...';
    }
    this.sessionService.UpdateOrCreateSession(this.SessionGroup.value).subscribe((response) => {
      this.Message = response;
    });
  }

}
