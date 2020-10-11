import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNum: number;

  constructor() {}

  ngOnInit(): void {}

  startGame() {
    this.lastNum = 0;
    // When function is called, the setInverval function is called every second emitting the
    // intervalFired event emitted which contains a number for the type.
    // This will increment the lastNum variable after it is omitted using the ++ operator and
    // will be accessible by the parent component.
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNum++);
    }, 1000);
  }
  endGame() {
    clearInterval(this.interval);
  }
}
