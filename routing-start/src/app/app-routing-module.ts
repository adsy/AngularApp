// Created a seperate module which is added to top AppModule in imports to handling the routing of the app

import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { UsersComponent } from "./users/users.component";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth-guard.service";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { UserComponent } from "./users/user/user.component";
import { CanDeactiveGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";


const appRoutes:Routes = [
    {path:'', component: HomeComponent},
    {path:'users', component: UsersComponent, 
      children:[{path:':id/:name', component: UserComponent}]},
    // can also pass parameters to the path and can access it within the component - tells angular its a dynamic
    // part of the path.
    {path:'servers', 
    // canActivate:[AuthGuard],
    // calling the canActivateChild property on the path will protect the children from being loading without having to place it on each child path call.
    canActivateChild: [AuthGuard], 
    component: ServersComponent, 
    children :[
      // ServerResolver in resolve will map the data we are given back from the resolve method. Method in the resolve method will be called when route is called - stored in the 'server' property which will be available in the component.
      {path:':id', component: ServerComponent, resolve:{server:ServerResolver}},
      {path:':id/:edit', component: EditServerComponent, canDeactivate:[CanDeactiveGuard]}]},
      // Bottom 2 routes must be at the bottom of the routes declaration to redirect for 404
    // {path:'not-found',component:PageNotFoundComponent},
    {path:'not-found',component:ErrorPageComponent, data:{message:'404 - Page not found!'}},
    {path:'**',redirectTo:'/not-found'}
  ];

  
@NgModule({
    imports:[
      // useHash is used for when the project is hosted on web servers as they must be configured via the HTML History way - can use this method as a last resort.
      // RouterModule.forRoot(appRoutes, {useHash:true})
      RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{

}