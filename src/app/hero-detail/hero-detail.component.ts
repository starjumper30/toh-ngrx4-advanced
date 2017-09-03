import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero} from '../hero';
import {AppState} from '../store/reducers';
import {Store} from '@ngrx/store';
import {getSelectedHero} from '../store/hero.reducer';
import {Observable} from 'rxjs/Observable';
import {HeroActionEnum} from '../store/hero.actions';

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
        this.store.dispatch(HeroActionEnum.GET_HERO.toAction(id));
        this.navigated = true;
      } else {
        this.store.dispatch(HeroActionEnum.RESET_BLANK_HERO.toAction());
        this.navigated = false;
      }
    });
  }

  save(hero: Hero): void {
    const action = hero.id ? HeroActionEnum.SAVE_HERO.toAction(hero) : HeroActionEnum.ADD_HERO.toAction(hero);
    this.store.dispatch(action);
    this.goBack();
  }

  goBack(): void {
    this.store.dispatch(HeroActionEnum.SET_ADDING_HERO.toAction(false));
    if (this.navigated) {
      window.history.back();
    }
  }
}
