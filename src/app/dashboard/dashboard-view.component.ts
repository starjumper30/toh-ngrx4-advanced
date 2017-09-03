import {
  ChangeDetectionStrategy, Component, EventEmitter, Input,
  Output
} from '@angular/core';

import {Hero} from '../hero';
import {List} from 'immutable';

@Component({
  selector: 'my-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardViewComponent {
  @Input() heroes: List<Hero>;
  @Output() heroClicked: EventEmitter<Hero> = new EventEmitter<Hero>();

  gotoDetail(hero: Hero): void {
    this.heroClicked.emit(hero);
  }
}
