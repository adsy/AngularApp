import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs'
import {filter, map} from "rxjs/operators"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private interval1: Subscription;
  constructor() { }

  ngOnInit() {
    // this.interval1 = interval(1000).subscribe((count)=>{
    //   console.log(count);
    // })

    // Custom Observable
    const customIntervalObservable =  new Observable(
      observer => {
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          if (count === 2)
            observer.complete()
          if (count > 3 ){
            observer.error(new Error("Count is greater than 3"))
          }
          count++
        },1000)
    })

    // pipe method is built into rxjs - import operators from rxjs/operators
    // pipe can be used to manipulate data before it goes into subscription. Use it to grab data from web server and change it before passing it along.
  
    this.interval1 = customIntervalObservable.pipe(
      filter((data:number) => {
        return data > 0;
    }), 
      map((data:number) => {
        return 'Round ' + (data+1);
    }))
    .subscribe(
        data => console.log(data), 
        error => {
          console.log(error)
          alert(error.message)
        }, 
        () => {
          console.log("Observable completed")
        } 
      );
  }
  
  // When we leave the component we need to call unsubscribe on our observable. Need to do this on observables we create ourselves - not needed for subscriptions that are provided by angular.
  ngOnDestroy(){
    this.interval1.unsubscribe();
  }

}
