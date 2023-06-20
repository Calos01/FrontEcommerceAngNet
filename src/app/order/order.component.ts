import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { PaymentMethod } from '../models/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  metodopagoname='';
  metodopagoform:FormControl =new FormControl('0')
  paymentMethods:PaymentMethod[]=[];
  constructor(private _serviceNavigation:NavigationService, public serviceUtility:UtilityService) {
  }
  ngOnInit(): void {
    this.metodopagoform.valueChanges.subscribe((res:any)=>{
      if(res=='0'){
        this.metodopagoname=''
      }else{
        this.metodopagoname=res.toString();
      }
    });
    //Lista Payment methods
    this._serviceNavigation.getPaymentMethods(this.serviceUtility.getUser().userId).subscribe((dat:any)=>{
      this.paymentMethods=dat;
    })
  }
}
