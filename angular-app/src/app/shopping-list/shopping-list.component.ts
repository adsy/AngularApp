import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglistService.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: ingredient[] = [];
  private idChangeSubcription:Subscription;

  constructor(private shoppingListService:ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSubcription = this.shoppingListService.ingredientsChanged.subscribe((ingredients) => this.ingredients=ingredients)
  }

  ngOnDestroy(){
    this.idChangeSubcription.unsubscribe();
  }

  deleteIngredient(i) {
    this.shoppingListService.deleteIngredient(i);
  }
}
