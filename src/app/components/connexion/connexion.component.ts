import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, Validator, Validators } from '@angular/forms';


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
  }

}
