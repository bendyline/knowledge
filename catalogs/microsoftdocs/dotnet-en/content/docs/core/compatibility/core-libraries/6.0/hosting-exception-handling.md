---
title: ".NET 6 breaking change: Exception handling in hosting"
description: Learn about the .NET 6 breaking change in core .NET libraries where unhandled exceptions from a BackgroundService are logged instead of lost.
ms.date: 05/06/2022
---
# Unhandled exceptions from a BackgroundService

In previous versions, when a [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) throws an unhandled exception, the exception is lost and the service appears unresponsive. .NET 6 fixes this behavior by logging the exception and stopping the host.

## Change description

In previous .NET versions, when an exception is thrown from a [Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)) override, the exception is lost and the service appears unresponsive. The host continues to run, and no message is logged.

Starting in .NET 6, when an exception is thrown from a [Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)) override, the exception is logged to the current [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger). By default, the host is stopped when an unhandled exception is encountered.

## Version introduced

.NET 6

## Reason for change

The new behavior is consistent with the way other app models behave when unhandled exceptions are encountered. It's also confusing to developers when their [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) encounters an error, but nothing is logged. The best default behavior is to stop the host, because unhandled exceptions shouldn't be ignored. They indicate a problem that needs attention.

## Recommended action

If you prefer to keep the previous behavior of allowing an unhandled exception in a [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) to not stop the Host, you can set [Microsoft.Extensions.Hosting.HostOptions.BackgroundServiceExceptionBehavior](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostOptions.BackgroundServiceExceptionBehavior) to [Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior.Ignore](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior.Ignore).

```csharp
Host.CreateBuilder(args)
    .ConfigureServices(services =>
    {
        services.Configure<HostOptions>(hostOptions =>
        {
            hostOptions.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
        });
    });
```

## Affected APIs

- [Microsoft.Extensions.Hosting.IHost.StartAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StartAsync(System.Threading.CancellationToken))
- [Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken))

<!--

### Category

- Core .NET libraries

### Affected APIs

- `M:Microsoft.Extensions.Hosting.IHost.StartAsync(System.Threading.CancellationToken)`
- `M:Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)`

-->
