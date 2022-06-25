import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlicer'
})
export class TextSlicerPipe implements PipeTransform {

  transform(value: string = '', long:number = 150): unknown {
    return (value.length>long) ?  `${value.slice(0,long)}...`: value;
  }
}
