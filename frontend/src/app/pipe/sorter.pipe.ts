import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any, key: string, sortDirection: number = 1 ): any[] {
    // Korábbi rendező pipe átalakítva.
    // A...Z == sortDirection = 1
    // Z...A == sortDirection = -1

    if (!Array.isArray(value) || !key) return value;
    // if (!['A...Z', 'Z...A'].includes(sortDirection)) return value;
    // if (!sortDirection) sortDirection = 'A...Z';

    // const direction = sortDirection === 'A...Z' ? 1 : -1;

    // if (key === 'category name') key = 'catID';

    // if (key === 'address') {
    //   return [...value].sort((a, b) => {
    //     const dataA = String(a.address.country).toLowerCase();
    //     const dataB = String(b.address.country).toLowerCase();
    //     return direction * dataA.localeCompare(dataB);
    //   });
    // }

    console.log('shorter works');

    return [...value].sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return sortDirection * (a[key] - b[key]);
      }
      const dataA = String(a[key]).toLowerCase();
      const dataB = String(b[key]).toLowerCase();
      return sortDirection * dataA.localeCompare(dataB);
    });
  }
}
