import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup
  validrpwd:boolean=false;

  constructor(private fb:FormBuilder) {}
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:['', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]],
      lastname:['', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z].*')]],
      email:['', [Validators.required,Validators.email,Validators.maxLength(30)]],
      pwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      rpwd:['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
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
  get pwd():FormControl{
    return this.registerForm.get('pwd') as FormControl
  }
  get rpwd():FormControl{
    return this.registerForm.get('rpwd') as FormControl
  }

  //metodo
  Registrar(){};
}
