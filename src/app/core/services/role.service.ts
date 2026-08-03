// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { ApiResponse } from "./user.service";
// import { environment } from "src/environments/environments";

// @Injectable({
//   providedIn:'root'
// })
// export class RoleService{
//     private baseUrl = `${environment.apiUrl}/roles`;

//   constructor(private http:HttpClient){}

//   getAll(){
//       return this.http.get<any>(this.baseUrl);
//   }

// }

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Role } from "../models/role.model";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(this.baseUrl);
  }

  create(role: Role): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>(this.baseUrl, role);
  }

  update(id: number, role: Role): Observable<ApiResponse<Role>> {
    return this.http.put<ApiResponse<Role>>(`${this.baseUrl}/${id}`, role);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  getById(id: number) {
  return this.http.get<ApiResponse<Role>>(
    `${environment.apiUrl}/roles/${id}`
  );
}


}