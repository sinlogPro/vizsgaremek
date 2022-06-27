import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => this.userService.getOne(params['id']))
  );

  constructor (
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onUpdate(ngForm: NgForm): void {
    console.log('update');

    this.userService.update(ngForm.value).subscribe({
      next: user => this.router.navigate(['/', 'user']),
      error: err => console.error(err)

    });

  }

}

