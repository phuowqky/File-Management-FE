import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

export interface MenuAction {
  id: number;
  menuId: number;
  actionId: number;
  actionCode: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class MenuActionService {
  private baseUrl = `${environment.apiUrl}/menu-actions`;

  constructor(private http: HttpClient) { }

  // Lấy danh sách các action đã được gán vào 1 menu
  getActionsByMenu(menuId: number): Observable<MenuAction[]> {
    return this.http.get<ApiResponse<MenuAction[]>>(`${this.baseUrl}/by-menu/${menuId}`).pipe(
      map(res => res.data || [])
    );
  }

  // Gán(Thêm) 1 action vào menu
  assignActionToMenu(menuId: number, actionId: number): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}`, { menuId, actionId });
  }

  // Xóa(Thu hồi) 1 action khỏi menu
  removeActionFromMenu(menuId: number, actionId: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}`, {
      body: { menuId, actionId }
    });
  }
}
