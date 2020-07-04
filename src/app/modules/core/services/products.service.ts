import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as Sentry from '@sentry/browser';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = `${environment.productsUrl}/products`;  // URL to web api

  constructor(private httpClient: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.productsUrl, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(
      retry(3),
      catchError(this.handlerError));
  }

  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productsUrl}/${productId}`).pipe(
      catchError(this.handlerError));
  }

  updateProduct(productId: string, product: Partial<Product>): Observable<Product> {
    return this.httpClient.put<Product>(`${this.productsUrl}/${productId}`, product);
  }

  deleteProductById(productId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.productsUrl}/${productId}`);
  }

  getFile()  {
    // O url de donde esta el archivo
    return this.httpClient.get('assets/files/hello.txt', { responseType: 'text' });
  }

  private handlerError(httpErrorResponse: HttpErrorResponse) {
    console.error(httpErrorResponse);
    Sentry.captureException(httpErrorResponse);
    return throwError('Some error');
  }

}
