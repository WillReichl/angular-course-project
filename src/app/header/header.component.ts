import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map(authState => {
          return authState.user;
        })
      )
      .subscribe(user => {
        this.isAuthenticated = user ? true : false;
      });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
