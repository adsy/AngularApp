import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList = [];
  item = '';

  constructor() {}

  ngOnInit(): void {}

  addItem(item: any) {
    this.shoppingList.push(item);
  }

  removeItem(i: any) {
    this.shoppingList.splice(i, 1);
  }
}
