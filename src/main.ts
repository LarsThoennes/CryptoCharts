import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  ...appConfig,  // Behalte die bestehende Konfiguration bei
  providers: [
    ...appConfig.providers || [],  // Falls du bereits Provider in `appConfig` hast
    provideCharts(withDefaultRegisterables())  // Registriere ng2-charts mit den Standard-Registrierungen
  ]
}).catch((err) => console.error(err));
