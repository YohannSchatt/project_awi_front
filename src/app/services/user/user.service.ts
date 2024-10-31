import { Injectable } from '@angular/core';
import { User } from '../../Model/UserClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;

  constructor(private http: HttpClient) { }

  public getAuth(email : string,password : string): Observable<User> {
    const body : any = {
      email: email,
      password: password
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // This is the key part to include cookies
    };
    return this.http.post<{user : User}>('http://localhost:3000/auth/login',body,options).pipe(map(response => response.user));
  }

  public logout() {
    this.user = null;
  }

  public createNewUser(){
    this.user = new User;
  }

  public getNom(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.nom;
  }

  public setNom(nom : string) {
    if (this.user != null) {
      this.user.nom = nom;
    }
  }

  public getPrenom(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.prenom;
  }

  public setPrenom(prenom : string) {
    if (this.user != null) {
      this.user.prenom = prenom;
    }
  }

  public getEmail(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.email;
  }

  public setEmail(email : string) {
    if (this.user != null) {
      this.user.email = email;
    }
  }

  public getRole(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.role;
  }

  public setRole(role : string) {
    if (this.user != null) {
      this.user.role = role;
    }
  }

  public getUser(): User | null {
    return this.user;
  }

  public setUser(user : User) {
    this.user = user;
  }

}
