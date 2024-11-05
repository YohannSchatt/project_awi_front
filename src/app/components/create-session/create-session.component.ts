import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session/session.service';
import { Session } from '../../Model/SessionClass'; // Assurez-vous d'importer le modèle de session
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.scss'
})
export class CreateSessionComponent {

  public SessionGroup! : FormGroup;

  public Message : string = '';

  private sessionSubscription!: Subscription;

  constructor(private http : HttpClient, private sessionService : SessionService) { }

  ngOnInit(): void {
    this.SessionGroup = new FormGroup({
      titre: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      lieu: new FormControl('')
    });

    this.sessionSubscription = this.sessionService.sessionSelectionne$.subscribe(session => {
      if (session) {
        this.SessionGroup.patchValue({
          titre: session.titre,
          dateDebut: session.dateDebut,
          dateFin: session.dateFin,
          lieu: session.lieu
        });
      }
    });

    // Initial load
    const initialSession = this.sessionService.getSessionSelectionne();
    if (initialSession) {
      this.SessionGroup.patchValue({
        titre: initialSession.titre,
        dateDebut: initialSession.dateDebut,
        dateFin: initialSession.dateFin,
        lieu: initialSession.lieu
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  submit() : void {
    this.Message = 'Création de la session en cours...';
    const body : any = {
      titre: this.SessionGroup.value.titre,
      dateDebut: this.SessionGroup.value.dateDebut,
      dateFin: this.SessionGroup.value.dateFin,
      lieu: this.SessionGroup.value.lieu
    };
    const options = {
      withCredentials: true 
    };
    this.http.post('http://localhost:3000/admin/createSession', body, options).subscribe(
      (response) => {
        this.Message = 'Session créée';
      },
      (error) => {
        this.Message = 'Une erreur est survenue';
      }
    )
  }

}
