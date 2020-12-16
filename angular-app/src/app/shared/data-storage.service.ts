import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipeService.service";
import { map, tap } from "rxjs/operators";

// {providedIn: 'root} -> shortcut instead of adding into the app.module file.
@Injectable({ providedIn: "root" })
export class DataStorageService implements OnInit {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  ngOnInit(): void {}

  storeRecipes() {
    this.http
      .put(
        "https://recipe-book-backend-7d86e-default-rtdb.firebaseio.com/recipes.json",
        this.recipeService.getRecipes()
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://recipe-book-backend-7d86e-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
