import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaintingImageServiceService {

// https://dn8tovvtki.execute-api.us-east-1.amazonaws.com/v1/{bucket}
  getAllGalleryImages() {
    
    return this.httpClient.get(
      `https://dn8tovvtki.execute-api.us-east-1.amazonaws.com/v1/paintingimages?file=forestPainting.jpg`, { responseType: 'blob' }
      ).pipe(
        map((image) => image as Blob),
        catchError( error => {
          return throwError(() => error)
        })
      )
  }

  constructor(private httpClient: HttpClient) { }
}
