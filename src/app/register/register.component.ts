import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { User } from '../models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup
  validrpwd:boolean=false;
  resp:string='';
  constructor(private fb:FormBuilder,private _navigationService:NavigationService) {}
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:['', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]],
      lastname:['', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]],
      email:['', [Validators.required,Validators.email,Validators.maxLength(30)]],
      address:['', [Validators.required,Validators.maxLength(30)]],
      mobile:['', [Validators.required,Validators.maxLength(30)]],
      pwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      rpwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
    })
    
  }
  //metodo
  Registrar(){
    let user: User={
      userId: 0,
      firstName: this.name.value,
      lastName: this.lastname.value,
      email: this.email.value,
      address: this.direccion.value,
      mobile: this.mobile.value,
      password: this.pwd.value,
      createdAt: '',
      modifiedAt: ''
    }
    this._navigationService.registerUser(user).subscribe((dat:any)=>{
      this.resp=dat.toString();
    })
  }
  // gets
  get name():FormControl{
    return this.registerForm.get('name') as FormControl
  }
  get lastname():FormControl{
    return this.registerForm.get('lastname') as FormControl
  }
  get email():FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get direccion():FormControl{
    return this.registerForm.get('address') as FormControl
  }
  get mobile():FormControl{
    return this.registerForm.get('mobile') as FormControl
  }
  get pwd():FormControl{
    return this.registerForm.get('pwd') as FormControl
  }
  get rpwd():FormControl{
    return this.registerForm.get('rpwd') as FormControl
  }

  
}
