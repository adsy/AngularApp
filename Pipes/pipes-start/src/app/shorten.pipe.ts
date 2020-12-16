import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, n: number) {
    if (value.length > n) return value.substr(0, n) + " ...";

    return value;
  }
}
