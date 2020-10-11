import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Vegemite toast',
      'Toast with vegemite',
      'https://smallville.com.au/wp-content/uploads/2018/12/shutterstock_497048671-2.png'
    ),
    new Recipe(
      'Vegemite toast',
      'Toast with vegemite',
      'https://www.196flavors.com/wp-content/uploads/2020/01/vegemite-toast-1-FP-500x500.jpeg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  selectedRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
