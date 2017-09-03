import {Hero} from '../hero';

import {AppState} from './reducers';
import {createSelector, Selector} from '@ngrx/store';
import {List, Record} from 'immutable';
import {GeneralActionEnum} from './general.actions';
import {HeroActionEnum} from './hero.actions';
import {TypedAction} from 'ngrx-enums';

export interface HeroesListStateParams {
  heroes?: List<Hero>,
  error?: any
}

export class HeroListState extends Record({heroes: List(), error: null}) {
  readonly heroes: List<Hero>;
  readonly error: any;

  constructor(params?: HeroesListStateParams) {
    params ? super(params) : super();
  }

  assign(values: HeroesListStateParams) {
    return this.merge(values) as this;
  }
}

const initialState: HeroListState = new HeroListState();

export function heroListReducer(state = initialState, action: TypedAction<any>): HeroListState {
    if (HeroActionEnum.LOAD_HEROES_SUCCESS.matches(action)) {
      return state.assign({heroes: action.payload, error: null});

    } else if (HeroActionEnum.ADD_HERO_SUCCESS.matches(action)) {
      return state.assign({heroes: state.heroes.push(action.payload), error: null});

    } else if (HeroActionEnum.SAVE_HERO_SUCCESS.matches(action)) {
      const index = findHeroIndex(state, action.payload.id);
      if (index >= 0) {
        return state.assign({heroes: state.heroes.set(index, action.payload), error: null});
      }
      return state;

    } else if (HeroActionEnum.DELETE_HERO_SUCCESS.matches(action)) {
      const index = findHeroIndex(state, action.payload.id);
      if (index >= 0) {
        return state.assign({heroes: state.heroes.remove(index), error: null});
      }
      return state;

    } else if (GeneralActionEnum.SET_ERROR.matches(action)) {
      return state.assign({error: action.payload});
    }
    return state;
}

function findHeroIndex(state: HeroListState, id: number): number {
  return state.heroes.findIndex((hero: Hero) => hero.id === id);
}

const getHeroListState: Selector<AppState, HeroListState> =
  (state: AppState) => state.heroes;

export const getHeroes: Selector<AppState, List<Hero>> =
  createSelector(getHeroListState, (state: HeroListState) => state.heroes);

export const getError: Selector<AppState, any> =
  createSelector(getHeroListState, (state: HeroListState) => state.error);
