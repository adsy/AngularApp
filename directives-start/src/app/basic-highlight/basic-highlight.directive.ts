import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})

// Get access to element via constructor ElementRef and then on initialisation we changed the style background
// color to green.
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}