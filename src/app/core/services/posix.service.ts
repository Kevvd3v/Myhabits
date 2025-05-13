// src/app/core/services/posix.service.ts
import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PosixRecord {
  nombre:   string;
  meta:     number;
  progreso: number;
  fecha:    string;
}

@Injectable({ providedIn: 'root' })
export class PosixService {
  private apiUrl = 'http://192.168.100.222:5000/api/habitos';

  // caché local
  private _uploaded = new BehaviorSubject<PosixRecord[]>([]);
  public  uploadedData$ = this._uploaded.asObservable();

  constructor(private http: HttpClient) {}

  // GET /api/habitos
  fetchData(): Observable<PosixRecord[]> {
    return this.http.get<PosixRecord[]>(this.apiUrl);
  }

  // POST /api/habitos
  uploadData(data: PosixRecord[]): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.apiUrl, data);
  }

  // actualizar caché
  setUploadedData(data: PosixRecord[]): void {
    this._uploaded.next(data);
  }
}
