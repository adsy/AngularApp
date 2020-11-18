import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<ingredient[]>();

    private ingredients: ingredient[] = [
        new ingredient('Bread', 1),
        new ingredient('Vegemite', 1),
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      deleteIngredient(i) {
        this.ingredients.splice(i, 1);
        this.emitIngredientsArray();
      }

      addIngredient(name:string,amount:number) {
        this.ingredients.push(new ingredient(name,amount))
        this.emitIngredientsArray();
      }
    
      clearList() {
        this.ingredients = [];
        this.emitIngredientsArray();
      }

      emitIngredientsArray(){
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      changeIngredients(ingredients:ingredient[]){
        this.ingredients.push(...ingredients)
        this.emitIngredientsArray();
      }
}