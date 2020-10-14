import { EventEmitter, Injectable } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglistService.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  constructor(private slService:ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe(
          'Vegemite toast',
          'Toast with vegemite',
          'https://smallville.com.au/wp-content/uploads/2018/12/shutterstock_497048671-2.png',
          [new ingredient('Bread',1),new ingredient('Butter',1),new ingredient('Vegemite',1)]
        ),
        new Recipe(
          'Vegemite toast',
          'Toast with vegemite',
          'https://www.196flavors.com/wp-content/uploads/2020/01/vegemite-toast-1-FP-500x500.jpeg',
          [new ingredient('Bread',1),new ingredient('Butter',1),new ingredient('Vegemite',1)]
        ),
      ];

      recipeSelected = new EventEmitter<Recipe>();

      addIngredientsToSL(ingredients:ingredient[]){
        this.slService.changeIngredients(ingredients);
      }

      getRecipes(){
          // calling slice will return a copy of the recipe array to work with the private value
          // returning the array from the service will return the actual location and allow manipulation of the private variable.
          return this.recipes.slice();
      }
}