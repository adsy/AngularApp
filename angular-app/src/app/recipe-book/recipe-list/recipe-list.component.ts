import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipeService.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }

  onClick() {
    this.router.navigate(["new"], { relativeTo: this.activeRoute });
  }
}
