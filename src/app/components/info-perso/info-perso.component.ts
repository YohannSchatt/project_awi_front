import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-info-perso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './info-perso.component.html',
  styleUrl: './info-perso.component.scss'
})
export class InfoPersoComponent {

  public PersoGroup!: FormGroup;

  constructor(private userService : UserService, private http : HttpClient) {}

  public Message : string = '';

  ngOnInit() {
    this.PersoGroup = new FormGroup({
      nom : new FormControl(this.userService.getNom()),
      prenom : new FormControl(this.userService.getPrenom()),
      email : new FormControl(this.userService.getEmail(),
      [ Validators.required, 
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });
  }

  public submit() {
    const body : any = {
      prenom: this.PersoGroup.value.prenom,
      nom: this.PersoGroup.value.nom,
      email: this.PersoGroup.value.email
    }
    const options = {
      withCredentials: true // This is the key part to include cookies
    };
    this.http.put<{prenom : string, nom : string, email : string}>(`${environment.apiUrl}/user/UpdateInfoPerso`, body, options).subscribe(
      (response) => {
        this.userService.setPrenom(this.PersoGroup.value.prenom);
        this.userService.setNom(this.PersoGroup.value.nom);
        this.userService.setEmail(this.PersoGroup.value.email);
        this.Message = 'Informations mises à jour';
    },
    (error) => {
      this.Message = 'Une erreur est survenue';
    });
  }
}
