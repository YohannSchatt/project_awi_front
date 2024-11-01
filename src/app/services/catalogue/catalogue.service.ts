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
    this.addCatalogue(1);
    this.setCurrentPage(1);
  }

  private http = inject(HttpClient);
  readonly url = environment.apiURL + '/jeu/catalogue';

  private currentPageSubject = new BehaviorSubject<number>(-1);
  currentPage$ = this.currentPageSubject.asObservable();

  currentJeu: InfoJeuUnitaireDto | undefined = undefined;
  allJeuxLoaded: InfoJeuUnitaireDto[] = [];
  loadedPages: Set<number> = new Set();

  constructor() { }

  addCatalogue(page: number): void {
    if (this.loadedPages.has(page)) {
      return; // Page already loaded, do nothing
    }

    this.http.get<CatalogueDto>(`${this.url}/${page}`).pipe(
      tap(catalogue => {
        console.log('Fetched catalogue from the service :', catalogue);
        this.allJeuxLoaded = this.allJeuxLoaded.concat(catalogue.jeux);
        this.loadedPages.add(page);
      }),
      catchError(error => {
        console.error('Error fetching catalogue:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getCurrentJeu(): Observable<InfoJeuUnitaireDto> {
    return of(this.currentJeu ?? {} as InfoJeuUnitaireDto);
  }

  getCurrentPageJeux(): Observable<InfoJeuUnitaireDto[]> {
    return this.currentPage$.pipe(
      switchMap(page => {
        const startIndex = (page - 1) * 20;
        const endIndex = startIndex + 20;
        return of(this.allJeuxLoaded.slice(startIndex, endIndex));
      })
    );
  }

  setCurrentJeu(jeu: InfoJeuUnitaireDto | undefined): void {
    this.currentJeu
  }

  setCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }
}
