# Source code: aspnetcore/signalr/diagnostics/logging-config-js.js

Complete source file; linked examples may select a region or line range.

```
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/my/hub/url")
    .configureLogging(signalR.LogLevel.Debug)
    .build();
```
