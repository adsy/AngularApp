import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onCloseAlert() {
    console.log("here");

    this.close.emit();
  }

  dismissBackdrop() {
    this.close.emit();
  }
}
