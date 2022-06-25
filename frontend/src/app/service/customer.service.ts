import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { BasicService } from './basic-service.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BasicService<Customer>{

  constructor(
    http: HttpClient
  ) {
    super(http, 'customer');
    // this.entityName = 'customer';
  }

}
