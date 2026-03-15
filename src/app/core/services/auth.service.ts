// //Mục đích: gọi API login->lưu token->kiểm tra đã login chưa->logout


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environments';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private API_URL = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string) {
//     return this.http.post(`${this.API_URL}/login`, {
//       email,
//       password
//     });
//   }

//   saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }

// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(username: string, password: string): Observable<any> {

    // mock user
    const fakeUser = {
      username: 'admin',
      password: '123456',
      token: 'fake-jwt-token'
    };

    if (username === fakeUser.username && password === fakeUser.password) {
      return of({
        success: true,
        token: fakeUser.token
      });
    }

    return of({
      success: false,
      message: 'Sai tài khoản hoặc mật khẩu'
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}