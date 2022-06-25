import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../model/address';
import { BasicService } from './basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BasicService<Address>{

  constructor(
    http: HttpClient,
  ) {
    super(http, 'address');
  }
}
