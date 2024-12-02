import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { DashboardDto } from '../../services/dto/dashboard.dto';
import { Decimal } from 'decimal.js';
import { VenteDto } from '../../services/dto/vente.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @Input() public infoDashboard: DashboardDto = new DashboardDto();

  @Input() case : number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.infoDashboard);
  }

}
