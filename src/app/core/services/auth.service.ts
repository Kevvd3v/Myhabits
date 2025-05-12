import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];

  constructor() {
    const data = localStorage.getItem('auth.users');
    this.users = data ? JSON.parse(data) : [];
  }

  private persistUsers() {
    localStorage.setItem('auth.users', JSON.stringify(this.users));
  }

  register(newUser: User): boolean {
    const exists = this.users.some(u => u.username === newUser.username);
    if (exists) {
      return false;
    }
    this.users.push(newUser);
    this.persistUsers();
    return true;
  }

  login(username: string, password: string): boolean {
    const ok = this.users.some(u => u.username === username && u.password === password);
    if (ok) {
      localStorage.setItem('auth.loggedIn', 'true');
    }
    return ok;
  }

  logout(): void {
    localStorage.removeItem('auth.loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth.loggedIn') === 'true';
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}