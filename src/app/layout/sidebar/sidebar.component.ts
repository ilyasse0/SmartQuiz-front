import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit{
  username: string | null = null;
  role: string | null = null;

  ngOnInit(): void {
    this.loadUserFromToken();
  }
  constructor() {
  }


  loadUserFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // JWT format: header.payload.signature
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const payloadJson = atob(payloadBase64);
        try {
          const payload = JSON.parse(payloadJson);
          this.username = payload.sub || payload.username || null; // adjust key as per your token
          // For role, check your token structure
          if (payload.role) {
            this.role = payload.role;
          } else if (payload.authorities && Array.isArray(payload.authorities)) {
            this.role = payload.authorities[0]; // or join multiple roles
          } else {
            this.role = null;
          }
        } catch (e) {
          console.error('Failed to parse JWT payload', e);
          this.username = null;
          this.role = null;
        }
      }
    }
  }
}
