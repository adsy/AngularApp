import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipeService.service";

@Component({
  selector: "app-recipe-book",
  templateUrl: "./recipe-book.component.html",
  styleUrls: ["./recipe-book.component.css"],
})
export class RecipeBookComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
