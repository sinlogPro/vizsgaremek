import { Pipe, PipeTransform, ViewChild } from '@angular/core';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(list: any[], pageIndex: number, pageSize: number): any[] {
    if ( !Array.isArray( list ) ){
      return list;
    }

    return list= list.slice((pageIndex*pageSize),((pageIndex*pageSize)+pageSize));

  }

}
