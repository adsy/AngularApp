import { Component } from '@angular/core';

// Component declarator - must import first. Must pass JS object to configure it. Can setup important info
// that will be stored as metadata for the class in background which will tell Angular what to do with this class.
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})

// Angular components are classes
export class ServerComponent {
  server: string = 'server1234';
  // string interpolation has to resolve to a string in the end - number is converted to string
  serverID: number = 1234;
  serverStatus: string = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }

  //can also pass in functions declared here into the html template which resolve in strings
  getServerStatus() {
    return this.serverStatus;
  }

  // function is passed into the ngStyle directive on the <p> and sets the background
  // colour based on the value of 'serverStatus'
  getColor() {
    if (this.serverStatus === 'Online') {
      return 'green';
    } else return 'red';
  }
}
