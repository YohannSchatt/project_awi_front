import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CatalogueItemResponseDto } from './catalogue-response.dto';
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

  constructor() { }

  setSelectedJeu(jeuInfo: CatalogueItemResponseDto): void {
    this.currentJeuSubject.next(jeuInfo);
  }

  unSelectJeu(): void {
    this.currentJeuSubject.next(undefined);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    this.errorMessageSubject.next(errorMessage);
    return throwError(errorMessage);
  }
}
