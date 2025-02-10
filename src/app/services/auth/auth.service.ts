import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { UserService } from '../user/user.service';
import { User } from '../../Model/UserClass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private userService : UserService) {}

  public isAuthenticated(): void {
    // this.http.get<{ user : User }>(`${environment.apiUrl}/auth/verify`, { withCredentials: true }).pipe(
    //   map(response => {
    //     this.userService.createNewUser();
    //     this.userService.setPrenom(response.user.prenom);
    //     this.userService.setNom(response.user.nom);
    //     this.userService.setEmail(response.user.email);
    //     this.userService.setRole(response.user.role);
    //   })
    // ).subscribe(
    //   () => console.log('Authenticated'),
    //   (error) => console.log('Not authenticated')
    // );
  }
}
