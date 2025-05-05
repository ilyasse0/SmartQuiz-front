import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route, Router} from '@angular/router';
import {environment} from '../../../environments';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    ///codeApoge: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ///departement: { id: 0 },
    ///filiere: { id: 0 }
  };



  constructor(private http : HttpClient , private router : Router , private authService : AuthService) {}
  ngOnInit() {}

  onRegister() {
    // Check if passwords match
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Prepare the user object
    const registrationData = {
      username: this.user.username,
     // codeApoge: this.user.codeApoge,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
      //departement: { "id": 1 },
     // filiere: { "id": 1 }
    };
    this.http.post(`${environment.apiUrl}/auth/register`, registrationData)
      .subscribe({
        next: (response) => {
          alert('Registration successful!');
          //this.router.navigate(['/login']);
          // this.authService.register(registrationData).subscribe(
          //   {
          //     next: (response) => this.router.navigate(['/verify-account']),
          //     error : err => console.log(err),
          //   }
          //)
        },
        error: (err) => {
          alert('Registration failed. Please try again.');
          console.error(err);
        }
      });
  }

  }
