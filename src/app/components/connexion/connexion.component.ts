import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule, NgIf, NgClass],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  public userGroup!: FormGroup;

  public error: string = '';

  public invalidAuth: boolean = false;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.userGroup = new FormGroup({
      email: new FormControl('',
        [Validators.required, 
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]
      ),
      password: new FormControl('')
    });
  }

  submit() {
    console.log('submit');
    this.userService.getAuth(this.userGroup.value.email, this.userGroup.value.password).subscribe(
      (user) => {
        this.userService.createNewUser();
        this.userService.setPrenom(user.prenom);
        this.userService.setNom(user.nom);
        this.userService.setEmail(user.email);
        this.userService.setRole(user.role);
        this.router.navigate(['/gestion/home-gestion']);
      },
      (error) => {
        this.invalidAuth = true;
        this.error = error.error.message;
        if (this.error === 'Invalid credentials') {
          this.error = 'Identifiants incorrects';
        }
        else {
          this.error = 'Une erreur est survenue';
        }
      }
    );
  }

}
