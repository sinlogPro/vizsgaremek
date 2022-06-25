import { Address } from "./address";

export class Customer {
  [key: string]: any;
  _id?: number | string = '';
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  url?: string = '';
  // address?: string | Address = new Address();
  address?: string | Address = new Address();

  constructor(options?: Customer) {
    if (!options) return;
    for (const key of Object.keys(options)) {
      this[key] = options[key];
    }
  }


}

/*
"name": "Heller Inc",
        "email": "bbrabbins1@sfgate.com",
        "phoneNumber": "+63 (996) 435-5334",
        "url": "https://ocn.ne.jp",
        "address": {
                "country": "Uzbekistan",
                "zipcode": 9423,
                "state": null,
                "streetName": "Loftsgordon",
                "streetNumber": "5749"
        }
*/
