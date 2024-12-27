import { environment } from '../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { InfoJeuDto } from './dto/jeu.info.dto';
import { InfoJeuUnitaireDto } from '../catalogue/response-catalogue.dto';
import { CreerJeuUnitaire } from './dto/create-jeu-unitaire.dto';
import { InfoJeuUnitaireDisponibleDto } from './dto/info-jeu-unitaire-disponible.dto';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  private http = inject(HttpClient);

  readonly url = environment.apiUrl + '/jeu';

  constructor() { }

  getJeuUnitairesByVendeur(idVendeur: number): Observable<InfoJeuUnitaireDisponibleDto[]> {
    const options = { withCredentials: true };
    return this.http.get<InfoJeuUnitaireDisponibleDto[]>(
      `${this.url}/jeuxDisponibleByVendeur/${idVendeur}`,
      options
    );
  }
  // Method to get all jeux with credentials
  getJeux(): Observable<InfoJeuDto[]> {
    const options = { withCredentials: true };
    return this.http.get<InfoJeuDto[]>(`${this.url}/listeJeu`, options);
  }

  // Method to post a new jeu unitaire with credentials
  postJeuUnitaire(nouveauJeu: CreerJeuUnitaire): Promise<boolean> {
    const options = { withCredentials: true };
    return lastValueFrom(
      this.http.post(`${this.url}/creerJeuUnitaire`, nouveauJeu, options).pipe(
        map(() => true)
      )
    );
  }

  getListeJeuUnitaire(): Observable<InfoJeuUnitaireDisponibleDto[]> {
    const options = { withCredentials: true };
    return this.http.get<InfoJeuUnitaireDisponibleDto[]>(
      `${this.url}/listInfoAchatJeuUnitaireDisponible`,
      options
    );
  }
  enregisterAchat(setIdJeuUnitaire: Set<number>): Observable<void> {
    const options = { withCredentials: true };
    const idsJeuUnitaire = Array.from(setIdJeuUnitaire); // Convert Set to Array
    return this.http.post<void>(`${this.url}/achat`, { idsJeuUnitaire }, options);
  }
}


