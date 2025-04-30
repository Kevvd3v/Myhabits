import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';

export interface PosixRecord {
  nombre: string;
  producto: string;
  total_venta: number;
}

@Injectable({ providedIn: 'root' })
export class PosixService {
  private apiUrl = 'http://localhost:5000/api/data';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<PosixRecord[]> {
    return this.http.get<PosixRecord[]>(this.apiUrl);
  }
}
