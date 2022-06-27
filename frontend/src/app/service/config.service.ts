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
    {link: '/', title: 'Nyítólap', icon: 'home'},
    {link: '/user', title: 'Felhasználók', icon: 'users'},
    {link: '/customer', title: 'Ügyfelek', icon: 'truck'},
    {link: '/product', title: 'Termékek', icon: 'archive'},
    {link: '/category', title: 'Termékkategóriák', icon: 'edit2'}
    // {link: '/k', title: 'Order', icon: 'edit2'}
  ];

  userTableColumns: INgxTableColumn[] = [
    // {key: '_id', title: '#'},
    {key: 'username', title: 'Felhasználónév'},
    {key: 'first_name', title: 'Keresztnév'},
    {key: 'last_name', title: 'Vezetéknév'},
    {key: 'email', title: 'Email cím'},
    // {key: 'password', title: 'Jelszó'},
    {key: 'role', title: 'Jogosultsági szint'},
  ];

  customerTableColumns: INgxTableColumn[] = [
    // {key: '_id', title: '#'},
    {key: 'name',
      title: 'Név',
      // pipes: [ConfigService.textCutter],
      // pipeArgs: [[15]]
    },
    {key: 'email', title: 'Email cím'},
    {key: 'phoneNumber', title: 'Telefonyszám'},
    {key: 'url', title: 'Url'},
    // {key: 'address', title: 'Address'},
    {key: 'address',
      title: 'Cím',
      pipes: [ConfigService.createStrFromObj, ConfigService.textCutter],
      pipeArgs: [['country', 'zipcode', 'city', 'state', 'streetName', 'streetNumber'], [20]]
    },
  ];

  productTableColumns: INgxTableColumn[] = [
    // {key: '_id', title: '#'},
    {key: 'name', title: 'Név'},
    {key: 'description', title: 'Leírás'},
    {key: 'price', title: 'Ár'},
    {key: 'active', title: 'Aktív'},
  ];

  categoryTableColumns: INgxTableColumn[] = [
    // {key: '_id', title: '#'},
    {key: 'name', title: 'Név'},
    {key: 'description', title: 'Leírás',
      pipes: [ConfigService.textCutter],
      pipeArgs: [[35]]},
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
