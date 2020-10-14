import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipeService.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService:RecipeService) {}

  ngOnInit(): void {}

  sendIngredients(){
    this.recipeService.addIngredientsToSL(this.recipe.ingredients);
  }
}
