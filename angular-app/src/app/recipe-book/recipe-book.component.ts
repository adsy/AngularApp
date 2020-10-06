import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {
  recipeList = ['Bread', 'Butter', 'Vegemite'];
  recipeDetail = 'Toast with butter and vegimite';

  constructor() {}

  ngOnInit(): void {}
}
