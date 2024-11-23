import { environment } from '../../../environment/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { VendeurInfoDto } from './dto/vendeur.info.dto';
import { SearchVendeurDto } from './dto/search-Vendeur.dto';
import { EnregistrerRetraitArgentDto } from './dto/enregistrer-retrait-argent.dto';
import { EnregistrerRetraitJeuDto } from './dto/enregistrer-retrait-jeu.dto';
@Injectable({
  providedIn: 'root'
})
export class VendeurService {

  private http = inject(HttpClient);

  readonly url =  environment.apiUrl + '/vendeur';

    //same idea for the error message
    private errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
    errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() { }


  getVendeurs(SearchVendeurDto? : SearchVendeurDto): Observable<VendeurInfoDto[]> {
    const body : any =  {}
    console.log(SearchVendeurDto);
    if (SearchVendeurDto?.nom != '') {
      body.nom = SearchVendeurDto?.nom
    }
    if (SearchVendeurDto?.prenom != '') {
      body.prenom = SearchVendeurDto?.prenom
    }
    if (SearchVendeurDto?.email != '') {
      body.email = SearchVendeurDto?.email
    }
    if (SearchVendeurDto?.numero != '') {
      body.numero = SearchVendeurDto?.numero
    }
    const options = { withCredentials: true };
    return this.http.post<VendeurInfoDto[]>(`${this.url}/getListVendeur`, body, options);
  }

  getAllVendeurs(): Observable<VendeurInfoDto[]> {
    return this.http.get<VendeurInfoDto[]>(`${this.url}/getListAllVendeur`, {withCredentials: true});
  }



  updateVendeur(vendeur: VendeurInfoDto): Observable<VendeurInfoDto> {
    const options = { withCredentials: true };
    const body : any = {
      idVendeur : vendeur.idVendeur,
      nom : vendeur.nom,
      prenom : vendeur.prenom,
      email : vendeur.email,
      numero : vendeur.numero
    }
    return this.http.post<VendeurInfoDto>(`${this.url}/updateVendeur`, body, options);
  }

  createVendeur(vendeur: VendeurInfoDto): Observable<VendeurInfoDto> {
    console.log(vendeur);
    const options = { withCredentials: true };
    const body : any = {
      nom : vendeur.nom,
      prenom : vendeur.prenom,
      email : vendeur.email,
      numero : vendeur.numero
    }
    return this.http.post<VendeurInfoDto>(`${this.url}/createVendeur`, body, options);
  }
// ancienne facon de faire
  // postRetraitJeu(idVendeur: number, idJeu: number): Observable<void> {
  //   const options = { withCredentials: true };
  //   const body : EnregistrerRetraitJeuDto = {
  //     idVendeur : idVendeur,
  //     idJeu : idJeu
  //   }
  //   return this.http.post<void>(`${this.url}/enregistrerRetraitJeu`, body, options);
  // }

  // postRetraitArgent(idVendeur: number, montant: number): Observable<void> {
  //   const options = { withCredentials: true };
  //   const body : EnregistrerRetraitArgentDto = {
  //     idVendeur : idVendeur,
  //     montant : montant
  //   }
  //   return this.http.post<void>(`${this.url}/enregistrerRetraitArgent`, body, options);
  // }
  async postRetraitJeu(idVendeur: number, idJeu: number): Promise<[boolean, string]> {
    const options = { withCredentials: true };
    const body: EnregistrerRetraitJeuDto = {
      idVendeur: idVendeur,
      idJeu: idJeu
    };

    try {
      await this.http.post<void>(`${this.url}/enregistrerRetraitJeu`, body, options).toPromise();
      return [true, 'Enregistrement du retrait réussi'];
    } catch (error: any) {
      const errorMessage = error.message ? `Erreur: ${error.message}` : 'Erreur inconnue';
      return [false, errorMessage];
    }
  }

  async postRetraitArgent(idVendeur: number, montant: number): Promise<[boolean, string]> {
    const options = { withCredentials: true };
    const body: EnregistrerRetraitArgentDto = {
      idVendeur: idVendeur,
      montant: montant
    };

    try {
      await this.http.post<void>(`${this.url}/enregistrerRetraitArgent`, body, options).toPromise();
      return [true, 'Enregistrement du retrait réussi'];
    } catch (error: any) {
      const errorMessage = error.message ? `Erreur: ${error.message}` : 'Erreur inconnue';
      return [false, errorMessage];
    }
  }
}
