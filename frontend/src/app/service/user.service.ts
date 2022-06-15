import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  list: User[] = [
    {
      "first_name": "Charlie",
      "last_name": "Firpo",
      "email": "seyden0@merriam-webster.com",
      "password": "test",
      "role": 3,
      "username": "carly"
    },
    {
      "first_name": "dfe",
      "last_name": "Frpo",
      "email": "seyde@merriam-webster.com",
      "password": "test",
      "role": 3,
      "username": "Killo"
    },
    {
      "first_name": "Charlie",
      "last_name": "Firpo",
      "email": "seyden0@gmail.com",
      "password": "test",
      "role": 1,
      "username": "Gikl"
    }
  ];

  apiUrl = environment.apiUrl;

  constructor() { }

  getAll(): Observable<User[]> {
    const list = [];
    for (let i = 1; i < 100; i++) {
      const item = [...this.list]
      for (let j = 0; j < item.length; j++) {
        item[j]._id = `id-${(Math.random()*10000)}`;
        list.push(item[j]);
      }
    }
    return of(list);
  }
}
