import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {Hero, HeroParam} from '../hero';

@Component({
  selector: 'my-hero-detail-view',
  templateUrl: './hero-detail-view.component.html',
  styleUrls: ['./hero-detail-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailViewComponent {

  private _hero: Hero; // immutable
  heroEdit: HeroParam; // mutable

  @Input() set hero(hero: Hero) {
    this._hero = hero;
    this.heroEdit = hero ? hero.asMutable() as HeroParam : null;
  }

  @Output() close = new EventEmitter<Hero>();
  @Output() saveRequested = new EventEmitter<Hero>();

  save(): void {
    this.saveRequested.emit(this._hero.assign(this.heroEdit));
  }

  goBack(): void {
    this.close.emit();
  }
}
