import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaintingData } from '../gallery-interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingImageService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private errorDialogService: ErrorDialogService,
    private loadingIndicatorService: LoadingIndicatorService) 
  { }

  getPaintingData(): Observable<PaintingData[]> {
    return this.httpClient.get(
      `${environment.getImagesFromCloudFrontS3}${environment.paintingData}`, { responseType: 'json' }
      ).pipe(
        map((paintingData: any) => {
          let paintingDataArray: PaintingData[] = [];
          Object.keys(paintingData).forEach((key) => {
            paintingData[key].image = key;
            paintingDataArray.push(paintingData[key])
          });
          return paintingDataArray.reverse() as PaintingData[];
        }),
        catchError( error => {
          this.errorDialogService.isPaintingDataError$.next(true);
          this.loadingIndicatorService.hide();
          return throwError(() => error)
        })
      )
  }

  populatePaintingDataWithImages(paintingData: PaintingData[]): void {
    paintingData.forEach(paintingDataSet => {
      this.httpClient.get(
        `${environment.getImagesFromCloudFrontS3}${paintingDataSet.image}`, { responseType: 'blob' }
        ).pipe(
          map((imageResponse) => imageResponse),
          catchError( error => {
            this.loadingIndicatorService.hide();
            this.errorDialogService.isPaintingDataError$.next(true);
            return throwError(() => error);
          })
        ).subscribe((imageResponse) => {
          let objectURL = URL.createObjectURL(imageResponse as Blob);
          paintingDataSet.objectUrl = objectURL;
          paintingDataSet.renderedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
      )});       
  }

  getSinglePaintingImage(painting: PaintingData): Observable<PaintingData> {
    return this.httpClient.get(
      `${environment.getImagesFromCloudFrontS3}${painting.image}`, { responseType: 'blob' }
      ).pipe(
        map((imageResponse) => {
          let objectURL = URL.createObjectURL(imageResponse as Blob);
          painting.objectUrl = objectURL;
          painting.renderedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          return painting;
        }),
        catchError( error => {
          return throwError(() => error)
        })
      )
  };       
}