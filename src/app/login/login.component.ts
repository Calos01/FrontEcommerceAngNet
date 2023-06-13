import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  message!:string;
  constructor(private fb:FormBuilder,private _navigationService:NavigationService) {}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['', [Validators.required,Validators.email,Validators.maxLength(30)]],
      pwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
    })
  }

  //metodo
  Logearse(){
    this._navigationService.loginUser(this.email.value,this.pwd.value).subscribe((dat:any)=>{
      let msg=dat.toString();
      if(msg!='invalid'){
        this.message='Login Correcto'
      }else{
        this.message='Login incorrecto'
      }
    })
  };

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

 
}
