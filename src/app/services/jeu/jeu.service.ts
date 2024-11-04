import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InfoJeuDto } from './dto/jeu.info.dto';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  private http = inject(HttpClient);

  readonly url = environment.apiURL + '/jeu';

  constructor() { }

  // Method to get all jeux
  getJeux(): Observable<InfoJeuDto[]> {
    return this.http.get<InfoJeuDto[]>(`${this.url}/listeJeu`);
  }
}
