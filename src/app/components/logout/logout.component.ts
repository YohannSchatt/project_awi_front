import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>, private http : HttpClient) {}

  confirmLogout() {
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Logout');
    this.dialogRef.close(true);
  }

  cancelLogout() {
    this.dialogRef.close(false);
  }
}
