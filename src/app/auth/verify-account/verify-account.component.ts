import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-verify-account',
  standalone: false,
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent {

  submitted : boolean = false;
  isOkay : boolean = false;
  message : string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onCodeCompleted(code: string) {
    this.submitted = true;

    this.authService.verifyAccountToken(code).subscribe({
      next: (res) => {
        this.isOkay = true;
        this.message = typeof res === 'string' ? res :
          res?.message ||
          'Account activated successfully!';      },
      error: (err) => {
        this.isOkay = false;
        this.message = typeof err.error === 'string' ? err.error :
          err.error?.message ||
          err.message ||
          'Activation failed. Please try again.';
      }
    });
  }

  // Redirect to login after success
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
