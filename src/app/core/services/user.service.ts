import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { PageResult } from "../models/page-result.model";

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
  age: number;
  enabled: boolean;
  tenDonVi: string | null;
  donViId: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  searchPaged(keyword: string, page: number, size: number): Observable<PageResult<User>> {
    const params = new HttpParams()
      .set('keyword', keyword || '')
      .set('page', (page - 1).toString())  // backend 0-based, frontend 1-based
      .set('size', size.toString());
    return this.http.get<ApiResponse<PageResult<User>>>(`${this.baseUrl}/search-paged`, { params })
      .pipe(map(r => r.data));
  }

  create(user: Partial<User> & { password?: string }): Observable<User> {
    return this.http.post<ApiResponse<User>>(this.baseUrl, user)
      .pipe(map(r => r.data));
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/${id}`, user)
      .pipe(map(r => r.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`)
      .pipe(map(res => res.data));
  }
    getAll(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(this.baseUrl).pipe(map(r => r.data || []));
  }

  getUsers(page: number, size: number): Observable<PageResult<User>> {

    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());

    return this.http
      .get<ApiResponse<PageResult<User>>>(this.baseUrl, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getUserRoles(id:number){
  return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/users/${id}/roles`
  );
}

  /**
   * ★ Lấy danh sách user theo đơn vị tổ chức
   */
  getNguoiXuLy(roleId: number): Observable<any[]> {
  return this.http
    .get<any>(`${environment.apiUrl}/users/nguoi-xu-ly?roleId=${roleId}`)
    .pipe(map(res => res.data || []));
}
}