import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component'; 
import { provideHttpClient } from '@angular/common/http';
import { CoinViewComponent } from './secondary-page/coin-view/coin-view.component';
import { StatsComponent } from './secondary-page/stat-view/stats/stats.component';
import { ImprintComponent } from './secondary-page/info-components/imprint/imprint.component';
import { PrivacyPoliceComponent } from './secondary-page/info-components/privacy-police/privacy-police.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: MainPageComponent },
      { path: 'CoinView', component: CoinViewComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'imprint', component: ImprintComponent },
      { path: 'privacyPolice', component: PrivacyPoliceComponent } 
    ]),
    provideHttpClient()
  ]
};
