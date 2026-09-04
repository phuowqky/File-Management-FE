import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PageResult } from '../models/page-result.model';

export interface DonVi {
  id: number;
  maDonVi: string;
  tenDonVi: string;
  capDonVi: number;
  donViChaId: number | null;
  moTa: string;
  active: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DonViService {

  private baseUrl = `${environment.apiUrl}/don-vi`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

    searchPaged(keyword: string, parentId: number | null, page: number, size: number): Observable<PageResult<DonVi>> {
    let params = new HttpParams()
      .set('keyword', keyword || '')
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    if (parentId !== null) {
      params = params.set('parentId', parentId.toString());
    }
    return this.http.get<ApiResponse<PageResult<DonVi>>>(`${this.baseUrl}/search-paged`, { params })
      .pipe(map(r => r.data));
  }
}