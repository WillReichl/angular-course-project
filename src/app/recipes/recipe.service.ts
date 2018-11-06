import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      // tslint:disable-next-line:max-line-length
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Oscar_schnitzel_at_Grilli_Toro.jpg/1024px-Oscar_schnitzel_at_Grilli_Toro.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
      ),
    new Recipe(
      'Big Fat Burger',
      'What else do you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/8/88/Windows_7_WHOPPER.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Ground Beef Patty', 2),
        new Ingredient('Cheese', 2)
      ])
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice(); // return a *copy* of the array, cannot modify from outside
  }
}
