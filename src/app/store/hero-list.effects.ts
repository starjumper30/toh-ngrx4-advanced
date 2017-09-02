import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {HeroService} from '../hero.service';
import * as heroActions from './hero.actions';
import {
  AddHeroAction,
  AddHeroSuccessAction,
  DeleteHeroAction,
  DeleteHeroSuccessAction,
  GetHeroAction,
  GetHeroSuccessAction,
  LoadHeroesSuccessAction,
  SaveHeroAction,
  SaveHeroSuccessAction, SetErrorAction
} from './hero.actions';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/withLatestFrom';
import {getHeroes} from './hero-list.reducer';
import {Hero} from '../hero';
import {AppState} from './reducers';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroListEffects {

  @Effect() loadHeroes$ = this.actions$
    .ofType(heroActions.LOAD_HEROES)
    .switchMap(() => this.svc.getHeroes())
    .map(heroes => new LoadHeroesSuccessAction(heroes))
    .catch(error => of(new SetErrorAction(error)));

  @Effect() getHero$ = this.actions$
    .ofType(heroActions.GET_HERO)
    .withLatestFrom(this.store.select<Hero[]>(getHeroes))
    .switchMap(([action, heroes]: [GetHeroAction, Hero[]]) => {
      const id: number = action.payload;
      if (heroes && heroes.length) {
        return Observable.of(heroes.find((h: Hero) => h.id === id))
      } else {
        return this.svc.getHero(id);
      }
    })
    .map(hero => new GetHeroSuccessAction(hero))
    .catch(error => of(new SetErrorAction(error)));

  @Effect() saveHero$ = this.actions$
    .ofType(heroActions.SAVE_HERO)
    .map((action: SaveHeroAction) => action.payload)
    .switchMap(hero => this.svc.saveHero(hero))
    .map(hero => new SaveHeroSuccessAction(hero))
    .catch(error => of(new SetErrorAction(error)));

  @Effect() addHero$ = this.actions$
    .ofType(heroActions.ADD_HERO)
    .map((action: AddHeroAction) => action.payload)
    .switchMap(hero => this.svc.saveHero(hero))
    .map(hero => new AddHeroSuccessAction(hero))
    .catch(error => of(new SetErrorAction(error)));

  @Effect() deleteHero$ = this.actions$
    .ofType(heroActions.DELETE_HERO)
    .map((action: DeleteHeroAction) => action.payload)
    .switchMap(hero => this.svc.deleteHero(hero))
    .map(hero => new DeleteHeroSuccessAction(hero))
    .catch(error => of(new SetErrorAction(error)));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private svc: HeroService) {
  }

}
