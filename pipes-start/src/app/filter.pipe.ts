import { Pipe, PipeTransform } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,propName:string,  filterString:string): any {
    console.log(value);
    if (value.length === 0){
      return value
    }

    let resultArray =[]
    for (const item of value){
      console.log(propName)
      if (item[propName]===filterString)
        resultArray.push(item);
    }
    console.log(resultArray)
    return resultArray
  }

}
