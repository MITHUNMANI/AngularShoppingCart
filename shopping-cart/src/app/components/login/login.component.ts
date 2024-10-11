import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router){
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password:['admin@123',Validators.required]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      localStorage.setItem('isLoggedIn','true');
      this.router.navigate(['/admin'])
    }
  }

}
