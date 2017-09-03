import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../hero';
import {Observable} from 'rxjs/Observable';
import {getError, getHeroes} from '../store/hero-list.reducer';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {getAddingHero, getSelectedHero} from '../store/hero.reducer';
import {
  DeleteHeroAction, SelectHeroAction,
  SetAddingHeroAction
} from '../store/hero.actions';
import {List} from 'immutable';

@Component({
  selector: 'my-heroes',
  template: `<my-heroes-view
          [heroes]="heroes$ | async"
          [selectedHero]="selectedHero$ | async"
          [addingHero]="addingHero$ | async"
          [error]="error$ | async"
          (addHeroInitiated)="addHero()"
          (detailsRequested)="gotoDetail($event)"
          (heroDeleted)="deleteHero($event)"
          (heroSelected)="onSelect($event)"></my-heroes-view>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  heroes$: Observable<List<Hero>>;
  selectedHero$: Observable<Hero>;
  addingHero$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private router: Router,
              private store: Store<AppState>) {
    this.heroes$ = store.select(getHeroes);
    this.selectedHero$ = store.select(getSelectedHero);
    this.addingHero$ = store.select(getAddingHero);
    this.error$ = store.select(getError);
  }

  addHero(): void {
    this.store.dispatch(new SetAddingHeroAction(true));
  }

  deleteHero(hero: Hero): void {
    this.store.dispatch(new DeleteHeroAction(hero));
  }

  onSelect(hero: Hero): void {
    this.store.dispatch(new SelectHeroAction(hero));
  }

  gotoDetail(hero): void {
    this.router.navigate(['/detail', hero.id]);
  }
}
