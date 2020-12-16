import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(arr: any, property: string) {
    return arr.sort((a, b) => {
      if (a["name"] > b["name"]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
