import { Component, OnInit }             from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { RouterModule }                   from '@angular/router';
import { MatButtonModule }                from '@angular/material/button';
import { MatCardModule }                  from '@angular/material/card';
import { MatTableModule }                 from '@angular/material/table';
import { NgChartsModule }                 from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';

import { PosixService, PosixRecord }      from '../../../core/services/posix.service';

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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = localStorage.getItem('auth.username') || 'Usuario';

  // tabla
  data: PosixRecord[] = [];
  columns = ['nombre','meta','progreso','fecha'];

  // KPI & charts
  public kpiText           = '';
  public barChartType      : ChartType                = 'bar';
  public barChartOptions   : ChartConfiguration['options'] = { responsive: true };
  public barChartData      : ChartData<'bar'>         = { labels: [], datasets: [] };
  public pieChartType      : ChartType                = 'pie';
  public pieChartOptions   : ChartConfiguration['options'] = { responsive: true };
  public pieChartData      : ChartData<'pie'>         = { labels: [], datasets: [] };

  constructor(private posix: PosixService) {}

  ngOnInit() {
    this.posix.uploadedData$.subscribe(uploaded => {
      if (uploaded.length) {
        this.initDashboard(uploaded);
      } else {
        this.posix.fetchData().subscribe({
          next: rec => this.initDashboard(rec),
          error: e   => console.error('Error al cargar POSIX:', e)
        });
      }
    });
  }

  private initDashboard(records: PosixRecord[]) {
    this.data = records;

    const cumplidos    = records.filter(h => h.progreso >= h.meta).length;
    const totalHabitos = records.length;
    this.kpiText       = `Has cumplido ${cumplidos} de ${totalHabitos} hábitos hoy`;

    this.barChartData = {
      labels:    records.map(r => r.nombre),
      datasets: [
        { data: records.map(r => r.meta),     label: 'Meta'     },
        { data: records.map(r => r.progreso), label: 'Progreso' }
      ]
    };

    this.pieChartData = {
      labels: ['Cumplidos','No cumplidos'],
      datasets: [
        { data: [cumplidos, totalHabitos - cumplidos] }
      ]
    };
  }

  logout() {
    localStorage.removeItem('auth.loggedIn');
    localStorage.removeItem('auth.username');
    window.location.href = '/login';
  }
}

