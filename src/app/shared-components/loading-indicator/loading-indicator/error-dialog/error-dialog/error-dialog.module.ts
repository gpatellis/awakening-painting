import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
})
export class ErrorDialogModule { }
