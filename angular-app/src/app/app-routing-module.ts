// Created a seperate module which is added to top AppModule in imports to handling the routing of the app

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipe-book/recipesResolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipeBookComponent,
    children: [
      { path: "", component: RecipeStartComponent },
      // new path comes before the dynamic parameter router as it will interpret 'new' as the id.
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "login", component: AuthComponent },
];

@NgModule({
  imports: [
    // useHash is used for when the project is hosted on web servers as they must be configured via the HTML History way - can use this method as a last resort.
    // RouterModule.forRoot(appRoutes, {useHash:true})

    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
