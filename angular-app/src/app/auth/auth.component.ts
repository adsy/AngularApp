import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { errorMonitor } from "events";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  sendingRequest: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHostDiv: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.sendingRequest = true;

    let authObs: Observable<AuthResponseData>;

    // if currently set to login mode, set observable to the signIn function, reset form and return.
    if (this.isLoginMode) {
      authObs = this.authService.signIn(form.value.email, form.value.password);
      form.reset();
    } else {
      // if signing up, set observable to the signIn function
      authObs = this.authService.signUp(form.value.email, form.value.password);
      // reset form
      form.reset();
    }
    // if signing up, set observable to the signIn function

    // subscribe to the observable for the results
    authObs.subscribe(
      (response) => {
        this.error = null;
        this.sendingRequest = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.sendingRequest = false;
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHostDiv.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    alertComponentRef.instance.message = errorMessage;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
