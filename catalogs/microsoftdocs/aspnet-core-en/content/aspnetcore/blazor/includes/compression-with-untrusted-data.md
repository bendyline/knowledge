**Applies to: \>= aspnetcore-9.0**

> **Warning:**
> With compression, which is enabled by default, avoid creating secure (authenticated/authorized) interactive server-side components that render data from untrusted sources. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services). For more information, see [blazor/fundamentals/signalr#websocket-compression-for-interactive-server-components](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23websocket-compression-for-interactive-server-components) and [blazor/security/interactive-server-side-rendering](../security/interactive-server-side-rendering.md).
