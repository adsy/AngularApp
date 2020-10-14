import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit{


  ngOnInit(){
  }
  
  pageSelected: string = 'recipe';

  onNavigate(page: string) {
    this.pageSelected = page;
  }
}
