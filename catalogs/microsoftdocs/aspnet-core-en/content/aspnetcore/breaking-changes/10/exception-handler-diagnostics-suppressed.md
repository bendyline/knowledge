---
title: "Breaking change: Exception diagnostics are suppressed when IExceptionHandler.TryHandleAsync returns true"
description: Learn about the breaking change in ASP.NET Core 10 where exception diagnostics are no longer recorded when IExceptionHandler.TryHandleAsync returns true.
ms.date: 08/08/2025
ms.custom: https://github.com/aspnet/Announcements/issues/524
---

# Exception diagnostics are suppressed when IExceptionHandler.TryHandleAsync returns true

The ASP.NET Core exception handler middleware no longer records diagnostics for exceptions handled by [Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler) by default.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, the exception handler middleware recorded diagnostics about exceptions handled by [Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler).

The exception diagnostics are:

- Logging `UnhandledException` to [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger).
- Writing the `Microsoft.AspNetCore.Diagnostics.HandledException` event to [Microsoft.Extensions.Logging.EventSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.EventSource).
- Adding the `error.type` tag to the `http.server.request.duration` metric.

## New behavior

Starting in .NET 10, if [Microsoft.AspNetCore.Diagnostics.IExceptionHandler.TryHandleAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler.TryHandleAsync%252A) returns `true`, then exception diagnostics are no longer recorded by default.

## Type of breaking change

This change is a [behavioral change](https://learn.microsoft.com/dotnet/core/compatibility/categories#behavioral-change).

## Reason for change

ASP.NET Core users have given feedback that the previous behavior was undesirable. Their [Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler) implementation reported that the exception was handled, but the error handling middleware still recorded the error in the app's telemetry.

ASP.NET Core now follows the behavior expected by users by suppressing diagnostics when [Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler) handles the exception. Configuration options are also available to customize exception diagnostics behavior if needed.

## Recommended action

If you want handled exceptions to continue to record telemetry, you can use the new `ExceptionHandlerOptions.SuppressDiagnosticsCallback` option:

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    SuppressDiagnosticsCallback = context => false;
});
```

The `context` passed to the callback includes information about the exception, the request, and whether the exception was handled. The callback returns `false` to indicate that diagnostics shouldn't be suppressed, thus restoring the previous behavior.

## Affected APIs

- [Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)
- [Microsoft.AspNetCore.Diagnostics.IExceptionHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Diagnostics.IExceptionHandler)
