import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.dataStorageService.fetchRecipes();
  }
  constructor(private dataStorageService: DataStorageService) {}
}
