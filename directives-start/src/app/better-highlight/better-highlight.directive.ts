import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding("style.backgroundColor") backgroundColor: string;
  
  
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor =  this.defaultColor;
    // on initiallisation the element which has this directive placed on it, has its style for the
    // 'background-color' changed to red.
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "red");
  }

  // takes argument name as input (have all of the events available from that particular element) which will
  // cause it to listen for that event. Once event happens the code inside of the HostListener is fired changing
  // the style of the element.
  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "red");
    
    
    
    this.backgroundColor = this.highlightColor;
  }

  // takes argument name as input (have all of the events available from that particular element) which will
  // cause it to listen for that event. Once event happens the code inside of the HostListener is fired changing
  // the style of the element.
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("click") mouseclick(eventData: Event) {
    this.backgroundColor = "aqua";
  }

  // On the element this directive sits, the style property will be accessed and a sub property (backgroundColor)
  // and it will be changed when using the backgroundColor variable declared.
  // Much easier and cleaner way of changing elements through directives.
}
