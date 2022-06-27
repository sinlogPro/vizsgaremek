import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconModule } from '../../icon/icon.module'
import { FeatherModule } from 'angular-feather';

export interface INgxTableColumn {
  title: string;
  key: string;
  pipes?: any[];
  pipeArgs?: any[];
  // filterKey?: any;
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T extends { [x: string]: any }> implements OnInit {



  @Input() list: T[] = [];

  @Input() tableColumns: INgxTableColumn[] = [];

  @Input() filter: string = '';

  @Output() onEdit: EventEmitter<T> = new EventEmitter;

  @Output() onDelete: EventEmitter<T> = new EventEmitter;

  // @Input() filterKey: string = '';

  pageSize: number = 10;

  startSlice: number = 0;

  endSlice: number = 10;

  page: number = 1;

  lastPage: number = 1;

  filterKey: string = ''

  // filterKey: string | undefined = '';
  phrase: string = '';

  get pageList(): number[] | any[] {
    const pageSize = Math.ceil(this.list.length / this.pageSize);
    // return new Array(pageSize).fill(1).map( (item, index) => index + 1 );

    // let pageArr: number[] = [];
    // if (pageSize > 10) {
    //   [1, 2, 3].map(i => pageArr[i] = i)
    // }
    // [1, 2, 3, 4, 5, ..., 59, 60]
    // let pagerArr = [1, 2, 3, 4, 5, 6, pageSize-1, pageSize]
    // const pagerSample = Array(6).fill(1).map((x, i) => x + i)
    const pagerSample = Array(pageSize).fill(1).map((x, i) => x + i)
    // const pagerSample = Array(28).fill(1).map((x, i) => x + i)

    let pagerArr = pagerSample

    // pagerArr = pagerSample.slice(0,5)
    // if (this.page > 3) {
    //   pagerArr = pagerSample.slice(this.page - 3, this.page+2)
    // }
    // pagerArr.push(0)
    // pagerArr.push(pageSize-1)
    // pagerArr.push(pageSize)

    // if (this.page >= pagerSample.length-2) {
    //   pagerArr = pagerSample.slice(-7);
    //   pagerArr = [0, ...pagerArr];
    // }



    if (pageSize <= 9) {
      return pagerArr;
    }


    pagerArr = pagerSample.slice(0, 7)
    if (pageSize > 9) {
      pagerArr.push(-1);
      pagerArr.push(pageSize);
    }

    if (this.page > 5) {
      pagerArr = pagerSample.slice(this.page - 3, this.page + 2);
      pagerArr = [1, 0, ...pagerArr];
      pagerArr = [...pagerArr, -1, pageSize];
      if (this.page > pageSize - 5) {
        pagerArr = pagerSample.slice(-7)
        pagerArr = [1, 0, ...pagerArr];
      }
    }

    // pagerArr.push(0)
    // pagerArr.push(pageSize-1)
    // pagerArr.push(pageSize)

    // if (this.page >= pagerSample.length-2) {
    //   pagerArr = pagerSample.slice(-7);
    //   pagerArr = [0, ...pagerArr];
    // }

    // //      2, 3, 4, 5, 6, pageSize-1, pageSize]
    // console.log(this.page)
    // if (this.page > 3 ) {
    //   pagerArr= pagerSample.map(i => i + this.page - 3)

    //   // if (this.page > pageSize - 6) {
    //     //   pagerArr= pagerSample.map(i => i + this.page - 3)
    //     //   pagerArr[2] = 0;

    //     // }
    // };

    // if (pageSize > 7) {
    //   pagerArr[5] = 0;
    // }

    // console.log(pageSize);

    // pagerArr.push(pageSize-1)
    // pagerArr.push(pageSize)

    // console.log(this.lastPagerArr)
    // console.log(pagerArr)
    // this.lastPagerArr = pagerArr;

    return pagerArr;
    // return pagerSample;

  }

  columnKey: string = '';
  sortDirection: number = -1;
  sortingMark: string = 'minus'

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDirection = -1 * this.sortDirection;
    this.sortingMark = (this.sortDirection === 1) ? 'arrow-down' : 'arrow-up'

    console.log(key)
    console.log(this.sortingMark)
  }


  constructor() { }

  ngOnInit(): void {
  }

  jumpToPage(pageNum: number): void {

    // console.log(this.lastPage);

    if (pageNum === 0) {
      pageNum = Math.ceil(this.lastPage / 2);
    }

    if (pageNum === -1) {
      pageNum = Math.ceil(((this.list.length / this.pageSize) - this.lastPage) / 2 + this.lastPage);
    }

    this.page = pageNum;
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
    this.lastPage = pageNum;
    // console.log(pageNum)
  }

  raiseEdit(entity: T): void {
    this.onEdit.emit(entity);
  }

  raiseDelete(entity: T): void {
    this.onDelete.emit(entity);
  }

  searchEvent(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}
