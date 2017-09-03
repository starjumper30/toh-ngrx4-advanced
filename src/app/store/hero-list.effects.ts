import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/withLatestFrom';
import {getHeroes} from './hero-list.reducer';
import {Hero} from '../hero';
import {AppState} from './reducers';
import {List} from 'immutable';
import {TypedAction} from 'ngrx-enums';

import {HeroService} from '../hero.service';
import {HeroActionEnum} from './hero.actions';
import {GeneralActionEnum} from './general.actions';


function handleError(error: any): Observable<TypedAction<any>> {
  return of(GeneralActionEnum.SET_ERROR.toAction(error));
}

@Injectable()
export class HeroListEffects {

  @Effect() loadHeroes$ = HeroActionEnum.LOAD_HEROES.of(this.actions$)
    .switchMap(() => this.svc.getHeroes())
    .map(heroes => HeroActionEnum.LOAD_HEROES_SUCCESS.toAction(List(heroes)))
    .catch(handleError);

  @Effect() getHero$ = HeroActionEnum.GET_HERO.of(this.actions$)
    .withLatestFrom(this.store.select<List<Hero>>(getHeroes))
    .switchMap(([id, heroes]: [number, List<Hero>]) => {
      if (heroes && heroes.size) {
        return Observable.of(heroes.find((h: Hero) => h.id === id))
      } else {
        return this.svc.getHero(id);
      }
    })
    .map(hero => HeroActionEnum.GET_HERO_SUCCESS.toAction(hero))
    .catch(handleError);

  @Effect() saveHero$ = HeroActionEnum.SAVE_HERO.of(this.actions$)
    .switchMap(hero => this.svc.saveHero(hero))
    .map(hero => HeroActionEnum.SAVE_HERO_SUCCESS.toAction(hero))
    .catch(handleError);

  @Effect() addHero$ = HeroActionEnum.ADD_HERO.of(this.actions$)
    .switchMap(hero => this.svc.saveHero(hero))
    .map(hero => HeroActionEnum.ADD_HERO_SUCCESS.toAction(hero))
    .catch(handleError);

  @Effect() deleteHero$ = HeroActionEnum.DELETE_HERO.of(this.actions$)
    .switchMap(hero => this.svc.deleteHero(hero))
    .map(hero => HeroActionEnum.DELETE_HERO_SUCCESS.toAction(hero))
    .catch(handleError);

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private svc: HeroService) {
  }

}
