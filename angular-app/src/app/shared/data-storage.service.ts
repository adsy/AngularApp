import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipeService.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

// {providedIn: 'root} -> shortcut instead of adding into the app.module file.
@Injectable({ providedIn: "root" })
export class DataStorageService implements OnInit {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
        // passes the results of the 2nd observable to a map function which maps ingredients into the recipe object incase there are no ingredients attached.
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        // taps into observable before it finishes and uses value to set the recipes in the recipe service to store locally
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
