import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { MatTableModule }              from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule }      from '@angular/material/sort';
import { MatCardModule }               from '@angular/material/card';
import { MatButtonModule }             from '@angular/material/button';
import { MatFormFieldModule }          from '@angular/material/form-field';
import { MatInputModule }              from '@angular/material/input';
import { MatIconModule }               from '@angular/material/icon';

import { MatTableDataSource }          from '@angular/material/table';
import * as Papa                       from 'papaparse';

export interface PosixRecord { [key: string]: any; }

@Component({
  standalone: true,
  selector: 'app-carga-datos',
  imports: [
    CommonModule,
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    Papa.parse<PosixRecord>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // 1) determinar columnas
        if (results.data.length) {
          this.displayedColumns = Object.keys(results.data[0]);
        }
        // 2) volcar datos
        this.dataSource.data = results.data;
      },
      error: (err) => console.error('Error al parsear:', err)
    });
  }
}
