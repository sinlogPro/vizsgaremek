import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from 'src/app/service/config.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  tableColumns = this.config.productTableColumns;

  // list$: Observable<Product[]> = this.productService.getAll();
  list$ = this.productService.getAll();

  constructor(
    private config: ConfigService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {}

}
