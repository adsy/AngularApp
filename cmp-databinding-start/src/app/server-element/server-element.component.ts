import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  // Adding an @Input() function in front of the element, we can pass the iteratable item
  // from the above component down to the receiving component which can be used in the template
  // in the receiving component.

  // Custom property binding - variable is given to it from the parent component.
  @Input() element: { type: string; name: string; content: string };

  // Custom property binding - variable is given to it from the parent component.
  @Input() name: string;

  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() {
    console.log("constructor called");
  }

  // Hook receives SimpleChanges object parameter which returns an object which has the currentValue and
  // previousValue of the state.
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  // Called when component is aclled
  ngOnInit(): void {
    console.log("NgOnIt called");
  }

  // Called whenever angular checks for any changes - couple of events that can trigger this.
  ngDoCheck() {
    console.log("ngDoCheck called");
  }

  // called after ngContent is called to initialise in components. Called when the ngContent attribute is added
  // to components.
  ngAfterContentInit() {
    console.log("ngAfterContentInit called");
  }

  // Called after each change detection cycle
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}
