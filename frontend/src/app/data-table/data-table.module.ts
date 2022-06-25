import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';

import { IconModule } from '../icon/icon.module';

import { SorterPipe } from '../pipe/sorter.pipe';
import { FilterPipe } from '../pipe/filter.pipe';
import { XpipePipe } from './pipes/xpipe.pipe';


@NgModule({
  declarations: [
    NgxDataTableComponent,
    SorterPipe,
    FilterPipe,
    XpipePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
  ],
  exports: [
    NgxDataTableComponent,
  ],
})
export class DataTableModule { }
