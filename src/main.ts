import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeVi);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
