import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { AddressService } from 'src/app/service/address.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  tableColumns = this.config.customerTableColumns;

  list$ = this.customerService.getAll();

  addresses$ = this.addressService.getAll();

  constructor(
    private config: ConfigService,
    private customerService: CustomerService,
    private addressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //this.list$.subscribe(data => console.log(data[0]))
  }

  startEdit(customer: Customer): void {
    this.router.navigate(['/', 'customer', 'edit', customer._id]);
  }

  startDelete(customer: Customer): void {
    console.log(customer._id);
    if (!confirm('Biztos vagy benne?')) {
      return
    }
    this.customerService.delete(customer).subscribe(() => {
       this.list$ = this.customerService.getAll();
    });
  }

}
