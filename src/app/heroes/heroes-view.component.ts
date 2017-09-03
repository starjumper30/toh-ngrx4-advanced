import {
  ChangeDetectionStrategy, Component, EventEmitter, Input,
  Output
} from '@angular/core';

import {Hero} from '../hero';
import {List} from 'immutable';

@Component({
  selector: 'my-heroes-view',
  templateUrl: './heroes-view.component.html',
  styleUrls: ['./heroes-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesViewComponent {
  @Input() heroes: List<Hero>;
  @Input() selectedHero: Hero;
  @Input() addingHero = false;
  @Input() error: any;
  @Output() addHeroInitiated: EventEmitter<void> = new EventEmitter<void>();
  @Output() detailsRequested: EventEmitter<Hero> = new EventEmitter<Hero>();
  @Output() heroDeleted: EventEmitter<Hero> = new EventEmitter<Hero>();
  @Output() heroSelected: EventEmitter<Hero> = new EventEmitter<Hero>();
  showNgFor = false;

  addHero(): void {
    this.addHeroInitiated.emit();
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroDeleted.emit(hero);
  }

  onSelect(hero: Hero): void {
    this.heroSelected.emit(hero);
  }

  gotoDetail(): void {
    this.detailsRequested.emit(this.selectedHero);
  }
}
