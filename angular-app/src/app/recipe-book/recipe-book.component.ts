import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipeService.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers:[RecipeService]
})
export class RecipeBookComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService:RecipeService) {
  }

  // Using the recipeService we can listen to the recipeSelected event which is emitted in the recipe-item component.
  // When we hear a value which is emitted, we can grab it and assign it to the selectedRecipe value which is passed
  // to the recipe-detail component.
  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>this.selectedRecipe=recipe)
  }
}
