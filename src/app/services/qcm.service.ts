import { Injectable } from '@angular/core';
import { environment } from '../../environments';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {QcmSetDtoToAttempt} from '../models/qcm';
import {AttemptRequest} from '../models/AttemptRequest';

export interface ReviewDto {
  title: string;
  topic: string;
  questions: ReviewedQuestion[];
}

export interface ReviewedQuestion {
  questionId: number;
  content: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  options: OptionDto[];
}

export interface OptionDto {
  label: string;
  text: string;
}

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

export interface  QcmDto{
  id: number;
  title: string;
  topic: string;
  createdAt: string;
  isPublic: boolean | null;
  createdByUsername: string;

}

@Injectable({
  providedIn: 'root'
})
export class QcmService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  /**
   * Generates a QCM from the uploaded file and user details
   * @param file The file to upload for QCM generation
   * @param userDetails Optional user details
   * @param title
   * @param topic
   * @returns An Observable of the generated QcmSet
   */
  generateQcm(file: File, userDetails: any , title : string , topic : string): Observable<QcmSet> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title' , title);
    formData.append('topic' , topic);
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


  getQcmToAttempt(id: number): Observable<QcmSetDtoToAttempt> {
    return this.http.get<QcmSetDtoToAttempt>(`${this.apiUrl}/generate/Qcm/${id}`);
  }


  submitAttempt(request: AttemptRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    return this.http.post<{ score: number }>(`${this.apiUrl}/generate/submit`, request , {headers});
  }



  getUserQcms(): Observable<QcmDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<QcmDto[]>(`${this.apiUrl}/generate/my-qcms`, { headers });
  }

  toggleQcmPublic(qcmId: number): Observable<{ public: boolean }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ public: boolean }>(`${this.apiUrl}/generate/toggle-public/${qcmId}`, {}, { headers });
  }


  getPublicQcms(keyword?: string): Observable<QcmDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.http.get<QcmDto[]>(`${this.apiUrl}/generate/public`, { headers, params });
  }


  getReviewAttempt(attemptId: number): Observable<ReviewDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ReviewDto>(`${this.apiUrl}/api/attempts/review/${attemptId}`, { headers });
  }

}
