import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spread'
})

export class SpreadPipe<T extends { [key: string]: any }> implements PipeTransform {

  transform(value: T[] | null): T[] | null {

    if (!Array.isArray(value) || !value.length) return value

    // get keys having object as value from first row of data
    const keys = Object.entries(value[0]).filter(data => typeof data[1] === 'object').map(item => item[0])

    if (!keys.length) return value

    return value.map(row => {
      let obj = { ...row }
      keys.forEach(key => {
        if (!row[key]) {
          return
        }
        const spread = Object.values(row[key]).flat(Infinity).join(', ')
        obj = { ...obj, [key]: spread }
      })

      console.log(obj);

      return obj
    })

  }

}
