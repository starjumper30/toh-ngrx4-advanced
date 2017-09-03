import {createSelector, Selector} from '@ngrx/store';
import {Record} from 'immutable';
import {Hero} from '../hero';
import {AppState} from './reducers';
import * as heroActions from './hero.actions';

export interface HeroStateParam {
  selectedHero?: Hero,
  addingHero?: boolean
}

export class HeroState extends Record({selectedHero: null, addingHero: false}) {
  readonly selectedHero: Hero;
  readonly addingHero: boolean;

  constructor(params?: HeroStateParam) {
    params ? super(params) : super();
  }

  assign(values: HeroStateParam) {
    return this.merge(values) as this;
  }
}

const initialState: HeroState = new HeroState();
const blankHero: Hero = new Hero();

export function heroReducer(state = initialState, action: heroActions.Actions): HeroState {
  switch (action.type) {
    case heroActions.RESET_BLANK_HERO: {
      return state.assign({selectedHero: blankHero});
    }
    case heroActions.SET_ADDING_HERO: {
      return state.assign({selectedHero: null, addingHero: action.payload});
    }
    case heroActions.GET_HERO_SUCCESS: {
      return state.assign({selectedHero: action.payload});
    }
    case heroActions.DELETE_HERO_SUCCESS: {
      return state.assign({selectedHero: null});
    }
    case heroActions.SELECT_HERO: {
      return state.assign({selectedHero: action.payload, addingHero: false});
    }
    default: {
      return state;
    }
  }
}

const getHeroState: Selector<AppState, HeroState> =
  (state: AppState) => state.hero;

export const getSelectedHero: Selector<AppState, Hero> =
  createSelector(getHeroState, (state: HeroState) => {
    return state.selectedHero;
  });

export const getAddingHero: Selector<AppState, boolean> =
  createSelector(getHeroState, (state: HeroState) => {
    return state.addingHero;
  });
