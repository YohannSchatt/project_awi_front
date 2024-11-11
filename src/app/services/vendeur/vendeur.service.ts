import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { VendeurInfoDto } from './dto/vendeur.info.dto';

@Injectable({
  providedIn: 'root'
})
export class VendeurService {

  private http = inject(HttpClient);

  readonly url =  environment.apiURL + '/vendeur';

    //same idea for the error message
    private errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
    errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() { }

  getVendeurs(): Observable<VendeurInfoDto[]> {
    return this.http.get<VendeurInfoDto[]>(`${this.url}/getListVendeurCurrentSession`);
  }
}
