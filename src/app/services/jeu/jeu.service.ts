import { environment } from '../../../environment/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { InfoJeuDto } from './dto/jeu.info.dto';
import { InfoJeuUnitaireDto } from '../catalogue/response-catalogue.dto';
import { CreerJeuUnitaire } from './dto/create-jeu-unitaire.dto';
import { InfoJeuUnitaireDisponibleDto } from './dto/info-jeu-unitaire-disponible.dto';
import { InvoiceDto } from './dto/invoice.dto';
import { HttpHeaders } from '@angular/common/http';
import { InfoJeuDBDto } from './dto/jeuDB.dto';
import { InfoJeuStockDto } from './dto/infoJeuStock.dto';
import { Statut } from '../../Model/Statut';
import { GetJeuResponseDto } from './dto/get-jeu-response';
import { CreateJeuDto } from './dto/create-jeu.dto';
import { UpdateJeuDto } from './dto/updtate-jeu.dto';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  private http = inject(HttpClient);

  readonly url = environment.apiUrl + '/jeu';

  constructor() { }

  getJeu(idJeu: number): Observable<GetJeuResponseDto> {
    const options = { withCredentials: true };
    return this.http.post<GetJeuResponseDto>(`${this.url}/getJeu`, { idJeu }, options);
  }

  async createJeu(createJeuDto: CreateJeuDto): Promise<boolean> {
    const options = { withCredentials: true };
    try {
      await lastValueFrom(
        this.http.post(`${this.url}/creerJeu`, createJeuDto, options)
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateJeu(updateJeuDto: UpdateJeuDto): Promise<boolean> {
    const options = { withCredentials: true };
    try {
      await lastValueFrom(
        this.http.put(`${this.url}/updateJeu`, updateJeuDto, options)
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteJeu(idJeu: number): Promise<boolean> {
    const options = { withCredentials: true };
    try {
      await lastValueFrom(
        this.http.delete(`${this.url}/deleteJeu`, { body: { idJeu }, ...options })
      );

      return true;
    } catch (error) {
      throw error;
    }
  }





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
    return this.http.get<InfoJeuUnitaireDisponibleDto[]>(`${this.url}/listInfoAchatJeuUnitaireDisponible`,options);
  }

  enregisterAchat(setIdJeuUnitaire: Set<number>): Observable<void> {
    const options = { withCredentials: true };
    const idsJeuUnitaire = Array.from(setIdJeuUnitaire); // Convert Set to Array
    return this.http.post<void>(`${this.url}/achat`, { idsJeuUnitaire }, options);
  }

  sendFacture(email : string,JeuxUnitaire : InfoJeuUnitaireDisponibleDto[]): Observable<Blob> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    const options = {
      headers: headers,
      responseType: 'blob' as 'json',
      withCredentials: true
    };

    const date = new Date();
    const body : InvoiceDto = {
      date : date,
      email : email,
      items: JeuxUnitaire
    }
    return this.http.post<Blob>(`${environment.apiUrl}/invoice/`, body, options);
  }

  getJeuxDB(nom? : string, editeur? : string): Observable<InfoJeuDBDto[]> {
    const options = { withCredentials: true };
    if (nom && editeur) {
      return this.http.get<InfoJeuDBDto[]>(`${this.url}/DBJeu?nom=${nom}&editeur=${editeur}`, options);
    }
    else if (nom) {
      return this.http.get<InfoJeuDBDto[]>(`${this.url}/DBJeu?nom=${nom}`, options);
    }
    else if (editeur) {
      return this.http.get<InfoJeuDBDto[]>(`${this.url}/DBJeu?editeur=${editeur}`, options);
    }
    else {
      return this.http.get<InfoJeuDBDto[]>(`${this.url}/DBJeu`, options);
    }
  }

  updateStatut(idJeu : number, statut : Statut): Observable<void> {
    const options = { withCredentials: true };
    const body : {idJeu : number, statut : Statut} = { idJeu : idJeu, statut : statut };
    return this.http.put<void>(`${this.url}/EtatJeu`, body, options);
  }

  getJeuxByEtat(etat: string, jeuId? : number, vendeurId? : number): Observable<InfoJeuStockDto[]> {
    const options = { withCredentials: true };
    if (jeuId && vendeurId && jeuId != -1 && vendeurId != -1) {
      return this.http.get<InfoJeuStockDto[]>(`${this.url}/jeuxEtat/${etat}?jeu=${jeuId}&vendeur=${vendeurId}`, options);
    }
    else if (jeuId && jeuId != -1) {
      return this.http.get<InfoJeuStockDto[]>(`${this.url}/jeuxEtat/${etat}?jeu=${jeuId}`, options);
    }
    else if (vendeurId && vendeurId != -1) {
      return this.http.get<InfoJeuStockDto[]>(`${this.url}/jeuxEtat/${etat}?vendeur=${vendeurId}`, options);
    }
    else {
      return this.http.get<InfoJeuStockDto[]>(`${this.url}/jeuxEtat/${etat}`, options);
    }
  }


}


