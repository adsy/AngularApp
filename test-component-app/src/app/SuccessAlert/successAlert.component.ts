import { Component } from '@angular/core';

// Component declarator - must import first. Must pass JS object to configure it. Can setup important info
// that will be stored as metadata for the class in background which will tell Angular what to do with this class.
@Component({
  selector: 'SuccessComponent',
  templateUrl: './successAlert.component.html',
})

// Angular components are classes
export class SuccessComponent {}
