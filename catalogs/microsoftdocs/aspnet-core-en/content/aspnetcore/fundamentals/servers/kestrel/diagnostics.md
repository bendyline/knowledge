---
title: Logging and diagnostics in Kestrel
author: shirhatti
description: Learn how to gather diagnostics from Kestrel.
monikerRange: '>= aspnetcore-6.0'
ms.author: tdykstra
ms.date: 01/26/2023
uid: fundamentals/servers/kestrel/diagnostics
---

# Diagnostics in Kestrel

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


By [Sourabh Shirhatti](https://twitter.com/sshirhatti)

This article provides guidance for gathering diagnostics from Kestrel to help troubleshoot issues. Topics covered include:

* **Logging**: Structured logs written to [.NET logging](../../logging/index.md). [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) is used by app frameworks to write logs, and by users for their own logging in an app.
* **Metrics**: Representation of data measures over intervals of time, for example, requests per second. Metrics are emitted using `EventCounter` and can be observed using the [dotnet-counters](https://learn.microsoft.com/dotnet/core/diagnostics/dotnet-counters) command line tool or with [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/eventcounters).
* **DiagnosticSource**: `DiagnosticSource` is a mechanism for production-time logging with rich data payloads for consumption within the process. Unlike logging, which assumes data will leave the process and expects serializable data, `DiagnosticSource` works well with complex data.

## Logging

Like most components in ASP.NET Core, Kestrel uses `Microsoft.Extensions.Logging` to emit log information. Kestrel employs the use of multiple [categories](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-category) which allows you to be selective on which logs you listen to.

| Logging Category Name | Logging Events |
| --- | --- |
| `Microsoft.AspNetCore.Server.Kestrel` | `ApplicationError`, `ConnectionHeadResponseBodyWrite`, `ApplicationNeverCompleted`, `RequestBodyStart`, `RequestBodyDone`, `RequestBodyNotEntirelyRead`, `RequestBodyDrainTimedOut`, `ResponseMinimumDataRateNotSatisfied`, `InvalidResponseHeaderRemoved`, `HeartbeatSlow` |
| `Microsoft.AspNetCore.Server.Kestrel.BadRequests` | `ConnectionBadRequest`, `RequestProcessingError`, `RequestBodyMinimumDataRateNotSatisfied` |
| `Microsoft.AspNetCore.Server.Kestrel.Connections` | `ConnectionAccepted`, `ConnectionStart`, `ConnectionStop`, `ConnectionPause`, `ConnectionResume`, `ConnectionKeepAlive`, `ConnectionRejected`, `ConnectionDisconnect`, `NotAllConnectionsClosedGracefully`, `NotAllConnectionsAborted`, `ApplicationAbortedConnection` |
| `Microsoft.AspNetCore.Server.Kestrel.Http2` | `Http2ConnectionError`, `Http2ConnectionClosing`, `Http2ConnectionClosed`, `Http2StreamError`, `Http2StreamResetAbort`, `HPackDecodingError`, `HPackEncodingError`, `Http2FrameReceived`, `Http2FrameSending`, `Http2MaxConcurrentStreamsReached` |
| `Microsoft.AspNetCore.Server.Kestrel.Http3` | `Http3ConnectionError`, `Http3ConnectionClosing`, `Http3ConnectionClosed`, `Http3StreamAbort`, `Http3FrameReceived`, `Http3FrameSending` |

### Connection logging

Kestrel also supports the ability to emit `Debug` level logs for byte-level communication and can be enabled on a per-endpoint basis. To enable connection logging, see [configure endpoints for Kestrel](endpoints.md)

## Metrics

Metrics is a representation of data measures over intervals of time, for example, requests per second. Metrics data allows observation of the state of an app at a high-level. Kestrel metrics are emitted using `EventCounter`.

> **Note:**
> The `connections-per-second` and `tls-handshakes-per-second` counters are named incorrectly. The counters:
> * Do ***not*** always contain the number of new connections or TLS handshakes per second
> * Display the number of new connection or TLS handshakes in the last update interval as requested as the consumer of Events via the `EventCounterIntervalSec` argument in the `filterPayload` to `KestrelEventSource`.
>
> We **recommend** consumers of these counters scale the metric value based on the `DisplayRateTimeScale` of one second.

| Name | Display Name | Description |
| --- | --- | --- |
| `connections-per-second` | Connection Rate | The number of new incoming connections per update interval |
| `total-connections` | Total Connections | The total number of connections |
| `tls-handshakes-per-second` | TLS Handshake Rate | The number of new TLS handshakes per update interval |
| `total-tls-handshakes` | Total TLS Handshakes | The total number of TLS handshakes |
| `current-tls-handshakes` | Current TLS Handshakes | The number of TLS handshakes in process |
| `failed-tls-handshakes` | Failed TLS Handshakes | The total number of failed TLS handshakes |
| `current-connections` | Current Connections | The total number of connections, including idle connections |
| `connection-queue-length` | Connection Queue Length | The total number connections queued to the thread pool. In a healthy system at steady state, this number should always be close to zero |
| `request-queue-length` | Request Queue Length | The total number requests queued to the thread pool. In a healthy system at steady state, this number should always be close to zero. This metric is unlike the IIS/Http.Sys request queue and cannot be compared |
| `current-upgraded-requests` | Current Upgraded Requests (WebSockets) | The number of active WebSocket requests |

## DiagnosticSource

Kestrel emits a `DiagnosticSource` event for HTTP requests rejected at server layer such as malformed requests and protocols violations. As such, these requests never make it into the hosting layer of ASP.NET Core.

Kestrel emits these events with the `Microsoft.AspNetCore.Server.Kestrel.BadRequest` event name and an `IFeatureCollection` as the object payload. The underlying exception can be retrieved by accessing the `IBadRequestExceptionFeature` on the feature collection.

Resolving these events is a two-step process. An observer for `DiagnosticListener` must be created:

```csharp
class BadRequestEventListener : IObserver<KeyValuePair<string, object>>, IDisposable
{
    private readonly IDisposable _subscription;
    private readonly Action<IBadRequestExceptionFeature> _callback;

    public BadRequestEventListener(DiagnosticListener diagnosticListener, Action<IBadRequestExceptionFeature> callback)
    {
        _subscription = diagnosticListener.Subscribe(this!, IsEnabled);
        _callback = callback;
    }
    private static readonly Predicate<string> IsEnabled = (provider) => provider switch
    {
        "Microsoft.AspNetCore.Server.Kestrel.BadRequest" => true,
        _ => false
    };
    public void OnNext(KeyValuePair<string, object> pair)
    {
        if (pair.Value is IFeatureCollection featureCollection)
        {
            var badRequestFeature = featureCollection.Get<IBadRequestExceptionFeature>();

            if (badRequestFeature is not null)
            {
                _callback(badRequestFeature);
            }
        }
    }
    public void OnError(Exception error) { }
    public void OnCompleted() { }
    public virtual void Dispose() => _subscription.Dispose();
}
```

Subscribe to the ASP.NET Core `DiagnosticListener` with the observer. In this example, we create a callback that logs the underlying exception.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var diagnosticSource = app.Services.GetRequiredService<DiagnosticListener>();
using var badRequestListener = new BadRequestEventListener(diagnosticSource, (badRequestExceptionFeature) =>
{
    app.Logger.LogError(badRequestExceptionFeature.Error, "Bad request received");
});
app.MapGet("/", () => "Hello world");
app.Run();
```

## Behavior with debugger attached

Certain timeouts and rate limits aren't enforced when a debugger is attached to a Kestrel process. For more information, see [Behavior with debugger attached](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Foptions%23behavior-with-debugger-attached).
