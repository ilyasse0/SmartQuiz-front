import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DecodedToken} from '../models/decoded-token.model';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/auth";

  constructor(private http : HttpClient , private router : Router) { }
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  // register(data: any) {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  verifyAccountToken(token: string):Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/activate-account?token=${token}`);
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }


}
