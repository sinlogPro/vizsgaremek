import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { BasicService } from './basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BasicService<Category>{

  constructor(
    http: HttpClient,
  ) {
    super(http, 'category');
   }
}
