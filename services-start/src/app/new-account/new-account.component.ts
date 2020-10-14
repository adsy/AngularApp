import { Component, EventEmitter, Output } from '@angular/core';
import { accountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers is commented out as LoggingService is added to AppModule providers.
  // providers:[LoggingService]
})
export class NewAccountComponent {

  // The constructor injects the Logging Service service created in the app folder. This informs angular we need an instance of this service.
  // Also need to provide a service to the constructor - tell angular how to create it. Add the LoggingService to the providers in the @Component declation above.
  // The constructor can also initialise a subscription to the statusUpdated variable in the accountsService service and listen for when that variable changes
  constructor(
    private accountsService:accountsService){
      this.accountsService.statusUpdated.subscribe((status:string) => alert('New Account Component listening for a new status - New Status: '+status))
    }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.AddAccount(accountName,accountStatus)
    // Can call the service as a local variable and use its functions.
    // this.loggingService.logStatusChange(accountStatus)
  }
}
