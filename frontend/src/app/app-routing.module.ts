import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { UserComponent } from './page/user/user.component';
import { LoginComponent } from './page/login/login.component';
import { CustomerComponent } from './page/customer/customer.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';

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
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent,
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
