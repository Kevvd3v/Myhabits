import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('auth.loggedIn') === 'true';
    if (loggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
