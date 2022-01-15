import { List } from './../../core/models/list.interface';
import { CacheService, AppCacheKeys } from './../../core/services/cache.service';
import { User } from './../../core/models/user.interface';
import { UsersRoutes } from './users-routes';
import { ApiService } from './../../shared/services/api.service';
import { map, mergeMap, mergeMapTo } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from './users.actions';
import * as ListsActions from '../lists/lists.actions';

@Injectable()
export class UsersEffects {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.Register),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Register}` });
      return this.api.post<User>(url, action.payload).pipe(
        map(user => {
          this.cacheService.cache(AppCacheKeys.User, user);
          return UsersActions.UserLoggedIn({ payload: user })
        })
      )
    })
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.Login),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Login}` });
      return this.api.post<User>(url, action.payload).pipe(
        map(user => {
          this.cacheService.cache(AppCacheKeys.User, user);
          return UsersActions.UserLoggedIn({ payload: user });
        })
      )
    })
  ));
  getLists$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.GetUsersLists),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.GetLists}` });
      return this.api.post<List[]>(url, action.payload).pipe(
        map((lists) => (ListsActions.AddLists({ payload: lists })))
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private api: ApiService,
    private cacheService: CacheService,
  ) { }
}