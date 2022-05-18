import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteAdminModule } from '../admin/campsite-admin.module';
import { CampsiteDataProvider } from './definitions/CampsiteDataProvider';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { IAdminItem } from '../admin/definitions/IAdminItem';


@NgModule({
  imports: [
    CampsiteAdminModule
  ]
})
export class CampsiteModule {
  public static dataProvider: CampsiteDataProvider;
  public static adminExtensions: IAdminItem[];

  static initialise(options?: CampsiteConfig): ModuleWithProviders<CampsiteModule> {
    CampsiteModule.dataProvider = options?.dataProvider as any;
    CampsiteModule.adminExtensions = options?.adminExtensions as any;

    return {
      ngModule: CampsiteModule,

      providers: [
        CampsiteGuard,
        CampsiteSimpleGuard,
        CampsiteService,
        {
          provide: APP_INITIALIZER,
          useFactory: initCampsite,
          deps: [CampsiteService],
          multi: true,
        }
      ]
    };
  }
}

export function initCampsite(campsite: CampsiteService) {
  return () => campsite.initialise();
}
