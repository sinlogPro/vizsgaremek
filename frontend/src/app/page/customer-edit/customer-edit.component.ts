import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, Observer, of, switchMap, tap } from 'rxjs';

import { isBs3 } from 'ngx-bootstrap/utils';

import { Customer } from 'src/app/model/customer';
import { Address } from 'src/app/model/address';
import { CustomerService } from 'src/app/service/customer.service';
import { AddressService } from 'src/app/service/address.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  isBs3 = isBs3();

  search?: string;

  selectedAddress: Address | null = null;


  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.getOne(params['id'])),
  );

  addresses$ = this.addressService.getAll();


  suggestions$: Observable<Address[]> = of([]);

  customerAddress: any = '';  // ide megy a customer.address belső objektuma

  constructor(
    public _router: Router, public _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private addressService: AddressService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.search || '');
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          // console.log(query);
          return this.addressService.search(`country=${query}`).pipe(
            map((data: Address[]) => Array.isArray(data) ? data : [])
          );
        }

        return of([]);
      }),
    );

    // this.addressService.search('country=China').subscribe(
    //   res => console.log(res),
    // );

    // this.customer$.subscribe(  x => console.log(x) );
    this.customer$.subscribe( customer => this.customerAddress = customer.address );

    // setTimeout(() => {

    //   console.log(this.customerAddress);
    // }, 1000);




  }

  // getActiveProductNumber(product$: Observable<Product[]>): any {
  //   return product$.pipe(
  //     switchMap((list: Product[]) => list),
  //     filter((product: Product) => product.active === true),
  //     toArray(),
  //     map(activeProductArray => activeProductArray.length),
  //   )
  // }




//----------------

  changeName(ev: Event): void {
    console.log(this.suggestions$);
    this.search = ev as unknown as string;
  }

  selectAddress(ev: {item: Address}): void {
    this.selectedAddress = ev.item;
  }



  onUpdate(ngForm: NgForm): void {
    // this.service.update(ngForm.value).subscribe(
    //   car => this.router.navigate(['/', 'services']),
    //   err => console.error(err)
    // );

    const updatedAddress = new Address();
    // delete newAddress._id;

    const updatedCustomer = new Customer();
    // delete newCustomer._id
    // delete newCustomer.address;

    const formData = {...ngForm.value};
    console.log(formData);

    Object.keys(updatedAddress)
      .filter(key => key !== '_id')
      .map(key => updatedAddress[key] = formData[key]);

    Object.keys(updatedCustomer)
      .filter(key => key !== '_id')
      .map(key => updatedCustomer[key] = formData[key]);


    // const addressKeys = Object.keys(updatedAddress).filter(key => key !== '_id');
    // const customerKeys = Object.keys(updatedCustomer).filter(key => key !== '_id');

    // addressKeys.map(key => updatedAddress[key] = formData[key]);
    // customerKeys.map(key => updatedCustomer[key] = formData[key]);

    updatedCustomer.address = this.customerAddress._id;
    updatedCustomer._id = formData._id;

    updatedAddress._id = this.customerAddress._id;

    // console.log('customer:', updatedCustomer);

    this.customerService.update(updatedCustomer).subscribe({
      next: updatedCustomer => console.log(updatedCustomer),
      error: err => console.error(err),
    });

    this.addressService.update(updatedAddress).subscribe({
      next: updatedAddress => console.log(updatedAddress),
      error: err => console.error(err),
    });

    // console.log(addressKeys);
    // console.log(updatedAddress);


    // newAddress.city = ngForm.value.city
    // console.log(ngForm.value.city);
  }




  onRefresh(): void {
		this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
		console.log(decodeURI(this._location.path()));
		this._router.navigate([decodeURI(this._location.path())]);
		});
	}

  goBack(): void {
    this.location.back();
  }

  click(): void {
    console.log('click')
  }


}
