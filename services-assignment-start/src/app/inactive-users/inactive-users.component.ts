import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterService } from '../CounterService.service';
import { UserService } from '../UserService.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[];

  constructor(private usersService:UserService, private CounterService:CounterService){this.users=usersService.inactiveUsers;}

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }
}
