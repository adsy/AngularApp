import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPlaceholder]",
})
export class PlaceholderDirective {
  // add directive to someplace in templates/ DOM and get access with @ViewChild
  // and then we can access the public viewContainerRef value to work with the alertComponentFactory.
  constructor(public viewContainerRef: ViewContainerRef) {}
}
