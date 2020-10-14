import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})

export class dropdownDirective implements OnInit {
    constructor(private elRef: ElementRef) {}

    ngOnInit(){
        // console.log(this.classText)
    }

    // Whichever element has this directive plased on it has the 'open' class not attached by default.
    @HostBinding('class.open') isOpen = false;

    // The directive will listen for a click on the document which will then toggle it closed
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
  
}