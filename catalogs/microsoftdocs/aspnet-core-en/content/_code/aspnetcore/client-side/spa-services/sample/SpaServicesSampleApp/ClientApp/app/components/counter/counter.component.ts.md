# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/components/counter/counter.component.ts

Complete source file; linked examples may select a region or line range.

```
import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}

```
