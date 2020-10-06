import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  // using property binding we can pass this value into a element attribute
  disallowNewServer: boolean = true;
  disallowRemove: boolean = true;
  serverCreationStatus = 'No server was created';
  serverCreated = false;
  serverName: string = '';
  username: string = '';
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    // Function turns the 'disbaled' element of the button to 'false' after 2 seconds
    setTimeout(() => {
      this.disallowNewServer = false;
    }, 2000);
  }

  ngOnInit(): void {}

  // can bind this function to the click event on the button on the template
  // (click) = "onCreateServer()" - placed on html element
  onCreateServer() {
    this.serverCreationStatus = `Server was created! Server name is ${this.serverName}`;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  checkValidName() {
    if (this.username) return false;
    else return true;
  }

  removeName() {
    this.username = '';
  }

  onCreateName() {
    this.username = (<HTMLInputElement>event.target).value;
  }
}
