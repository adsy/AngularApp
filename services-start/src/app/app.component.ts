import { Component, OnInit } from '@angular/core';
import { accountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[accountsService]
})
export class AppComponent implements OnInit{

  accounts:{name:string,status:string}[] = [];

  constructor(private accountsService:accountsService){}

  ngOnInit(){
    this.accounts = this.accountsService.accounts;
  }
}
