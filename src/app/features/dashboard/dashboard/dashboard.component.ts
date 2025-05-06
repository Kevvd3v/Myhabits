import { Component, OnInit } from '@angular/core';
import { RouterModule }    from '@angular/router';
import { CommonModule }    from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule }   from '@angular/material/card';
import { MatTableModule }  from '@angular/material/table';

import { PosixService, PosixRecord } from '../../../core/services/posix.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  template: `
    <div class="dashboard">
      <h1>¡Bienvenido, {{ username }}!</h1>
      <p>Este será tu panel principal.</p>

      <mat-card class="data-card">
        <h2>Mis hábitos</h2>
        <table mat-table [dataSource]="data" class="mat-elevation-z2">

          <!-- Nombre del hábito -->
          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef> Hábito </th>
            <td mat-cell       *matCellDef="let r"> {{ r.nombre }} </td>
          </ng-container>

          <!-- Producto (ej. meta asociada) -->
          <ng-container matColumnDef="producto">
            <th mat-header-cell *matHeaderCellDef> Meta </th>
            <td mat-cell       *matCellDef="let r"> {{ r.producto }} </td>
          </ng-container>

          <!-- Total venta (reutilizado para mostrar progreso numérico) -->
          <ng-container matColumnDef="total_venta">
            <th mat-header-cell *matHeaderCellDef> Progreso </th>
            <td mat-cell       *matCellDef="let r"> {{ r.total_venta }}% </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row        *matRowDef="let row; columns: columns;"></tr>
        </table>
      </mat-card>
      <button mat-raised-button color="primary" routerLink="/carga-datos">
      Importar datos POSIX
      </button>


      <button mat-stroked-button color="accent" (click)="logout()" class="logout-btn">
        Cerrar sesión
      </button>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    .data-card {
      width: 100%;
      max-width: 600px;
      margin: 1.5rem 0;
    }

    table {
      width: 100%;
    }

    .logout-btn {
      margin-top: 1.5rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  username = localStorage.getItem('auth.username') || 'Usuario';
  data: PosixRecord[] = [];
  columns: string[] = ['nombre', 'producto', 'total_venta'];

  constructor(private posix: PosixService) {}

  ngOnInit() {
    this.posix.fetchData().subscribe({
      next: records => this.data = records,
      error:    err     => console.error('Error al cargar POSIX:', err)
    });
  }

  logout() {
    localStorage.removeItem('auth.loggedIn');
    localStorage.removeItem('auth.username');
    // redirige de forma segura
    window.location.href = '/login';
  }
}

