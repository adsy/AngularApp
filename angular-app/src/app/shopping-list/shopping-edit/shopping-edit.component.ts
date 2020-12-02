import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglistService.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: ingredient;

  constructor(private shoppingListService:ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
    'name':new FormControl(null, Validators.required),
    'amount':new FormControl(null, Validators.required),
    })

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  addIngredient() {

    const value = this.ingredientForm.value;
    const newIngredient = new ingredient(value.name, value.amount);

    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
      this.editMode = false;
      this.ingredientForm.reset();
      return;
    }
    
    this.shoppingListService.addIngredient(value.name, value.amount)
    this.ingredientForm.reset();
  }

  clearList() {
    this.shoppingListService.clearList();
  }
}
