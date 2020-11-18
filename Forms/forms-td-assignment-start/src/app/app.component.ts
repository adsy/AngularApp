import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f',{static:false}) userForm;
  submitted=false;

  options:string[] = ["Basic", "Advanced", "Pro"]

  onSubmit(){
    console.log(this.userForm)
    this.submitted=true
    this.userForm.reset();
  }

}
