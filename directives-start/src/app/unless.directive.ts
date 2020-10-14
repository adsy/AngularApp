import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition:boolean) {
    if (!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    }else{
      this.vcRef.clear();
    }
  }

  // The parameters below mark the place where we are placing the directive in the doc
  // and passing to angular.
  constructor(private templateRef:TemplateRef<any>, private vcRef:ViewContainerRef) { }

}
