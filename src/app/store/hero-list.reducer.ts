import {Hero} from '../hero';
import * as heroActions from './hero.actions';

import {AppState} from './reducers';
import {createSelector, Selector} from '@ngrx/store';

export type HeroListState = {
  heroes: Hero[];
  error?: any;
};

const initialState: HeroListState = {
  heroes: []
};

export function heroListReducer(state = initialState, action: heroActions.Actions): HeroListState {
  switch (action.type) {
    case heroActions.LOAD_HEROES_SUCCESS: {
      return {...state, heroes: action.payload, error: null};
    }
    case heroActions.ADD_HERO_SUCCESS: {
      return {...state, heroes: [...state.heroes, action.payload], error: null};
    }
    case heroActions.SAVE_HERO_SUCCESS: {
      const index = state.heroes.findIndex((hero: Hero) => hero.id === action.payload.id);
      if (index >= 0) {
        const heroes: Hero[] = state.heroes;
        return {
          ...state, error: null, heroes: [
            ...heroes.slice(0, index),
            action.payload,
            ...state.heroes.slice(index + 1)
          ]
        };
      }
      return state;
    }
    case heroActions.DELETE_HERO_SUCCESS: {
      return {
        ...state, error: null, heroes: state.heroes.filter(hero => {
          return hero.id !== action.payload.id;
        })
      };
    }
    case heroActions.SET_ERROR: {
      return {
        ...state, error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

const getHeroListState: Selector<AppState, HeroListState> =
  (state: AppState) => state.heroes;

export const getHeroes: Selector<AppState, Hero[]> =
  createSelector(getHeroListState, (state: HeroListState) => state.heroes);

export const getError: Selector<AppState, any> =
  createSelector(getHeroListState, (state: HeroListState) => state.error);
