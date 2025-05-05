import { Injectable } from '@angular/core';
import { environment } from '../../environments';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Authority {
  authority: string;
}

export interface User {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  accountLocked: boolean;
  createdAt: Date;
  updateAt: string;
  updatedAt: string;
  fullName: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  credentialsNonExpired: boolean;
}

export interface Document {
  id: number;
  title: string;
  filename: string;
  uploadedBy: User;
  uploadedAt: string;
  status: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QcmSet {
  id: number;
  title: string;
  topic: string;
  document: Document;
  createdBy: User;
  createdAt: string;
  fileName?: string;
  updatedAt?: Date;
  questions?: Question[];
}

export interface GeneratedQcm {
  title: string;
  question: Question;
}

@Injectable({
  providedIn: 'root'
})
export class QcmService {
  private apiUrl = `${environment.apiUrl}/generate/qcm`;

  constructor(private http: HttpClient) { }

  /**
   * Generates a QCM from the uploaded file and user details
   * @param file The file to upload for QCM generation
   * @param userDetails Optional user details
   * @returns An Observable of the generated QcmSet
   */
  generateQcm(file: File, userDetails: any): Observable<QcmSet> {
    const formData = new FormData();
    formData.append('file', file);
    if (userDetails) {
      formData.append('userDetails', JSON.stringify(userDetails));
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      //.set('Content-Type', 'multipart/form-data');

    return this.http.post<QcmSet>(`http://localhost:8080/generate/qcm`, formData, { headers });
  }

  /**
   * Handle HTTP errors
   * @param error The HTTP error response
   * @returns An error Observable with a user-friendly message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status}. ${error.error?.message || error.statusText}`;

      // Additional logging for debugging
      console.log('Full error response:', error);

      if (error.status === 500) {
        errorMessage = 'Server error: The server encountered an unexpected condition that prevented it from fulfilling the request.';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
