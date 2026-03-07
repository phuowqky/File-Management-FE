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
      password: ['', Validators.required]
    })

  }
  ngOnInit(): void { }

  onSubmit() {
    //B1 lay data tu form
    const { username, password } = this.loginForm.value;

    //B2 Ktra du lieu
    if (username != 'admin' || password != "123456") {
      this.loginForm.setErrors({ invalidLogin: true })
    } else {
      console.log("Login success");
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
