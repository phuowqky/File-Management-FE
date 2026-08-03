import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environments";

export interface Menu{
    id: number;
    name: string;
    code: string;
    path: string;
    icon: string;
    parentId: number | null;
    orderIndex: number;
    visible: boolean;
    children?: Menu[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private baseUrl = `${environment.apiUrl}/menu`;

    constructor(private http: HttpClient) {}

  getAll(): Observable<Menu[]> {
    return this.http.get<ApiResponse<Menu[]>>(this.baseUrl).pipe(map(r => r.data || []));
  }

  getById(id: number): Observable<Menu> {
    return this.http.get<ApiResponse<Menu>>(`${this.baseUrl}/${id}`).pipe(map(r => r.data));
  }

  getMyMenus(): Observable<Menu[]> {
    return this.http.get<ApiResponse<Menu[]>>(`${this.baseUrl}/my-menus`).pipe(map(r => r.data || []));
  }

  create(menu: { name: string; code: string; path: string; icon: string; parentId?: number | null; orderIndex?: number }): Observable<Menu> {
    return this.http.post<ApiResponse<Menu>>(this.baseUrl, menu).pipe(map(r => r.data));
  }

  update(id: number, menu: { name: string; code: string; path: string; icon: string; parentId?: number | null; orderIndex?: number }): Observable<Menu> {
    return this.http.put<ApiResponse<Menu>>(`${this.baseUrl}/${id}`, menu).pipe(map(r => r.data));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}