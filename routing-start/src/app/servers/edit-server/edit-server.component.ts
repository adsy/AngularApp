import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit=false;
  changesSaved=false;
  clickedId;

  constructor(private serversService: ServersService, 
    private route:ActivatedRoute, 
    private router:Router) { }

  canDeactive():boolean | Observable<boolean> | Promise<boolean>{
    if (!this.allowEdit){
      return true;
    }
    

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    // Can show how you can get queryParams or fragment code - wont be reactive code however reacting to URL changing for the same page.
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // Other option is to subscribe to queryParams or fragments as they are observables which can be subscribed to.
    console.log(this.route.snapshot.routeConfig.path)
    this.route.params.subscribe(
      (params)=> {
        this.clickedId = +params["id"];
        console.log(this.clickedId)
      }
    )
    this.route.queryParams.subscribe(
      (params) => {
        this.allowEdit=params["allowEdit"] === '1' ? true:false;
      }
    );
    this.route.fragment.subscribe(
      (fragment) => console.log(fragment)
    );

    this.server = this.serversService.getServer(this.clickedId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id, {name: this.serverName, status: this.serverStatus}
      );
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
