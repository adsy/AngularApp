import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglistService.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;


  constructor(private shoppingListService:ShoppingListService) {}

  ngOnInit(): void {}

  addIngredient() {
    this.shoppingListService.addIngredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value)
  }

  clearList() {
    this.shoppingListService.clearList();
  }
}
