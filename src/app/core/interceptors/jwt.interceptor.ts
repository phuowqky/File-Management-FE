import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

      // Flag tránh redirect nhiều lần cùng lúc khi nhiều request 401 đồng thời
  private isRedirecting = false;

  constructor(private router: Router, private message: NzMessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('auth_token');

        // Bỏ qua req đến OpenClaw API proxy - nó có Athorization header riêng
        const isOpenClawReq = req.url.includes('/openclaw-api/');
            if(token && !isOpenClawReq ) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
          // Bỏ qua request login và openclaw — không cần redirect
          const isSkipped = req.url.includes('/api/auth/login') || isOpenClawReq;

          // Chỉ redirect 1 lần duy nhất, tránh nhiều request 401 cùng trigger
          if (!isSkipped && !this.isRedirecting) {
            this.isRedirecting = true;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('rememberme');
            this.router.navigate(['/login']).then(() => {
              setTimeout(() => { this.isRedirecting = false; }, 2000);
            });
          }
        }

                // Bị chặn vì không có Quyền truy cập
        if (error.status === 403) {
          const errMsg = error.error?.message || 'Bạn không thể truy cập tài nguyên này!';
          this.message.error(errMsg);
        }

        return throwError(() => error);

            })
        );
    }
    
}