import { Injectable } from '@angular/core';
import { User } from '../../Model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    }
    return this.http.post<User>('http://localhost:3000/auth/login', body);
    
  }

  public logout() {
    this.user = null;
  }

  public getName(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.name;
  }

  public setName(name : string) {
    if (this.user != null) {
      this.user.name = name;
    }
  }

  public getFirstname(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.firstname;
  }

  public setFirstname(firstname : string) {
    if (this.user != null) {
      this.user.firstname = firstname;
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

  public getTel(): string {
    if (this.user == null) {
      return '';
    }
    return this.user.tel;
  }

  public setTel(tel : string) {
    if (this.user != null) {
      this.user.tel = tel;
    }
  }

  public getUser(): User | null {
    return this.user;
  }

  public setUser(user : User) {
    this.user = user;
  }

}
