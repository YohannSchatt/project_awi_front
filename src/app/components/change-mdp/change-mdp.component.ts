import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-mdp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-mdp.component.html',
  styleUrl: './change-mdp.component.scss'
})
export class ChangeMdpComponent {

  public MdpGroup!: FormGroup;

  ngOnInit() {
    this.MdpGroup = new FormGroup({
      oldMdp : new FormControl('', [ Validators.required ]),
      newMdp : new FormControl('', [ Validators.required ]),
      confirmMdp : new FormControl('', [ Validators.required ]),
    })
  }

  public submit() {
    console.log('submit');
  }

}
