import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BasicService } from './basic-service.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BasicService<Product>{

  constructor(
    http: HttpClient
  ) {
    super(http, 'product');
   }

}
