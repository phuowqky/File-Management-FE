import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private fb: FormBuilder) {
    console.log("23");

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

  onSubmit() {
    // //B1 lay data tu form
    // const { username, password } = this.loginForm.value;

    // //B2 Ktra du lieu
    // if (username != 'admin' || password != "123456") {
    //   this.loginForm.setErrors({ invalidLogin: true })
    // } else {
    //   console.log("Login success");
    // }
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);

      const { username, password, remember } = this.loginForm.value

      if(remember){
          localStorage.setItem('username', username),
          localStorage.setItem('password', password)
      }
      else{
                localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

    } else {

      console.log(Object.values(this.loginForm.controls))

      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
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
