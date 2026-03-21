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

  loginForm!: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    },
      { updateOn: 'blur' }
    )

  }
  ngOnInit(): void {
    const saveUserName = localStorage.getItem('username');
    const savePassword = localStorage.getItem('password');

    if (saveUserName && savePassword) {
      this.loginForm.setValue({
        username: saveUserName,
        password: savePassword,
        remember: false,
      })
    }
  }

  // onSubmit() {
  //   // //B1 lay data tu form
  //   // const { username, password } = this.loginForm.value;

  //   // //B2 Ktra du lieu
  //   // if (username != 'admin' || password != "123456") {
  //   //   this.loginForm.setErrors({ invalidLogin: true })
  //   // } else {
  //   //   console.log("Login success");
  //   // }
  //   if (this.loginForm.valid) {
  //     console.log('submit', this.loginForm.value);

  //     const { username, password, remember } = this.loginForm.value

  //       this.authService.login(username, password)
  //       .subscribe((res: any) => {

  //         //luu token
  //         this.authService.saveToken(res.token);

  //         //check box remember login
  //         if(remember){
  //           localStorage.setItem('username', username);
  //           localStorage.setItem('password', password);
  //         }else{
  //           localStorage.removeItem('username');
  //           localStorage.removeItem('password');
  //         }

  //         //chuyen trang
  //         this.router.navigate(['/home']);

  //       }); 
  //   }else{
  //         Object.values(this.loginForm.controls).forEach(control => {
  //     if (control.invalid) {
  //       control.markAsDirty();
  //       control.updateValueAndValidity({ onlySelf: true });
  //     }
  //   });
  //   }
  // }
  onSubmit() {

    if (this.loginForm.valid) {

      const { username, password, remember } = this.loginForm.value;

      this.authService.login(username, password)
        .subscribe((res: any) => {

          if (res.success) {

            this.authService.setToken(res.token);

            if (remember) {
              localStorage.setItem('username', username);
              localStorage.setItem('password', password);
            }

            this.router.navigate(['/home']);

          } else {
            alert(res.message);
          }

        });

    }

  }

}

// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup

//   constructor(
//     private fb: FormBuilder
//   ) {
//     console.log("23");

//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     })

//   }

//   ngOnInit(): void {
//   }

//   onSubmit() {
//     console.log(this.loginForm.value);
//   }

// }
