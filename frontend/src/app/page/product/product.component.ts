import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from 'src/app/service/config.service';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  tableColumns = this.config.productTableColumns;

  list$ = this.productService.getAll();

  constructor(
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  startEdit(product: Product): void {
    this.router.navigate(['/', 'produkct', 'edit', product._id]);
  }

  startDelete(product: Product): void {
    console.log(product._id);
    if (!confirm('Biztos vagy benne?')) {
      return
    }
    this.productService.delete(product).subscribe(() => {
       this.list$ = this.productService.getAll();
    });
  }

}
