import { Component } from '@angular/core';
import { Session } from '../../Model/SessionClass';


@Component({
  selector: 'app-sessiontab-public',
  standalone: true,
  imports: [],
  templateUrl: './sessiontab-public.component.html',
  styleUrl: './sessiontab-public.component.scss'
})
export class SessiontabPublicComponent {

  public tabSession!: Session[];

  ngOnInit() {
    this.loadSession();
  }

  private loadSession() {
    const data = require('./session.json');
    this.tabSession = data.map((item: any) => new Session(item.lieu, item.dateDebut, item.dateFin, item.titre));
  }


}
