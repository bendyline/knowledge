---
title: Troubleshoot ASP.NET Core Blazor Hybrid
author: guardrex
description: Learn how to troubleshoot issues in ASP.NET Core Blazor Hybrid with BlazorWebView logging.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/troubleshoot
---
# Troubleshoot ASP.NET Core Blazor Hybrid

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


[Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) has built-in logging that can help you diagnose problems in your Blazor Hybrid app.

This article explains the steps to use [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) logging:

* Enable [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) and related components to log diagnostic information.
* Configure logging providers.
* View logger output.

## Enable `BlazorWebView` logging

Enable logging configuration during service registration. To enable maximum logging for [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) and related components under the [Microsoft.AspNetCore.Components.WebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView) namespace, add the following code in the `Program` file:

```csharp
services.AddLogging(logging =>
{
    logging.AddFilter("Microsoft.AspNetCore.Components.WebView", LogLevel.Trace);
});
```

Alternatively, use the following code to enable maximum logging for every component that uses [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging):

```csharp
services.AddLogging(logging =>
{
    logging.SetMinimumLevel(LogLevel.Trace);
});
```

## Configure logging providers

After configuring components to write log information, configure where the loggers should write log information.

The **Debug** logging providers write the output [using `Debug` statements](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23debug).

To configure the **Debug** logging provider, add a reference to the [`Microsoft.Extensions.Logging.Debug`](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Debug) NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Register the provider inside the call to [Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging%252A) added in the previous step by calling the [Microsoft.Extensions.Logging.DebugLoggerFactoryExtensions.AddDebug%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.DebugLoggerFactoryExtensions.AddDebug%252A) extension method:

```csharp
services.AddLogging(logging =>
{
    logging.AddFilter("Microsoft.AspNetCore.Components.WebView", LogLevel.Trace);
    logging.AddDebug();
});
```

## View logger output

When the app is run from Visual Studio with debugging enabled, the debug output appears in Visual Studio's **Output** window.

## Additional resources

* [Logging in C# and .NET](https://learn.microsoft.com/dotnet/core/extensions/logging)
* [fundamentals/logging/index#debug](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23debug)
