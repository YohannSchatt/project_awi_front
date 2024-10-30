import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) {}

  confirmLogout() {
    this.dialogRef.close(true);
  }

  cancelLogout() {
    this.dialogRef.close(false);
  }
}
