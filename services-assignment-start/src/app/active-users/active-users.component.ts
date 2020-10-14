import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CounterService } from '../CounterService.service';
import { UserService } from '../UserService.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  users: string[];

  constructor(private usersService:UserService, private CounterService:CounterService){this.users=usersService.activeUsers;}

  onSetToInactive(id: number) {
    this.usersService.onSetToInactive(id);
  }
}
