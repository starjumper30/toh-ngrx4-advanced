import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import {Hero} from '../hero';

class InputChanges implements SimpleChanges {
  [propName: string]: SimpleChange;
  hero: SimpleChange
}

@Component({
  selector: 'my-hero-detail-view',
  templateUrl: './hero-detail-view.component.html',
  styleUrls: ['./hero-detail-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailViewComponent implements OnChanges {

  @Input() hero: Hero;
  @Output() close = new EventEmitter<Hero>();
  @Output() saveRequested = new EventEmitter<Hero>();

  ngOnChanges(changes: InputChanges): void {
    // if (changes.hero) {
    //   this.hero = {...this.hero};
    // }
  }

  save(): void {
    this.saveRequested.emit(this.hero);
  }

  goBack(): void {
    this.close.emit();
  }
}
