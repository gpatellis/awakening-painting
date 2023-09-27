import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared-components/loading-indicator/loading-indicator/error-dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  errorDialogRef!: MatDialogRef<ErrorDialogComponent>;
  isPaintingDataError$ = new Subject<boolean>();

  constructor(public dialog: MatDialog) { }

  open(message: string, error?: any) {
    if (error)
      console.error(error);
    console.error(message);
    this.errorDialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { 
        errorMessage: message
      },
      panelClass: 'error-message-dialog'
    });
  }

  close() {
    this.errorDialogRef.close();
  }
}
