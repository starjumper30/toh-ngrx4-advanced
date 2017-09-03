import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Hero} from './hero';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .map(res => {
        return res.json().data.map(hero => new Hero(hero));
      });
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .get(url)
      .map(res => {
        return new Hero(res.json().data);
      });
  }

  saveHero(hero: Hero): Observable<Hero> {
    if (hero.id) {
      return this.put(hero);
    } else {
      return this.post(hero);
    }
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
      .map(() => hero);
  }

  // Add new Hero
  private post(hero: Hero): Observable<Hero> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
      .map(res => {
        return new Hero(res.json().data);
      });
  }

  // Update existing Hero
  private put(hero: Hero): Observable<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .map(() => hero);
  }
}
