import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// Create an interface which contains an interface defining a function which returns Observable, Promise or Boolean.
export interface CanComponentDeactivate {
    canDeactive:() => Observable<boolean> | Promise<boolean> | boolean
}

// CanDeactive is implemented and is of generic type interface, which is the interface that we implemented. 
// 
export class CanDeactiveGuard implements CanDeactivate<CanComponentDeactivate>{
    canDeactivate(component:CanComponentDeactivate,
        currentRoute:ActivatedRouteSnapshot, 
        currentState:RouterStateSnapshot,
        nextState?:RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
            return component.canDeactive();
    }
}