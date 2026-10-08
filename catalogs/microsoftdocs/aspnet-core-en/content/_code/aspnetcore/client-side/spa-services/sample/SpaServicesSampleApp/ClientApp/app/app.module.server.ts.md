# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/app.module.server.ts

Complete source file; linked examples may select a region or line range.

```
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ]
})
export class AppModule {
}

```
