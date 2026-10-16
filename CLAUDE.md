# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200/`
- `ng build --configuration production` — production build, output to `dist/appRegistroCuentasFrontend/browser`
- `ng test` — unit tests via Karma/Jasmine
- `ng test --include='**/auth.service.spec.ts'` — single test file
- `ng lint` — TSLint (legacy, not ESLint)
- `ng e2e` — Protractor e2e tests (deprecated tooling)

Node engine pinned to `^24.0.0`. Uses `@angular-devkit/build-angular:application` (ESBuild) builder.

## Architecture

Angular 19 NgModule-based SPA (not standalone components, no SSR/single-spa). Each feature is a lazy-loaded module with its own `*-routing.module.ts`:

- `auth` — login/registro, guarded by `ValidarTokenGuard` (`canActivate`/`canLoad`, checks `AuthService.validarToken()`, clears `localStorage` and redirects to `/auth/login` on failure)
- `cuentas` — parent/container module mounted directly in `AppModule` (not lazy)
- `tarjeta-debito`, `tarjeta-credito-nac`, `tarjeta-credito-inter`, `otros-gastos`, `resumen` — expense-tracking feature modules, each with its own service in `src/app/services/`
- `menu`, `global-loader` — declared directly on `AppModule`

`src/app/core/` — cross-cutting, NgModule-exported (`CoreModule`): directives (`sortable-column`, `error-src-img`, `auto-focus`, `prevent-key-number`, `currency`), pipes (`format-currency`, `filter-table`), guards, interfaces, and app-wide services (`alert.service`, `loader.service`, `main-factory.service`, `utils.service`).

`src/app/shared/` — `SharedModule` with shared presentational components (`modal`, `confirmacion`, `paginador`, `crear-registro`, `visualizar-registro`, `filtro-busqueda`, `switch`, `loader`, `page-not-found`) plus third-party module re-exports (ngx-bootstrap, ng-select).

State sharing between feature modules goes through `MainFactoryService` (`BehaviorSubject`-backed flags like `cargarRegistroEdicion$`, `cargarAñosRegistros$`, `limpiarFormularios$`) and an in-memory + optional `sessionStorage`-backed key/value store (`setData`/`getData`).

No `HttpInterceptor` is registered — `AuthService` reads/writes the JWT (`appToken`) directly to `localStorage` per-call. `HttpClient` is provided via `provideHttpClient(withInterceptorsFromDi())` in `AppModule`.

`src/environments/environment.ts` / `environment.prod.ts` hold the backend API base URL (`environment.url`), swapped via `angular.json` `fileReplacements` on production builds.

## Notes

- No `@angular/material`, no `@bci/*` internal packages, no single-spa — this is a standalone SPA only.
- `ngx-bootstrap`, `@ng-select/ng-select`, `ngx-toastr` must stay on majors aligned with the installed Angular major (peer deps are strict); check `npm view <pkg> peerDependencies` before bumping either side.
- Lint/test tooling (`tslint`, `codelyzer`, Protractor) predates the Angular 19 migration and has not been modernized to ESLint/Jest.
