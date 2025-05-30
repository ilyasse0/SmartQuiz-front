import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: 'header.component.css'
})
export class HeaderComponent  implements  OnInit{

  constructor(private authService : AuthService , private router : Router) {
  }
  username: string | null = null;
  role: string | null = null;
  ngOnInit(): void {
    this.loadUserFromToken();

  }
  loadUserFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        try {
          const payloadJson = atob(payloadBase64);
          const payload = JSON.parse(payloadJson);
          this.username = payload.sub || payload.username || null;
          if (payload.role) {
            this.role = payload.role;
          } else if (payload.authorities && Array.isArray(payload.authorities)) {
            this.role = payload.authorities[0];
          } else {
            this.role = null;
          }
        } catch (e) {
          console.error('Error parsing token payload', e);
          this.username = null;
          this.role = null;
        }
      }
    }
  }



  logout(): void {
    this.authService.logout();         // removes token from localStorage
    this.router.navigate(['/login']);  // redirects to login page
  }


}
