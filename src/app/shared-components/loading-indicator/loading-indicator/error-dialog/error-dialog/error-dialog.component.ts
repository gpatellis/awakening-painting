import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';

@Component({
  selector: 'ap-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit, OnDestroy {
  errorMessage: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public errorMessageModalData: any,
  private errorDialogService: ErrorDialogService) {}

  ngOnInit(): void {
    this.errorMessage = this.errorMessageModalData.errorMessage;
  }

  closeErrorDialog() {
    this.errorDialogService.close();
  }

  ngOnDestroy(): void {
    this.errorDialogService.close();
  }
}
