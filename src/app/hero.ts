import {Record} from 'immutable';

export interface HeroParam {
  id?: number;
  name?: string;
}

export class Hero extends Record({id: null, name: null}) {
  readonly id: number;
  readonly name: string;

  constructor(params?: HeroParam) {
    params ? super(params) : super();
  }

  assign(values: HeroParam) {
    return this.merge(values) as this;
  }
}
