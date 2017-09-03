import {Component, OnInit} from '@angular/core';
import {AppState} from './store/reducers';
import {Store} from '@ngrx/store';
import {HeroActionEnum} from './store/hero.actions';

@Component({
  selector: 'my-root',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // ideally, we would use the defer() feature to initialize in effects,
    // but it seems to be broken at the moment.
    this.store.dispatch(HeroActionEnum.LOAD_HEROES.toAction());
  }
}
