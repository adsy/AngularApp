import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { authService } from "./auth-service.service";


// The class below is a guard for accessing child URLS of whoever this is placed on with the CanActivate property in the routing module. 
// The authGuard implements CanActivate which will return a resolved promise, observable or a boolean. In this case it calls the mock isAuthenticated method in the Auth Service which returns the value of the loggedIn value. 
// If it is true, it returns true allowing the user to access the URL, otherwise navigate to home.
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService:authService, private router: Router){}



    // Not the easiest way - have to add to each child item to stop user from accessing child - use other function.
    canActivate(route: ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
                    return this.authService.isAuthenticated().then(
                        (authenticated:boolean) => {
                            if (authenticated)
                            {
                                return true;
                            }
                            else {
                                this.router.navigate(['/'])
                            }
                        }
                    )
                }

            
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>| Promise<boolean> | boolean {
        return this.canActivate(route,state)
        }
    }