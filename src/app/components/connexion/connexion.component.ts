import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  public userGroup!: FormGroup;

  public error: string = '';

  constructor() { }

  ngOnInit() {
    this.userGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    console.log('submit');
  }

}
