import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Hero} from 'app/hero';

@Component({
  selector: 'my-hero-name',
  template: `<h2>{{hero.name}} details!</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroNameComponent {
  @Input()
  hero: Hero;
}
