import {createSelector, Selector} from '@ngrx/store';
import {Record} from 'immutable';
import {Hero} from '../hero';
import {AppState} from './reducers';
import {HeroActionEnum} from './hero.actions';
import {TypedAction} from 'ngrx-enums';

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

const initialState = new HeroState();
const blankHero = new Hero();

export function heroReducer(state = initialState, action: TypedAction<any>): HeroState {
  if (HeroActionEnum.RESET_BLANK_HERO.matches(action)) {
    return state.assign({selectedHero: blankHero});

  } else if (HeroActionEnum.SET_ADDING_HERO.matches(action)) {
    return state.assign({selectedHero: null, addingHero: action.payload});

  } else if (HeroActionEnum.GET_HERO_SUCCESS.matches(action)) {
    return state.assign({selectedHero: action.payload});

  } else if (HeroActionEnum.DELETE_HERO_SUCCESS.matches(action)) {
    return state.assign({selectedHero: null});

  } else if (HeroActionEnum.SELECT_HERO.matches(action)) {
    return state.assign({selectedHero: action.payload, addingHero: false});
  }
  return state;
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
