import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup

  constructor(private fb:FormBuilder) {}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['', [Validators.required,Validators.email,Validators.maxLength(30)]],
      pwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
    })
  }

  // gets
  get email():FormControl{
    return this.loginForm.get('email') as FormControl
  }
  get pwd():FormControl{
    return this.loginForm.get('pwd') as FormControl
  }
  get rpwd():FormControl{
    return this.loginForm.get('rpwd') as FormControl
  }

  //metodo
  Logearse(){};
}
