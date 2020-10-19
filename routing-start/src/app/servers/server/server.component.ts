import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  

  constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }


  ngOnInit() {

    // Below code uses the resolver to get the paramas for the server component.
    // Bind the data from the data observable and grab the object which is created in the external router module
    this.route.data.subscribe(
      (data) => {
        this.server = data['server']
      }
    )


    // Below is an example of getting the parameters from the URL.
    // // Must convert the paramater from the URL to a number with the + operator.
    // const id = +this.route.snapshot.params['id'];

    // // Grab server data from serversService
    // this.server = this.serversService.getServer(id);
    
    // // Subscribe for any future changes
    // this.route.params.subscribe(
    //   (params:Params)=>{
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
  }

  // Can navigate to the /edit subroute by using the navigate method relative to this current route /servers/id
  // QueryParamsHandling takes a string as a value - overrights default behaviour of dropping and makes sure the old ones are kept.
  onEdit() {
    this.router.navigate(['edit'], {relativeTo:this.route, queryParamsHandling:'preserve'})
  }


}
