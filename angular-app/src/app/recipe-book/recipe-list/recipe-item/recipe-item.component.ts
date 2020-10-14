import { Component, Input, OnInit } from '@angular/core';
import { emit } from 'process';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipeService.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: Recipe;

  constructor(private recipeService:RecipeService) {}

  ngOnInit(): void {}

  onClick() {
  this.recipeService.recipeSelected.emit(this.recipe)    
  }
}
