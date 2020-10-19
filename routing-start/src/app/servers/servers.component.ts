import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  // Must inject the router object in the constructor and the activatedRoute into the constructor for the component
  constructor(private serversService: ServersService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // Uses the router programatically - goes to the server page relative to this pages URL - this will break the app
    // as it will go to /servers/servers
    // this.router.navigate(['servers'],{relativeTo:this.activatedRoute})
  }
}
