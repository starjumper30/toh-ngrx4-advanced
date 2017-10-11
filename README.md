# Getting Started

This is a modification of [John Papa's version](https://github.com/johnpapa/angular-tour-of-heroes) of 
the [Tour of Heroes tutorial](https://angular.io/tutorial) application. The point of this fork is to 
show features that are current best practices in Angular application design beyond what is covered by
the tutorial.

Compared to the base version, this version makes the following changes in consecutive commits:
1. [Moving](https://github.com/LMFinney/toh-ngrx4/commit/74b2b11da111dc966fcc1c237ed85de95c118445) the components to their own modules.
2. [Removing](https://github.com/LMFinney/toh-ngrx4/commit/d0a15dedbd1ff8257bf93040e75cf6daff7e9ea5) the conversion of Observables to Promises.
3. [Moving](https://github.com/LMFinney/toh-ngrx4/commit/9a1a7b92a64f92573c2bd6e565c57ae18e100751) data management into
 [@ngrx v4](https://github.com/ngrx/platform) store and effects (combined with implementing the 
[Presentational/Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) component pattern).
4. Enforcing [immutability](https://github.com/ngrx/store/issues/290) in the @ngrx store.
5. Using [ngrx-enums](https://github.com/LMFinney/ngrx-enums) to remove boilerplate in @ngrx actions and reducers.

Further steps that aren't included at this point could include the following:
1. [Internationalization](https://angular.io/guide/i18n) support.
2. Introducing [Reactive forms](https://angular.io/guide/reactive-forms) for the search box.

Thanks to [Nick Klepinger](http://bodiddlie.github.io/ng-2-toh-with-ngrx-suite/) for providing inspiration through an earlier 
[update](https://github.com/bodiddlie/rxheroes) of Tour of Heroes using older versions of @ngrx, etc.

Steps 1-3 were presented by Lance Finney at [Angular Lunch](https://angularlunch.wordpress.com/) in August 2017: 
[Presentation](https://docs.google.com/presentation/d/1maxom8L2S9XY7sokrr7hPrMyrnp8p_rwqVTRZEcVf0o/edit?usp=sharing)

Steps 4-5 were presented by Christina Hardin at [Angular Lunch](https://angularlunch.wordpress.com/) on September 20, 2017: 
[Presentation](https://www.dropbox.com/s/wyhmoobox1ly7y3/AngularLunch_Sep202017.pptx?dl=0)

## Get the Code
```
git clone https://github.com/starjumper30/toh-ngrx4-advanced.git
cd toh-ngrx4-advanced
npm i
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you want to use a different port (say 4201), run `ng serve --port 4201` and navigate to `http://localhost:4201/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

