import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  columns = this.config.userTableColumns;

  list$ = this.userService.getAll();

  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
