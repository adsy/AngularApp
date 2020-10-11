import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emit } from 'process';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.recipeSelected.emit();
  }
}
