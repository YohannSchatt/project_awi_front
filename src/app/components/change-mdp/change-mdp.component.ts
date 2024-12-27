import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-mdp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-mdp.component.html',
  styleUrl: './change-mdp.component.scss'
})
export class ChangeMdpComponent {

  public MdpGroup!: FormGroup;

  public Message : string = '';

  ngOnInit() {
    this.MdpGroup = new FormGroup({
      oldMdp : new FormControl('', [ Validators.required ]),
      newMdp : new FormControl('', [ Validators.required ]),
      confirmMdp : new FormControl('', [ Validators.required ]),
    })
  }

  constructor(private http : HttpClient) {}

  public submit() {
    if (this.MdpGroup.value.newMdp !== this.MdpGroup.value.confirmMdp) {
      this.Message = 'Le nouveau mot de passe et la confirmation ne correspondent pas';
    }
    const body : any = {
      oldMdp: this.MdpGroup.value.oldMdp,
      newMdp: this.MdpGroup.value.newMdp
    }
    const options = {
      withCredentials: true // This is the key part to include cookies
    };
    this.http.put<{message : string}>(`${environment.apiUrl}/user/UpdatePassword`, body, options).subscribe(
      (response) => {
        this.Message = 'Mot de passe modifié';
      },
      (error) => {
        this.Message = 'Une erreur est survenue';
      });
  }
}
