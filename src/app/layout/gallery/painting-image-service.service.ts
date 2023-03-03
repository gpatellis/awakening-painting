import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaintingData, PaintingDataResponse } from './gallery-interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PaintingImageServiceService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer) 
  { }

  getPaintingData() {
    return this.httpClient.get(
      `https://dn8tovvtki.execute-api.us-east-1.amazonaws.com/v1/paintingimages?file=paintingData.json`, { responseType: 'json' }
      ).pipe(
        map((paintingData) => ((paintingData as PaintingDataResponse).paintings) as PaintingData[]),
        catchError( error => {
          return throwError(() => error)
        })
      )
  }

  populatePaintingDataWithImages(paintingData: PaintingData[]) {
    paintingData.forEach(paintingDataSet => {
      this.httpClient.get(
        `https://dn8tovvtki.execute-api.us-east-1.amazonaws.com/v1/paintingimages?file=${paintingDataSet.image}`, { responseType: 'blob' }
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

  storePaintingImagesInStorage(paintingImages: PaintingData[]) {
    localStorage.setItem('paintingData', JSON.stringify(paintingImages));
  }

  getPaintingImagesFromStorage() {
    let paintingData = JSON.parse(localStorage.getItem('paintingData') as string);
    paintingData.forEach((painting: PaintingData) => {
      painting.renderedImage =  this.sanitizer.bypassSecurityTrustResourceUrl(painting.objectUrl);
    });
    return paintingData;
  }

  removePaintingImagesFromLocalStorage() {
    localStorage.removeItem('paintingData');
  }
}
