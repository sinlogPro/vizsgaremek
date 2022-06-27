import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableColumns = this.config.userTableColumns;

  list$ = this.userService.getAll();

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  startEdit(user: User): void {
    this.router.navigate(['/', 'user', 'edit', user._id]);
  }

  startDelete(user: User): void {
    console.log(user._id);
    if (!confirm('Biztos vagy benne?')) {
      return
    }
    this.userService.delete(user).subscribe(() => {
       this.list$ = this.userService.getAll();
    });
  }


}
