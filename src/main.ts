import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base'; 


if (environment.production) {
  enableProdMode();
}
//syncfusion key
registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VhW35bc3BWQ2VVVEQ=')

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
