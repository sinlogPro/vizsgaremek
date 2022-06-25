export class Address {
  [key: string]: any;
  _id?: string | number = 0;
  city: string = '';
  country: string = '';
  zipcode: number = 0;
  state: string | null = null;
  streetName: string = '';
  streetNumber: string | number = 0;

  constructor(options?: Address) {
    if (!options) return;
    for (const key of Object.keys(options)) {
      this[key] = options[key];
    }
  }

  get full(): string {
    return [
      this.zipcode,
      this.country,
      this.city,
      this.streetName,
      this.streetNumber,
    ].join(', ')
  }




}


