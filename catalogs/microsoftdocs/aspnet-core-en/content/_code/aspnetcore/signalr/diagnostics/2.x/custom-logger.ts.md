# Source code: aspnetcore/signalr/diagnostics/2.x/custom-logger.ts

Complete source file; linked examples may select a region or line range.

```
import { ILogger, LogLevel, HubConnectionBuilder } from "@aspnet/signalr";

export class MyLogger implements ILogger {
    log(logLevel: LogLevel, message: string) {
        // Use `message` and `logLevel` to record the log message to your own system
    }
}

// later on, when configuring your connection...

let connection = new HubConnectionBuilder()
    .withUrl("/my/hub/url")
    .configureLogging(new MyLogger())
    .build();
```
