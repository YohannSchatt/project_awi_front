import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { VendeurInfoDto } from './dto/vendeur.info.dto';
import { SearchVendeurDto } from './dto/search-Vendeur.dto';

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
}
