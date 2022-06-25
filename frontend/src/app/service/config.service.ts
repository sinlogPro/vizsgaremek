import { Injectable } from '@angular/core';
import { INgxTableColumn } from '../data-table/ngx-data-table/ngx-data-table.component';
import { get } from "lodash";

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  sidebarMenu: IMenuItem[] = [
    {link: '/', title: 'Dashboard', icon: 'home'},
    {link: '/user', title: 'User', icon: 'users'},
    {link: '/customer', title: 'Customers', icon: 'truck'},
    {link: '/product', title: 'Products', icon: 'archive'},
    {link: '/order', title: 'Order', icon: 'edit2'}
    // {link: '/k', title: 'Order', icon: 'edit2'}
  ];

  productTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'name', title: 'Name'},
    {key: 'description', title: 'Desc.'},
    {key: 'price', title: 'Price'},
    {key: 'active', title: 'Active'},
  ];

  userTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'username', title: 'Username'},
    {key: 'first_name', title: 'F.name'},
    {key: 'last_name', title: 'L.Name'},
    {key: 'email', title: 'Email'},
    {key: 'password', title: 'Password'},
    {key: 'role', title: 'Role'},
  ];

  customerTableColumns: INgxTableColumn[] = [
    // {key: '_id', title: '#'},
    {key: 'name',
      title: 'Név',
      // pipes: [ConfigService.textCutter],
      // pipeArgs: [[15]]
    },
    {key: 'email', title: 'email'},
    {key: 'phoneNumber', title: 'Phone number'},
    {key: 'url', title: 'Url'},
    // {key: 'address', title: 'Address'},
    {key: 'address',
      title: 'Cím',
      pipes: [ConfigService.createStrFromObj, ConfigService.textCutter],
      pipeArgs: [['country', 'zipcode', 'city', 'state', 'streetName', 'streetNumber'], [10]]
    },
  ];

  constructor() {}

  static createStrFromObj(obj: any, ...keys: string[]): string | number | boolean | undefined {
    // console.log(obj);
    return keys.map( key => get(obj, key) ).join(' ');
  }

  static curveLongString(
    data: string,
    start: number,
    end: number,
    curve: string = '...'
  ): string {
    return data.slice(start, end) + curve;
  }

  static textCutter(text: string | any, textLong: number): string | null {
    if (!textLong || textLong === 0) return text;
    // if (typeof(text) != 'string') return text;
    if (String(text).length < textLong) return text;

    // return `${String(text).slice(0, textLong).split(' ').slice(0,-1).join(' ')}...`;
    return `${String(text).slice(0, textLong)}...`;
  }






}
