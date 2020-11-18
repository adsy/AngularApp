import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipeService.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[]

  constructor(private recipeService:RecipeService, private router:Router, private activeRoute:ActivatedRoute) {
    this.recipes = this.recipeService.getRecipes();
  }


  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['new'],{relativeTo:this.activeRoute})
  }
}
