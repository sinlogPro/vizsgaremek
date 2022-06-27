import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

import { NgxDataTableComponent } from './data-table/ngx-data-table/ngx-data-table.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { IconModule } from './icon/icon.module';
import { DataTableModule } from './data-table/data-table.module';
import { UserComponent } from './page/user/user.component';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptor } from './service/jwt.interceptor';
import { AuthService } from './service/auth.service';
import { CustomerComponent } from './page/customer/customer.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';
import { SpreadPipe } from './pipe/spread.pipe';
import { CategoryComponent } from './page/category/category.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ProductComponent,
    OrderComponent,
    UserComponent,
    LoginComponent,
    CustomerComponent,
    CustomerEditComponent,
    SpreadPipe,
    CategoryComponent,
    CategoryEditComponent,
    UserEditComponent,
    ProductEditComponent,
    // FilterPipe,
    // SorterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconModule,
    DataTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [
        AuthService,
      ],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
