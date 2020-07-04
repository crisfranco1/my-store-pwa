import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    httpRequest = this.addToken(httpRequest);
    return httpHandler.handle(httpRequest);
  }

  private addToken(httpRequest: HttpRequest<any>) {
    const token = this.authService.getToken();
    if (token) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          token
        }
      });
      return httpRequest;
    }
    return httpRequest;
  }
}
