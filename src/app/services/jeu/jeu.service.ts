import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InfoJeuDto } from './dto/jeu.info.dto';
import { InfoJeuUnitaireDto } from '../catalogue/response-catalogue.dto';
import { CreerJeuUnitaire } from './dto/create-jeu-unitaire.dto';

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

  postJeuUnitaire(nouveauJeu: CreerJeuUnitaire): Promise<boolean> {
    console.log('Sending request with body:', nouveauJeu);
    return lastValueFrom(
      this.http.post(`${this.url}/creerJeuUnitaire`, nouveauJeu).pipe(
      map(() => true)
      )
    );
  }
}
