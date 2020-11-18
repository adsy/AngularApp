import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
    name:'shortenPipe'
})
export class shortenPipe implements PipeTransform{
    // Trasform method recieves the value that needs to be transformed + args for the value
    transform(value: any, limit: number) {
        if (value.length > limit)
            return value.substr(0,limit) + '....';

        return value;
    }
}