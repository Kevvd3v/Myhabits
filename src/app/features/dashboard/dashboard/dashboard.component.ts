import { Component, OnInit }            from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { RouterModule }                  from '@angular/router';
import { MatButtonModule }               from '@angular/material/button';
import { MatCardModule }                 from '@angular/material/card';
import { MatTableModule }                from '@angular/material/table';
import { NgChartsModule }                from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';

import { PosixService, PosixRecord }     from '../../../core/services/posix.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls:   ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = localStorage.getItem('auth.username') || 'Usuario';
  data: PosixRecord[] = [];
  columns = ['nombre', 'producto', 'total_venta'];

  // Datos dummy
  private habits = [
    { nombre: 'leer',      meta: 30, progreso: 5 },
    { nombre: 'meditar',   meta: 20, progreso: 10 },
    { nombre: 'ejercicio', meta: 15, progreso: 1 },
    { nombre: 'aguaDiaria',meta: 8,  progreso: 3 },
  ];
  get cumplidos()    { return this.habits.filter(h => h.progreso >= h.meta).length; }
  get totalHabitos() { return this.habits.length; }

  // KPI
  public kpiText = `Has cumplido ${this.cumplidos} de ${this.totalHabitos} hábitos hoy`;

  // Bar chart
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = { responsive: true };
  public barChartData: ChartData<'bar'> = {
    labels: this.habits.map(h => h.nombre),
    datasets: [
      { data: this.habits.map(h => h.meta),     label: 'Meta' },
      { data: this.habits.map(h => h.progreso), label: 'Progreso' }
    ]
  };

  // Pie chart
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = { responsive: true };
  public pieChartData: ChartData<'pie'> = {
    labels: ['Cumplidos', 'No cumplidos'],
    datasets: [
      { data: [ this.cumplidos, this.totalHabitos - this.cumplidos ], label: 'Estado' }
    ]
  };

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
    window.location.href = '/login';
  }
}

