import { Injectable } from "@angular/core";

@Injectable()
export class CounterService{

    counter:number = 0;

    emitCount(){
        console.log("Counter : "+ ++this.counter);
        
    }

}