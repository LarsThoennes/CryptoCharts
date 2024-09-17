import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component'; // Importiere die Standalone-Komponente
import { provideHttpClient } from '@angular/common/http';
import { CoinViewComponent } from './secondary-page/coin-view/coin-view.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: MainPageComponent },
      { path: 'CoinView', component: CoinViewComponent } // Setze MainPageComponent als Standardroute
    ]),
    provideHttpClient() // Bereitstellung des HttpClient für API-Anfragen
  ]
};
