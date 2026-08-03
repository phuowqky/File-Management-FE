
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environments';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    username: string;
    roles: string[];
    actionCodes: string[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  //Cho các component khác được đọc (listen) trạng thái đăng nhập nhưng không được sửa
  public isLoggedIn$ = this.isLoggedInSubject

  constructor(private http: HttpClient) { }

  login(username: string, password: string, remember: boolean): Observable<any> {

    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem("auth_username", res.data.username);
          localStorage.setItem('auth_roles', JSON.stringify(res.data.roles || []));
          localStorage.setItem('auth_action_code', JSON.stringify(res.data.actionCodes));
          if (remember) {
            localStorage.setItem('rememberme', 'true');
          } else {
            localStorage.removeItem('rememberme');
          }
          this.isLoggedInSubject.next(true);
        }
      }),
      map(() => true)
    )
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

    private clearLocalStorage(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_roles');
    localStorage.removeItem('auth_action_codes');
    localStorage.removeItem('rememberme');
    this.isLoggedInSubject.next(false);
  }


   logout(): Observable<any>{
        const token = localStorage.getItem('auth_token');
    // Gọi API blacklist token trước, sau đó dọn localStorage
    if (token) {
      return this.http.post(`${environment.apiUrl}/auth/logout`, {}).pipe(
        catchError(() => of(null)), // Nếu API lỗi vẫn logout local
        finalize(() => this.clearLocalStorage())
      );
    }
    this.clearLocalStorage();

    return of(null)
   }

}