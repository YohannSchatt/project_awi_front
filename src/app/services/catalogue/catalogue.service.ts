import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CatalogueDto, InfoJeuUnitaireDto } from './response-catalogue.dto';
import { environment } from '../../../environments/environment.development';

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
  readonly url = environment.apiURL + '/jeu/catalogue';

  private currentPageSubject = new BehaviorSubject<number>(-1);
  currentPage$ = this.currentPageSubject.asObservable();

  private pageJeuxMap: Map<number, InfoJeuUnitaireDto[]> = new Map();
  loadedPages: Set<number> = new Set();

  private currentJeuSubject = new BehaviorSubject<InfoJeuUnitaireDto | undefined>(undefined);
  currentJeuInfo$ = this.currentJeuSubject.asObservable();

  constructor() { }

  addCatalogue(page: number): Observable<void> {
    console.log('Fetching catalogue for page:', page);
    if (this.loadedPages.has(page)) {
      return of(undefined); // Page already loaded, do nothing
    }

    return this.http.get<CatalogueDto>(`${this.url}/${page}`).pipe(
      tap(catalogue => {
        console.log('Fetched catalogue succeeded for page:', page);
        this.pageJeuxMap.set(page, catalogue.jeux);
        this.loadedPages.add(page);
      }),
      catchError(error => {
        console.error('Error fetching catalogue:', error);
        return throwError(() => error);
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
    console.log('Setting current page to from service:', page);
    if (!this.loadedPages.has(page)) {
      this.addCatalogue(page).subscribe(() => {
        this.currentPageSubject.next(page);
      });
    } else {
      this.currentPageSubject.next(page);
    }
  }
  

  unSelectJeu(): void {
    console.log('Unselecting jeu from service');
    this.currentJeuSubject.next(undefined);
  }

  setSelectedJeu(jeuInfo: InfoJeuUnitaireDto): void {
    console.log('Setting selected jeu from the service:', jeuInfo);
    this.currentJeuSubject.next(jeuInfo);
  }

}
