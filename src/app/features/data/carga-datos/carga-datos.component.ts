import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { Router, RouterModule }               from '@angular/router';
import { MatTableModule }                     from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatCardModule }                      from '@angular/material/card';
import { MatButtonModule }                    from '@angular/material/button';
import { MatFormFieldModule }                 from '@angular/material/form-field';
import { MatInputModule }                     from '@angular/material/input';
import { MatIconModule }                      from '@angular/material/icon';
import { MatTableDataSource }                 from '@angular/material/table';
import * as Papa                              from 'papaparse';

import { PosixService, PosixRecord } from '../../../core/services/posix.service';

@Component({
  standalone: true,
  selector: 'app-carga-datos',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<PosixRecord>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private posix:  PosixService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  onFileSelected(event: Event): void {
    const input = (event.target as HTMLInputElement);
    if (!input.files?.length) return;
    const file = input.files[0];

    Papa.parse<any>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        // 1) Homologa campo 'hábito' → 'nombre'
        const cleaned: PosixRecord[] = data.map(r => ({
          nombre:   r['hábito']    ?? r.nombre,
          meta:     +r.meta,
          progreso: +r.progreso,
          fecha:    r.fecha
        }));
        // 2) Fija columnas
        this.displayedColumns = ['nombre','meta','progreso','fecha'];
        // 3) Llena la tabla y guarda en caché
        this.dataSource.data = cleaned;
        this.posix.setUploadedData(cleaned);
      },
      error: err => console.error('Error al parsear CSV:', err)
    });
  }

  saveToPosix(): void {
  const datos = this.dataSource.data as PosixRecord[];
  this.posix.uploadData(datos).subscribe({
    next: () => {
      // 1) refresca cache
      this.posix.setUploadedData(datos);
      // 2) ahora sí navega:
      this.router.navigate(['/dashboard']);
    },
    error: err => {
      console.error('POST /api/habitos falló:', err);
    }
  });
}
}
