import { Component, Input } from '@angular/core';
import { accountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers is commented out as LoggingService is added to AppModule providers.
  // providers:[LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  // The constructor injects the Logging Service service created in the app folder. This informs angular we need an instance of this service.
  // Also need to provide a service to the constructor - tell angular how to create it. Add the LoggingService to the providers in the @Component declation above.
  constructor(private accountsService:accountsService){    }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id,status)
    // Can call the service as a local variable and use its functions.
    // this.loggingService.logStatusChange(status)
    this.accountsService.statusUpdated.emit(status)
  }
}
