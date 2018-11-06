import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  ngOnInit() {
    this.ingredientsChanged.emit(this.getIngredients());
  }

  getIngredients() {
    return this.ingredients.slice(); // return copy
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
    console.log(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // ES6 Spread Operator
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
