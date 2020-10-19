// This will fetch and get code before the router will complete and show the page - alternative to fetching data in the NgOnInit function.

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface Server {
    id:number,name:string,status:string
}


@Injectable()
export class ServerResolver implements Resolve<Server>{

    constructor(private serversService:ServersService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }

}