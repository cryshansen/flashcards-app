import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {routes } from './app/app.routes';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
  import { provideAnimations } from '@angular/platform-browser/animations'; // Eagerly loaded
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),   // <-- add this here
    { provide: RECAPTCHA_V3_SITE_KEY,useValue: '6Ldfy5MrAAAAAEjCmYXfbtCc1wqb05vJ-5-yEUKm' },
    ReCaptchaV3Service,
    provideAnimations(),
    
  ]
})
.catch((err) => console.error(err));
