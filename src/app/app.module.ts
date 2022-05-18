import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampsiteEntriesAdminPageComponent } from './campsite/admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { CampsiteModule } from './campsite/core/campsite.module';
import { LocalStorageDataProvider } from './campsite/core/providers/LocalStorageDataProvider';
import { LandingPageComponent } from './campsite/example/pages/landing-page/landing-page.component';
import { LandingPageModule } from './campsite/example/pages/landing-page/landing-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CampsiteModule.initialise({
      dataProvider: new LocalStorageDataProvider(),
      pageModules: [
        LandingPageModule
      ],
      adminExtensions: [
        {
          id: 'entries',
          label: 'Entries',
          component: CampsiteEntriesAdminPageComponent
        },
        {
          id: 'routing',
          label: 'Routing',
          component: CampsiteEntriesAdminPageComponent
        },
        {
          id: 'globals',
          label: 'Globals'
        },
        {
          id: 'utilities',
          label: 'Utilities',
          alerts: 5
        },
        {
          id: 'settings',
          label: 'Settings'
        },
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
