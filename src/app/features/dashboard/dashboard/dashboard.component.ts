import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="dashboard">
      <h1>¡Bienvenido, {{ username }}!</h1>
      <p>Este será tu panel principal.</p>
      <button mat-stroked-button color="accent" (click)="logout()">
        Cerrar sesión
      </button>
    </div>
  `,
  styles: [`
    .dashboard {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      height:100vh;
    }
  `]
})
export class DashboardComponent {
  username = localStorage.getItem('auth.username') || 'Usuario';

  logout() {
    localStorage.removeItem('auth.loggedIn');
    localStorage.removeItem('auth.username');
    window.location.href = '/login';
  }
}
