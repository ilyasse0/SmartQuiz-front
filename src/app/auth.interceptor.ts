import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, add it to the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continue with the modified request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Redirect to login page if unauthorized (401)
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
