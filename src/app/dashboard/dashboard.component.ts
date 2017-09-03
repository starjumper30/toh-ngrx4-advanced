import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../hero';
import {AppState} from '../store/reducers';
import {Store} from '@ngrx/store';
import {getHeroes} from '../store/hero-list.reducer';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

@Component({
  selector: 'my-dashboard',
  template: `<my-dashboard-view 
              [heroes]="(heroes$ | async).slice(1, 5)"
              (heroClicked)="gotoDetail($event)"></my-dashboard-view>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  heroes$: Observable<List<Hero>>;

  constructor(private router: Router,
              store: Store<AppState>) {
    this.heroes$ = store.select(getHeroes);
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
