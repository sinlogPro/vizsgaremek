import { ConfigService, IMenuItem } from './../../service/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar: IMenuItem[] = this.config.sidebarMenu;

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
