import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Must inject the router object in the constructor for the component
  constructor(private router:Router, private authService:authService) { }

  ngOnInit() {
  }

  onLoadServers(num){
    // complex calculation
    // we can use the navigate function on the router to change pages progamatically
    this.router.navigate(['/servers',num,'edit'], {queryParams:{allowEdit:'1'},fragment:'loading' } )
  }

  login(){
    this.authService.login()
  }

  logout(){
    this.authService.logout()
  }

}
