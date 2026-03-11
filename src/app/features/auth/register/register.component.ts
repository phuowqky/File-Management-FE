import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router){
    console.log("23");

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
     {
    validators: this.passwordMatchValidator,
    // updateOn: 'blur'
  }
    
  )
  }

  ngOnInit(): void{
    
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log('submit', this.registerForm.value);
    }else{
      Object.values(this.registerForm.controls).forEach(control => {
                if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  passwordMatchValidator(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmpassword = group.get('confirmPassword')?.value;

    return password == confirmpassword ? null : {mismatch: true};
  }


}
