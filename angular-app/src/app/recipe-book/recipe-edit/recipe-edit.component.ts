import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipeService.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  editForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe["ingredients"]) {
        for (let ingredient of recipe["ingredients"]) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.editForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.editForm.value.name,
    //   this.editForm.value.description,
    //   this.editForm.value.imagePath,
    //   this.editForm.value["ingredients"]
    // );

    // Can use this.editForm.value instead of creating a new Recipe object as the value object of the form is the same structure
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editForm.value);
      this.router.navigate(["/recipes", this.id]);
      return;
    }

    this.recipeService.addRecipe(this.editForm.value);
    this.router.navigate(["/recipes"]);
  }

  removeIngredient(i: number) {
    (<FormArray>this.editForm.get("ingredients")).removeAt(i);
  }

  cancelEdit() {
    if (this.editMode) {
      this.editMode = false;
      this.router.navigate(["/recipes", this.id]);
      return;
    }

    this.router.navigate(["/recipes"]);
  }

  addIngredient() {
    (<FormArray>this.editForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  get controls() {
    return (<FormArray>this.editForm.get("ingredients")).controls;
  }
}
