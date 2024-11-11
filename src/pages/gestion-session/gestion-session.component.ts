import { Component } from '@angular/core';
import { CreateSessionComponent } from '../../app/components/create-session/create-session.component';
import { SessiontabPublicComponent } from '../../app/components/sessiontab-public/sessiontab-public.component';

@Component({
  selector: 'app-gestion-session',
  standalone: true,
  imports: [CreateSessionComponent, SessiontabPublicComponent],
  templateUrl: './gestion-session.component.html',
  styleUrl: './gestion-session.component.scss'
})
export class GestionSessionComponent {

}
