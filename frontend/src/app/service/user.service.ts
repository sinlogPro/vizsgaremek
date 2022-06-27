import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { BasicService } from './basic-service.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BasicService<User>{

  constructor(
    http: HttpClient,
  ) {
    super(http, 'user');
  }

}
