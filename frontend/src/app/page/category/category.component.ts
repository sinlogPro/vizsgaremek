import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  tableColumns = this.config.categoryTableColumns;

  list$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  startEdit(category: Category): void {
    this.router.navigate(['/', 'category', 'edit', category._id]);
  }

  startDelete(category: Category): void {
    console.log(category._id);
    if (!confirm('Biztos vagy benne?')) {
      return
    }
    this.categoryService.delete(category).subscribe(() => {
       this.list$ = this.categoryService.getAll();
    });
  }

}
