import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn, GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './services/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export  class AuthGuard implements CanActivate {
  constructor(private authService: AuthService , private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }

}
