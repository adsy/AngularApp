import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-component-app';
  pVisible = false;
  log = [];

  onDisplay() {
    this.pVisible = !this.pVisible;
    // this.log.push(this.log.length + 1);
    this.log.push('Button Clicked! Timestamp: ' + new Date());
  }
}
