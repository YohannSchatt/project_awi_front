import { Component } from '@angular/core';
import { SessiontabPublicComponent } from '../../app/components/sessiontab-public/sessiontab-public.component';

@Component({
  selector: 'app-session-page',
  standalone: true,
  imports: [SessiontabPublicComponent],
  templateUrl: './session-page.component.html',
  styleUrl: './session-page.component.scss'
})
export class SessionPageComponent {

}
