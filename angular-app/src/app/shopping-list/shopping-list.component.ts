import { Component, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: ingredient[] = [
    new ingredient('Bread', 1),
    new ingredient('Vegemite', 1),
  ];

  constructor() {}

  ngOnInit(): void {}

  passIngredient(ingredient: { name: string; amount: number }) {
    this.ingredients.push(ingredient);
  }

  clearIngredients() {
    this.ingredients = [];
  }

  deleteIngredient(i) {
    this.ingredients.splice(i, 1);
  }
}
