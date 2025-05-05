import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}
  onLogin() {
    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);

        const decodedToken = this.auth.decodeToken();

        if (decodedToken?.isEnable) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/verify-account']);
        }
      },
      error: err => {
        alert("Login failed");
        console.error(err);
      }
    });
  }
}
