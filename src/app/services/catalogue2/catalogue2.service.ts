import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CatalogueItemResponseDto, CatalogueResponseDto } from './catalogue-response.dto';
import { environment } from '../../../environment/environment';
import { CatalogueRequestDto } from './catalogue-request.dto';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService2 {
  private http = inject(HttpClient);
  readonly url = environment.apiUrl + '/jeu/catalogue';

  private currentJeuSubject = new BehaviorSubject<CatalogueItemResponseDto | undefined>(undefined);
  currentJeuInfo$ = this.currentJeuSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() {}

  setSelectedJeu(jeuInfo: CatalogueItemResponseDto): void {
    this.currentJeuSubject.next(jeuInfo);
  }

  unSelectJeu(): void {
    this.currentJeuSubject.next(undefined);
  }

  /**
   * Fait une requête POST /jeu/catalogue avec les paramètres de CatalogueRequestDto
   */
  getCatalogue(requestDto: CatalogueRequestDto): Observable<CatalogueResponseDto> {
    return this.http.post<CatalogueResponseDto>(this.url, requestDto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fait une requête POST /jeu/catalogue sans paramètres (page = 1 par défaut)
   */
  getCatalogueDefault(): Observable<CatalogueResponseDto> {
    const defaultRequest: CatalogueRequestDto = {
      page: 1,
      nom: '',
      editeur: '',
      prixMin: undefined,
      prixMax: undefined,
    };
    return this.getCatalogue(defaultRequest);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    this.errorMessageSubject.next(errorMessage);
    return throwError(errorMessage);
  }
}
