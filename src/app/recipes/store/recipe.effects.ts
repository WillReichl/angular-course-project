import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as RecipesActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-7d136.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
