// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appName: 'e-Stock',
  production: false,
  apiURLBase: 'http://localhost:8080',
  clientId: 'my-angular-app',
  googleId: '500901473946-67h7h05slq3n10cnrnbsiuqi3nvh4248.apps.googleusercontent.com',
  clientSecret: '@321',
  obterTokenUrl: '/api/oauth/token',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
