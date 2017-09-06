import {List} from 'immutable';
import {ActionEnum, ActionEnumValue} from 'ngrx-enums';
import {Hero} from '../hero';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class HeroAction<T> extends ActionEnumValue<T> {
  constructor(name: string) {
    super(name);
  }
}

export class HeroActionEnumType extends ActionEnum<HeroAction<any>> {

  LOAD_HEROES = new HeroAction<void>('[Hero] Load Heroes');
  LOAD_HEROES_SUCCESS = new HeroAction<List<Hero>>('[Hero] Load Heroes Success');
  GET_HERO = new HeroAction<number>('[Hero] Get Hero');
  GET_HERO_SUCCESS = new HeroAction<Hero>('[Hero] Get Hero Success');
  RESET_BLANK_HERO = new HeroAction<void>('[Hero] Reset Blank Hero');
  SELECT_HERO = new HeroAction<Hero>('[Hero] Select');
  SAVE_HERO = new HeroAction<Hero>('[Hero] Save Hero');
  SAVE_HERO_SUCCESS = new HeroAction<Hero>('[Hero] Save Hero Success');
  SET_ADDING_HERO = new HeroAction<boolean>('[Hero] Set Adding Hero');
  ADD_HERO = new HeroAction<Hero>('[Hero] Add Hero');
  ADD_HERO_SUCCESS = new HeroAction<Hero>('[Hero] Add Hero Success');
  DELETE_HERO = new HeroAction<Hero>('[Hero] Delete Hero');
  DELETE_HERO_SUCCESS = new HeroAction<Hero>('[Hero] Delete Hero Success');

  constructor() {
    super();
    this.initEnum('heroActions');
  }
}

export const HeroActionEnum = new HeroActionEnumType();
