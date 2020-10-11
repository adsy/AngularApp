import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  time: string;

  @ViewChild('minuteInput') minuteInput: ElementRef;
  @ViewChild('speedInput') speedInput: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  calculateSpeed() {
    let calc = (
      this.minuteInput.nativeElement.value / this.speedInput.nativeElement.value
    ).toFixed(2);

    if (calc === 'NaN') {
      this.time = 'You must only enter numbers';
    } else {
      this.time = calc;
    }
  }
}
