import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.servce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated:boolean = false
  private activatedSub:Subscription;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe((val) => {
      this.activated=val;
    })
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
    this.activated=false;
  }
}
