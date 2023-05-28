import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  metodopagoname='';
  metodopagoform:FormControl =new FormControl('0')
  
  ngOnInit(): void {
    this.metodopagoform.valueChanges.subscribe((res:any)=>{
      if(res=='0'){
        this.metodopagoname=''
      }else{
        this.metodopagoname=res.toString();
      }
    })
  }

}
