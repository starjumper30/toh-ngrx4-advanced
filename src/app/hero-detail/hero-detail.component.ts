import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero} from '../hero';
import {AppState} from '../store/reducers';
import {Store} from '@ngrx/store';
import {
  AddHeroAction,
  GetHeroAction,
  ResetBlankHeroAction,
  SaveHeroAction,
  SetAddingHeroAction
} from '../store/hero.actions';
import {getSelectedHero} from '../store/hero.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-hero-detail',
  template: `<my-hero-detail-view 
              [hero]="hero$ | async"
              (close)="goBack()"
              (saveRequested)="save($event)"></my-hero-detail-view>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  private navigated = false; // true if navigated here
  hero$ = new Observable<Hero>();

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.hero$ = store.select(getSelectedHero);
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id: number = +params['id'];
        this.store.dispatch(new GetHeroAction(id));
        this.navigated = true;
      } else {
        this.store.dispatch(new ResetBlankHeroAction());
        this.navigated = false;
      }
    });
  }

  save(hero: Hero): void {
    const action = hero.id ? new SaveHeroAction(hero) : new AddHeroAction(hero);
    this.store.dispatch(action);
    this.goBack();
  }

  goBack(): void {
    this.store.dispatch(new SetAddingHeroAction(false));
    if (this.navigated) {
      window.history.back();
    }
  }
}
