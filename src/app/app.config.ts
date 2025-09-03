import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// Importações do Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';  

import { environment } from '../environments/environment'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
    }),

 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Fornece o serviço de autenticação
    provideAuth(() => getAuth()),

    // Fornece o serviço Firestore
    provideFirestore(() => getFirestore()),

    // Fornece o Realtime Database
    provideDatabase(() => getDatabase()),

    // Fornece Functions
    provideFunctions(() => getFunctions()),

    // Fornece Messaging
    provideMessaging(() => getMessaging()),

    // Fornece Performance Monitoring
    providePerformance(() => getPerformance()),

    // Fornece Storage
    provideStorage(() => getStorage()),

    // Fornece Remote Config
    provideRemoteConfig(() => getRemoteConfig()),
  ]
};
