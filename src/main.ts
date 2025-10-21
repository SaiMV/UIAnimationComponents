// FinchesEye Animation Library - StackBlitz Demo
// This file initializes the demo application

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// Initialize the demo when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // The demo UI is handled by the JavaScript in demo-ui/app.js
  // This Angular app serves as the container
  console.log('FinchesEye Animation Library Demo loaded');
});

// Bootstrap Angular (if needed for future Angular components)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Error bootstrapping Angular:', err));