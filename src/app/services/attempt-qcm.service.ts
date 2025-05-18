import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface AttemptDto {
  id: number;
  startedAt: string;
  completedAt: string;
  score: number;
  qcmSetId: number;
}


@Injectable({
  providedIn: 'root'
})
export class AttemptQcmService {
  private apiUrl = 'http://localhost:8080/api/attempts';




  constructor(private http: HttpClient) { }


  getUserAttempts(): Observable<AttemptDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AttemptDto[]>(this.apiUrl, { headers });
  }
}
