import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
