import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  // Adding pure: false below causes the pipe to look for changes on the HTML page and refresh,
  // otherwise it wont be dynamic and only works when the element which has the pipe is changed.
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string) {
    if (
      value.length === 0 ||
      filterString === "" ||
      filterString === undefined
    ) {
      return value;
    }
    const resultArray: string[] = [];

    for (const item of value) {
      if (item.status === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
