import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  error = '';
  showPassword = ";"

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    })

  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    if (localStorage.getItem('rememberme') === 'true') {
      this.loginForm.patchValue({ remember: true })
    }
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    const { username, password, remember } = this.loginForm.value;

    this.authService.login(username, password, remember).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error?.message || err.message || 'Sai tên đăng nhập hoặc mật khẩu.';
        this.loading = false;
      }
    });
  }


}