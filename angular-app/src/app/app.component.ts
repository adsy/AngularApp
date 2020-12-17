import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [],
})
export class AppComponent implements OnInit {
  constructor(private authSerice: AuthService) {}
  ngOnInit(): void {
    this.authSerice.autoLogin();
  }
}
