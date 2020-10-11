import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  // Need to make properties 'events' that we can omit - can use EventOmitter from Angular
  // - It is a generic type which we define the type of event data we are omitting.
  // EventEmitter is stored in these variables - can emit own events.

  // Must use @Output() at front as we are outputting the value.
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @Output() blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  // These values are not needed as local reference is used to pass the HTMLInputElement
  //to the functions below and extract the value.

  // newServerName = "";
  // newServerContent = "";

  // Can use ViewChild() to bind to a local reference within the html template
  // This can be used in our typescript functions below using the nativeElement.value
  @ViewChild("serverContentInput") serverContentInput: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  // Can call the 'emit' method which will emit a new event of that type
  // Must pass the Type it was originally declared as. This will emit it to the above component.
  onAddServer(svrName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: svrName.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(svrName: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: svrName.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
