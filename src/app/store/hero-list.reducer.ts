import {Hero} from '../hero';
import * as heroActions from './hero.actions';

import {AppState} from './reducers';
import {createSelector, Selector} from '@ngrx/store';
import {List, Record} from 'immutable';

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

export function heroListReducer(state = initialState, action: heroActions.Actions): HeroListState {
  switch (action.type) {
    case heroActions.LOAD_HEROES_SUCCESS: {
      return state.assign({heroes: action.payload, error: null});
    }
    case heroActions.ADD_HERO_SUCCESS: {
      return state.assign({heroes: state.heroes.push(action.payload), error: null});
    }
    case heroActions.SAVE_HERO_SUCCESS: {
      const index = findHeroIndex(state, action.payload.id);
      if (index >= 0) {
        return state.assign({heroes: state.heroes.set(index, action.payload), error: null});
      }
      return state;
    }
    case heroActions.DELETE_HERO_SUCCESS: {
      const index = findHeroIndex(state, action.payload.id);
      if (index >= 0) {
        return state.assign({heroes: state.heroes.remove(index), error: null});
      }
      return state;
    }
    case heroActions.SET_ERROR: {
      return state.assign({error: action.payload});
    }
    default: {
      return state;
    }
  }
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
