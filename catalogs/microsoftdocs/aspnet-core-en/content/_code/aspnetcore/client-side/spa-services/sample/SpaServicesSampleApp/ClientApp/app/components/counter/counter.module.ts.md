# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/components/counter/counter.module.ts

Complete source file; linked examples may select a region or line range.

```
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CounterComponent }])
    ],
    exports: [RouterModule],
    declarations: [CounterComponent]
})

export class CounterModule { }
```
