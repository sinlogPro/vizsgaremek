import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T extends { [x: string]: any }> implements PipeTransform {

  transform(
    value: T[] | null,
    key: string = '',
    phrase: string): T[] | null {

    // console.log((key));

    if (!Array.isArray(value) || !key || !phrase) {
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    if (!key) {
      console.log('ok');
      return value.filter(row => {
        const copy = { ...row }
        // Object.keys(copy).forEach(key => {
        //   if (!visibleKeys.includes(key)) {
        //     delete copy[key]
        //   }
        // })
        console.log(copy)
        const data =  Object.values(copy).map(data => typeof data !== 'object' ? data : Object.values(data))
           .flat(Infinity).join(' ')
        console.log(data);
        return data;
        // return Object.values(copy).map(data => typeof data !== 'object' ? data : Object.values(data))
        //   .flat(Infinity).join(' ').toLowerCase().includes(phrase)
      })
    }


    return value.filter(row =>
      typeof row[key] !== 'object' ?
        String(row[key]).toLowerCase().includes(phrase) :
        Object.values(row[key]).flat(Infinity).join(' ').toLocaleLowerCase().includes(phrase)
    )
    // return value.filter(item => {
    //   if (typeof item[key] === 'number' && typeof phrase === 'number') {
    //     return item[key] === phrase;
    //   }

    //   return ('' + item[key]).toLowerCase().includes(phrase as string);
    // })

  }

}
