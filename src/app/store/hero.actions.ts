import {Action} from '@ngrx/store';
import {Hero} from '../hero';
import {List} from 'immutable';

export const LOAD_HEROES = '[Hero] Load Heroes';
export const LOAD_HEROES_SUCCESS = '[Hero] Load Heroes Success';
export const GET_HERO = '[Hero] Get Hero';
export const GET_HERO_SUCCESS = '[Hero] Get Hero Success';
export const RESET_BLANK_HERO = '[Hero] Reset Blank Hero';
export const SELECT_HERO = '[Hero] Select';
export const SAVE_HERO = '[Hero] Save Hero';
export const SAVE_HERO_SUCCESS = '[Hero] Save Hero Success';
export const SET_ADDING_HERO = '[Hero] Set Adding Hero';
export const ADD_HERO = '[Hero] Add Hero';
export const ADD_HERO_SUCCESS = '[Hero] Add Hero Success';
export const DELETE_HERO = '[Hero] Delete Hero';
export const DELETE_HERO_SUCCESS = '[Hero] Delete Hero Success';
export const SET_ERROR = '[Hero] Set Error';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadHeroesAction implements Action {
  readonly type = LOAD_HEROES;
}

export class LoadHeroesSuccessAction implements Action {
  readonly type = LOAD_HEROES_SUCCESS;

  constructor(public payload: List<Hero>) {
  }
}

export class GetHeroAction implements Action {
  readonly type = GET_HERO;

  constructor(public payload: number) {
  }
}

export class GetHeroSuccessAction implements Action {
  readonly type = GET_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class ResetBlankHeroAction implements Action {
  readonly type = RESET_BLANK_HERO;
}

export class SelectHeroAction implements Action {
  readonly type = SELECT_HERO;

  constructor(public payload: Hero) {
  }
}

export class SetAddingHeroAction implements Action {
  readonly type = SET_ADDING_HERO;

  constructor(public payload: boolean) {
  }
}

export class AddHeroAction implements Action {
  readonly type = ADD_HERO;

  constructor(public payload: Hero) {
  }
}

export class AddHeroSuccessAction implements Action {
  readonly type = ADD_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class SaveHeroAction implements Action {
  readonly type = SAVE_HERO;

  constructor(public payload: Hero) {
  }
}

export class SaveHeroSuccessAction implements Action {
  readonly type = SAVE_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class DeleteHeroAction implements Action {
  readonly type = DELETE_HERO;

  constructor(public payload: Hero) {
  }
}

export class DeleteHeroSuccessAction implements Action {
  readonly type = DELETE_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class SetErrorAction implements Action {
  readonly type = SET_ERROR;

  constructor(public payload: any) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | LoadHeroesAction
  | LoadHeroesSuccessAction
  | GetHeroAction
  | GetHeroSuccessAction
  | ResetBlankHeroAction
  | SelectHeroAction
  | SaveHeroAction
  | SaveHeroSuccessAction
  | SetAddingHeroAction
  | AddHeroAction
  | AddHeroSuccessAction
  | DeleteHeroAction
  | DeleteHeroSuccessAction
  | SetErrorAction;
