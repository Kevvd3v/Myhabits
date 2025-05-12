import { Injectable } from '@angular/core';
import {
  CanActivate, Router, 
  UrlTree
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const ok = localStorage.getItem('auth.loggedIn') === 'true';
    if (!ok) {
      return this.router.parseUrl('/login');
    }
    return true;
  }
}