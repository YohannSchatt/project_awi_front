import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-info-perso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './info-perso.component.html',
  styleUrl: './info-perso.component.scss'
})
export class InfoPersoComponent {

  public PersoGroup!: FormGroup;

  constructor(private userService : UserService) {}

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
    console.log('submit');
  }

}
