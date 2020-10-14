import { EventEmitter, Injectable } from "@angular/core";
import { CounterService } from "./CounterService.service";

@Injectable()

export class UserService {

    constructor(private counterService:CounterService){
    }

    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];
  
    onSetToInactive(id: number) {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
      this.counterService.emitCount();
    }
  
    onSetToActive(id: number) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      this.counterService.emitCount();
    }

    setActive = new EventEmitter<number>();
    setInactive = new EventEmitter<number>();
}