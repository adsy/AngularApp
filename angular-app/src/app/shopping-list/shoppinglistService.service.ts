import { EventEmitter } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<ingredient[]>();

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
        this.ingredientsChanged.emit(this.ingredients.slice())
      }

      changeIngredients(ingredients:ingredient[]){
        this.ingredients.push(...ingredients)
        this.emitIngredientsArray();
      }
}