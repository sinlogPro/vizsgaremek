import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { UserComponent } from './page/user/user.component';
import { LoginComponent } from './page/login/login.component';
import { CustomerComponent } from './page/customer/customer.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';
import { CategoryComponent } from './page/category/category.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'category/edit/:id',
    component: CategoryEditComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
