import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaintingData, PaintingDataResponse } from '../gallery-interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaintingImageService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer) 
  { }

  getPaintingData(): Observable<PaintingData[]> {
    return this.httpClient.get(
      `${environment.getImagesFromS3Endpoint}paintingData.json`, { responseType: 'json' }
      ).pipe(
        map((paintingData) => ((paintingData as PaintingDataResponse).paintings) as PaintingData[]),
        catchError( error => {
          return throwError(() => error)
        })
      )
  }

  populatePaintingDataWithImages(paintingData: PaintingData[]): void {
    paintingData.forEach(paintingDataSet => {
      this.httpClient.get(
        `${environment.getImagesFromS3Endpoint}${paintingDataSet.image}`, { responseType: 'blob' }
        ).pipe(
          map((imageResponse) => imageResponse),
          catchError( error => {
            return throwError(() => error)
          })
        ).subscribe((imageResponse) => {
          let objectURL = URL.createObjectURL(imageResponse as Blob);
          paintingDataSet.objectUrl = objectURL;
          paintingDataSet.renderedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.storePaintingImagesInStorage(paintingData);
          }
      )});       
  }

  storePaintingImagesInStorage(paintingImages: PaintingData[]): void {
    localStorage.setItem('paintingData', JSON.stringify(paintingImages));
  }

  getPaintingImagesFromStorage(): PaintingData[] {
    let paintingData = JSON.parse(localStorage.getItem('paintingData') as string);
    paintingData.forEach((painting: PaintingData) => {
      painting.renderedImage =  this.sanitizer.bypassSecurityTrustResourceUrl(painting.objectUrl);
    });
    return paintingData;
  }

  removePaintingImagesFromLocalStorage(): void {
    localStorage.removeItem('paintingData');
  }
}