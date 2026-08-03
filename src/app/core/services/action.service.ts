import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

export interface Action {
  id: number;
  code: string;
  name: string;
  allowPaths: string;
  logPaths: string;
  status: number;
  description: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private baseUrl = `${environment.apiUrl}/actions`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Action[]> {
    return this.http.get<ApiResponse<Action[]>>(this.baseUrl).pipe(
      map(res => res.data || [])
    );
  }

  getById(id: number): Observable<Action> {
    return this.http.get<ApiResponse<Action>>(`${this.baseUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  create(action: Partial<Action>): Observable<Action> {
    return this.http.post<ApiResponse<Action>>(this.baseUrl, action).pipe(
      map(res => res.data)
    );
  }

  update(id: number, action: Partial<Action>): Observable<Action> {
    return this.http.put<ApiResponse<Action>>(`${this.baseUrl}/${id}`, action).pipe(
      map(res => res.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  reloadCache(): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/reload`, {});
  }
}
