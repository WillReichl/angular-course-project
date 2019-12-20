import { Action } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

// if state is null, initialState is the default
export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      // return copy of old state + new data -- STATE SHOULD ALWAYS BE IMMUTABLE
      return {
        ...state,
        ingredients: [...state.ingredients, action] // first step - we'll come back to this to get the actual ingredient to add
      };
  }
}
