import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    // Can set the values of user using the snapshot of the params when the component loads.
    this.user = {
      id:this.router.snapshot.params['id'],
      name:this.router.snapshot.params['name']
    }

    // Params is an observable object we can subscribe to to listen for data being emitted.
    this.paramsSubscription = this.router.params.subscribe(
      // 1st argument (function) is executed when data is passed through subscription.
      (params:Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  // This code is important as its important to unsubscribe for our own observables as 
  // its not needed on angular components like the router params
  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
}
