import { Component, OnInit } from '@angular/core';
import { CounterService } from './CounterService.service';
import { UserService } from './UserService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,CounterService]
})
export class AppComponent implements OnInit {

  activeUsers:string[] = [];
  inactiveUsers:string[] = [];

  constructor(private usersService:UserService){}

  ngOnInit(){
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
  }

}
