import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CatalogueDto, InfoJeuUnitaireDto } from './response-catalogue.dto';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  initialize() {
    this.addCatalogue(1).subscribe(() => {
      this.setCurrentPage(1);
    });
  }

  private http = inject(HttpClient);
  readonly url = environment.apiUrl + '/jeu/catalogue';

  private currentPageSubject = new BehaviorSubject<number>(-1);
  currentPage$ = this.currentPageSubject.asObservable();

  private pageJeuxMap: Map<number, InfoJeuUnitaireDto[]> = new Map();
  loadedPages: Set<number> = new Set();

  private currentJeuSubject = new BehaviorSubject<InfoJeuUnitaireDto | undefined>(undefined);
  currentJeuInfo$ = this.currentJeuSubject.asObservable();

  //same idea for the error message
  private errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() { }

  addCatalogue(page: number): Observable<void> {
    // console.log('Fetching catalogue for page:', page);
    if (this.loadedPages.has(page)) {
      return of(undefined); // Page already loaded, do nothing
    }

    return this.http.get<CatalogueDto>(`${this.url}/${page}`).pipe(
      tap(catalogue => {
        // console.log('Fetched catalogue succeeded for page:', page);
        this.pageJeuxMap.set(page, catalogue.jeux);
        this.loadedPages.add(page);
      }),
      catchError(error => {
      console.error(`HTTP Error: ${error.status} ${error.statusText}`);
      this.errorMessageSubject.next(`HTTP Error: ${error.status} ${error.statusText}`);
      return of(undefined);
      }),
      map(() => undefined)
    );
  }

  getCurrentPageJeux(): Observable<InfoJeuUnitaireDto[]> {
    return this.currentPage$.pipe(
      map(page => this.pageJeuxMap.get(page) ?? [])
    );
  }

  setCurrentPage(page: number): void {
    if (!this.loadedPages.has(page)) {
      this.addCatalogue(page).subscribe(() => {
        this.currentPageSubject.next(page);
      });
    } else {
      this.currentPageSubject.next(page);
    }
  }


  unSelectJeu(): void {
    this.currentJeuSubject.next(undefined);
  }

  setSelectedJeu(jeuInfo: InfoJeuUnitaireDto): void {
    this.currentJeuSubject.next(jeuInfo);
  }

}
