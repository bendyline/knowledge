---
title: ASP.NET Core Blazor logging
author: guardrex
description: Learn about Blazor app logging, particularly in client-side logging scenarios.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/fundamentals/logging
---
# ASP.NET Core Blazor logging

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


<!--
    NOTE: The console output block quotes in this topic use a double-space 
    at the ends of lines to generate a bare return in block quote output.
-->

This article provides information on logging in Blazor apps, particularly in client-side logging scenarios.

For general ASP.NET Core logging guidance, including how to log from Razor components, see [fundamentals/logging/index](../../fundamentals/logging/index.md).

## Configuration

Logging configuration can be loaded from app settings files. For more information, see [blazor/fundamentals/configuration#logging-configuration](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fconfiguration%23logging-configuration).

At default log levels and without configuring additional logging providers:

* On the server, logging only occurs to the server-side .NET console in the `Development` environment at the [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) level or higher.
* On the client, logging only occurs to the client-side [browser developer tools](https://developer.mozilla.org/docs/Glossary/Developer_Tools) console at the [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) level or higher.

**Applies to: \>= aspnetcore-6.0**

When the app is configured in the project file to use implicit namespaces (`<ImplicitUsings>enable</ImplicitUsings>`), a `using` directive for [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging) or any API in the [Microsoft.Extensions.Logging.LoggerExtensions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerExtensions) class isn't required to support API [Visual Studio IntelliSense](https://learn.microsoft.com/visualstudio/ide/using-intellisense) completions or building apps. If implicit namespaces aren't enabled, Razor components must explicitly define [`@using` directives](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) for logging namespaces that aren't imported via the imports file (`_Imports.razor`).



## Log levels

Log levels conform to ASP.NET Core app log levels, which are listed in the API documentation at [Microsoft.Extensions.Logging.LogLevel](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel).

## Client-side logging

Not every feature of [ASP.NET Core logging](../../fundamentals/logging/index.md) is supported client-side. For example, client-side components don't have access to the client's file system or network, so writing logs to the client's physical or network storage isn't possible. When using a third-party logging service designed to work with single-page apps (SPAs), follow the service's security guidance. Keep in mind that every piece of data, including keys or secrets stored client-side are ***insecure*** and can be easily discovered by malicious users.

**Applies to: < aspnetcore-6.0**

Depending on the framework version and logging features, logging implementations may require adding the namespace for [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging) to the `Program` file:

```csharp
using Microsoft.Extensions.Logging;
```



Configure logging in client-side apps with the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging) property. The [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging) property is of type [Microsoft.Extensions.Logging.ILoggingBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggingBuilder), so the extension methods of [Microsoft.Extensions.Logging.ILoggingBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggingBuilder) are supported.

To set the minimum logging level, call [Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel%252A) on the host builder in the `Program` file with the [Microsoft.Extensions.Logging.LogLevel](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel). The following example sets the minimum log level to [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning):

```csharp
builder.Logging.SetMinimumLevel(LogLevel.Warning);
```

**Applies to: \>= aspnetcore-6.0**

## Log in the client-side `Program` file

Logging is supported in client-side apps after the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder) is built using the framework's internal console logger provider ([`WebAssemblyConsoleLoggerProvider` (reference source)](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly/src/Services/WebAssemblyConsoleLoggerProvider.cs)).

In the `Program` file:

```csharp
var host = builder.Build();

var logger = host.Services.GetRequiredService<ILoggerFactory>()
    .CreateLogger<Program>();

logger.LogInformation("Logged after the app is built in the Program file.");

await host.RunAsync();
```

Developer tools console output:

> info: Program\[0]
> Logged after the app is built in the Program file.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


## Client-side log category

[Log categories](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-category) are supported.

The following example shows how to use log categories with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`) that injects an [Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory) as `LoggerFactory`:

```csharp
var logger = LoggerFactory.CreateLogger("CustomCategory");
logger.LogWarning("Someone has clicked me!");
```

Developer tools console output:

> warn: CustomCategory\[0]
> Someone has clicked me!

## Client-side log event ID

[Log event ID](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-event-id) is supported.

The following example shows how to use log event IDs with the `Counter` component of an app created from a Blazor project template.

`LogEvent.cs`:

```csharp
public class LogEvent
{
    public const int Event1 = 1000;
    public const int Event2 = 1001;
}
```

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
logger.LogInformation(LogEvent.Event1, "Someone has clicked me!");
logger.LogWarning(LogEvent.Event2, "Someone has clicked me!");
```

Developer tools console output:

> info: BlazorSample.Pages.Counter\[1000]
> Someone has clicked me!
> warn: BlazorSample.Pages.Counter\[1001]
> Someone has clicked me!

## Client-side log message template

[Log message templates](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-message-template) are supported:

The following example shows how to use log message templates with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
logger.LogInformation("Someone clicked me at {CurrentDT}!", DateTime.UtcNow);
```

Developer tools console output:

> info: BlazorSample.Pages.Counter\[0]
> Someone clicked me at 04/21/2022 12\:15\:57!

## Client-side log exception parameters

[Log exception parameters](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-exceptions) are supported.

The following example shows how to use log exception parameters with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
currentCount++;

try
{
    if (currentCount == 3)
    {
        currentCount = 4;
        throw new OperationCanceledException("Skip 3");
    }
}
catch (Exception ex)
{
    logger.LogWarning(ex, "Exception (currentCount: {Count})!", currentCount);
}
```

Developer tools console output:

> warn: BlazorSample.Pages.Counter\[0]
> Exception (currentCount: 4)!
> System.OperationCanceledException: Skip 3
> at BlazorSample.Pages.Counter.IncrementCount() in C:\Users\Alaba\Desktop\BlazorSample\Pages\Counter.razor\:line 28

## Client-side filter function

[Filter functions](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23filter-function) are supported.

The following example shows how to use a filter with the `Counter` component of an app created from a Blazor project template.

In the `Program` file:

```csharp
builder.Logging.AddFilter((provider, category, logLevel) =>
    category.Equals("CustomCategory2") && logLevel == LogLevel.Information);
```

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`) that injects an [Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory) as `LoggerFactory`:

```csharp
var logger1 = LoggerFactory.CreateLogger("CustomCategory1");
logger1.LogInformation("Someone has clicked me!");

var logger2 = LoggerFactory.CreateLogger("CustomCategory1");
logger2.LogWarning("Someone has clicked me!");

var logger3 = LoggerFactory.CreateLogger("CustomCategory2");
logger3.LogInformation("Someone has clicked me!");

var logger4 = LoggerFactory.CreateLogger("CustomCategory2");
logger4.LogWarning("Someone has clicked me!");
```

In the developer tools console output, the filter only permits logging for the `CustomCategory2` category and [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) log level message:

> info: CustomCategory2\[0]
> Someone has clicked me!

The app can also configure log filtering for specific namespaces. For example, set the log level to [Microsoft.Extensions.Logging.LogLevel.Trace](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Trace) in the `Program` file:

```csharp
builder.Logging.SetMinimumLevel(LogLevel.Trace);
```

Normally at the [Microsoft.Extensions.Logging.LogLevel.Trace](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Trace) log level, developer tools console output at the **Verbose** level includes [Microsoft.AspNetCore.Components.RenderTree](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderTree) logging messages, such as the following:

> dbug: Microsoft.AspNetCore.Components.RenderTree.Renderer\[3]
> Rendering component 14 of type Microsoft.AspNetCore.Components.Web.HeadOutlet

In the `Program` file, logging messages specific to [Microsoft.AspNetCore.Components.RenderTree](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderTree) can be disabled using ***either*** of the following approaches:

* ```csharp
  builder.Logging.AddFilter("Microsoft.AspNetCore.Components.RenderTree.*", LogLevel.None);
  ```

* ```csharp
  builder.Services.PostConfigure<LoggerFilterOptions>(options =>
      options.Rules.Add(
          new LoggerFilterRule(null, 
                               "Microsoft.AspNetCore.Components.RenderTree.*", 
                               LogLevel.None, 
                               null)
      ));
  ```

After ***either*** of the preceding filters is added to the app, the console output at the **Verbose** level doesn't show logging messages from the [Microsoft.AspNetCore.Components.RenderTree](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderTree) API.



## Client-side custom logger provider

The example in this section demonstrates a custom logger provider for further customization.

Add a package reference to the app for the [`Microsoft.Extensions.Logging.Configuration` package](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Configuration).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Add the following custom logger configuration. The configuration establishes a `LogLevels` dictionary that sets a custom log format for three log levels: [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information), [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning), and [Microsoft.Extensions.Logging.LogLevel.Error](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Error). A `LogFormat` [`enum`](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/enum) is used to describe short (`LogFormat.Short`) and long (`LogFormat.Long`) formats.

`CustomLoggerConfiguration.cs`:

```csharp
using Microsoft.Extensions.Logging;

public class CustomLoggerConfiguration
{
    public int EventId { get; set; }

    public Dictionary<LogLevel, LogFormat> LogLevels { get; set; } = 
        new()
        {
            [LogLevel.Information] = LogFormat.Short,
            [LogLevel.Warning] = LogFormat.Short,
            [LogLevel.Error] = LogFormat.Long
        };

    public enum LogFormat
    {
        Short,
        Long
    }
}
```

Add the following custom logger to the app. The `CustomLogger` outputs custom log formats based on the `logLevel` values defined in the preceding `CustomLoggerConfiguration` configuration.

```csharp
using Microsoft.Extensions.Logging;
using static CustomLoggerConfiguration;

public sealed class CustomLogger : ILogger
{
    private readonly string name;
    private readonly Func<CustomLoggerConfiguration> getCurrentConfig;

    public CustomLogger(
        string name,
        Func<CustomLoggerConfiguration> getCurrentConfig) =>
        (this.name, this.getCurrentConfig) = (name, getCurrentConfig);

    public IDisposable BeginScope<TState>(TState state) => default!;

    public bool IsEnabled(LogLevel logLevel) =>
        getCurrentConfig().LogLevels.ContainsKey(logLevel);

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        CustomLoggerConfiguration config = getCurrentConfig();

        if (config.EventId == 0 || config.EventId == eventId.Id)
        {
            switch (config.LogLevels[logLevel])
            {
                case LogFormat.Short:
                    Console.WriteLine($"{name}: {formatter(state, exception)}");
                    break;
                case LogFormat.Long:
                    Console.WriteLine($"[{eventId.Id, 2}: {logLevel, -12}] {name} - {formatter(state, exception)}");
                    break;
                default:
                    // No-op
                    break;
            }
        }
    }
}
```

Add the following custom logger provider to the app. `CustomLoggerProvider` adopts an [`Options`-based approach](../../fundamentals/configuration/options.md) to configure the logger via built-in logging configuration features. For example, the app can set or change log formats via an `appsettings.json` file without requiring code changes to the custom logger, which is demonstrated at the end of this section.

`CustomLoggerProvider.cs`:

```csharp
using System.Collections.Concurrent;
using Microsoft.Extensions.Options;

[ProviderAlias("CustomLog")]
public sealed class CustomLoggerProvider : ILoggerProvider
{
    private readonly IDisposable onChangeToken;
    private CustomLoggerConfiguration config;
    private readonly ConcurrentDictionary<string, CustomLogger> loggers =
        new(StringComparer.OrdinalIgnoreCase);

    public CustomLoggerProvider(
        IOptionsMonitor<CustomLoggerConfiguration> config)
    {
        this.config = config.CurrentValue;
        onChangeToken = config.OnChange(updatedConfig => this.config = updatedConfig);
    }

    public ILogger CreateLogger(string categoryName) =>
        loggers.GetOrAdd(categoryName, name => new CustomLogger(name, GetCurrentConfig));

    private CustomLoggerConfiguration GetCurrentConfig() => config;

    public void Dispose()
    {
        loggers.Clear();
        onChangeToken.Dispose();
    }
}
```

Add the following custom logger extensions.

`CustomLoggerExtensions.cs`:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Configuration;

public static class CustomLoggerExtensions
{
    public static ILoggingBuilder AddCustomLogger(
        this ILoggingBuilder builder)
    {
        builder.AddConfiguration();

        builder.Services.TryAddEnumerable(
            ServiceDescriptor.Singleton<ILoggerProvider, CustomLoggerProvider>());

        LoggerProviderOptions.RegisterProviderOptions
            <CustomLoggerConfiguration, CustomLoggerProvider>(builder.Services);

        return builder;
    }
}
```

In the `Program` file on the host builder, clear the existing provider by calling [Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders%252A) and add the custom logging provider:

```csharp
builder.Logging.ClearProviders().AddCustomLogger();
```

In the following `CustomLoggerExample` component:

* The debug message isn't logged.
* The information message is logged in the short format (`LogFormat.Short`).
* The warning message is logged in the short format (`LogFormat.Short`).
* The error message is logged in the long format  (`LogFormat.Long`).
* The trace message isn't logged.

`CustomLoggerExample.razor`:

**Applies to: \>= aspnetcore-8.0**

```razor
@page "/custom-logger-example"
@inject ILogger<CustomLoggerExample> Logger

<p>
    <button @onclick="LogMessages">Log Messages</button>
</p>

@code{
    private void LogMessages()
    {
        Logger.LogDebug(1, "This is a debug message.");
        Logger.LogInformation(3, "This is an information message.");
        Logger.LogWarning(5, "This is a warning message.");
        Logger.LogError(7, "This is an error message.");
        Logger.LogTrace(5!, "This is a trace message.");
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
@page "/custom-logger-example"
@using Microsoft.Extensions.Logging
@inject ILogger<CustomLoggerExample> Logger

<p>
    <button @onclick="LogMessages">Log Messages</button>
</p>

@code{
    private void LogMessages()
    {
        Logger.LogDebug(1, "This is a debug message.");
        Logger.LogInformation(3, "This is an information message.");
        Logger.LogWarning(5, "This is a warning message.");
        Logger.LogError(7, "This is an error message.");
        Logger.LogTrace(5!, "This is a trace message.");
    }
}
```



The following output is seen in the browser's developer tools console when the **`Log Messages`** button is selected. The log entries reflect the appropriate formats applied by the custom logger (the client app is named `LoggingTest`):

> LoggingTest.Pages.CustomLoggerExample: This is an information message.
> LoggingTest.Pages.CustomLoggerExample: This is a warning message.
> \[ 7: Error       ] LoggingTest.Pages.CustomLoggerExample - This is an error message.

From a casual inspection of the preceding example, it's apparent that setting the log line formats via the dictionary in `CustomLoggerConfiguration` isn't strictly necessary. The line formats applied by the custom logger (`CustomLogger`) could have been applied by merely checking the `logLevel` in the `Log` method. The purpose of assigning the log format via configuration is that the developer can change the log format easily via app configuration, as the following example demonstrates.

In the client-side app, add or update the `appsettings.json` file to include logging configuration. Set the log format to `Long` for all three log levels:

```json
{
  "Logging": {
    "CustomLog": {
      "LogLevels": {
        "Information": "Long",
        "Warning": "Long",
        "Error": "Long"
      }
    }
  }
}
```

In the preceding example, notice that the entry for the custom logger configuration is `CustomLog`, which was applied to the custom logger provider (`CustomLoggerProvider`) as an alias with `[ProviderAlias("CustomLog")]`. The logging configuration could have been applied with the name `CustomLoggerProvider` instead of `CustomLog`, but use of the alias `CustomLog` is more user friendly.

In the `Program` file, consume the logging configuration. Add the following code:

```csharp
builder.Logging.AddConfiguration(
    builder.Configuration.GetSection("Logging"));
```

The call to [Microsoft.Extensions.Logging.Configuration.LoggingBuilderConfigurationExtensions.AddConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Configuration.LoggingBuilderConfigurationExtensions.AddConfiguration%252A) can be placed either before or after adding the custom logger provider.

Run the app again. Select the **`Log Messages`** button. Notice that the logging configuration is applied from the `appsettings.json` file. All three log entries are in the long (`LogFormat.Long`) format (the client app is named `LoggingTest`):

> \[ 3: Information ] LoggingTest.Pages.CustomLoggerExample - This is an information message.
> \[ 5: Warning     ] LoggingTest.Pages.CustomLoggerExample - This is a warning message.
> \[ 7: Error       ] LoggingTest.Pages.CustomLoggerExample - This is an error message.

**Applies to: \>= aspnetcore-6.0**

## Client-side log scopes

The developer tools console logger doesn't support [log scopes](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23log-scopes). However, a [custom logger](#client-side-custom-logger-provider) can support log scopes. For an unsupported example that you can further develop to suit your needs, see the `BlazorWebAssemblyScopesLogger` sample app in the [Blazor samples GitHub repository](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps)).

The sample app uses standard ASP.NET Core [Microsoft.Extensions.Logging.LoggerExtensions.BeginScope%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerExtensions.BeginScope%252A) logging syntax to indicate scopes for logged messages. The `Logger` service in the following example is an `ILogger<CustomLoggerExample>`, which is injected into the app's `CustomLoggerExample` component (`CustomLoggerExample.razor`).

```csharp
using (Logger.BeginScope("L1"))
{
    Logger.LogInformation(3, "INFO: ONE scope.");
}

using (Logger.BeginScope("L1"))
{
    using (Logger.BeginScope("L2"))
    {
        Logger.LogInformation(3, "INFO: TWO scopes.");
    }
}

using (Logger.BeginScope("L1"))
{
    using (Logger.BeginScope("L2"))
    {
        using (Logger.BeginScope("L3"))
        {
            Logger.LogInformation(3, "INFO: THREE scopes.");
        }
    }
}
```

Output:

> \[ 3: Information ] {CLASS} - INFO: ONE scope. => L1 blazor.webassembly.js\:1:35542
> \[ 3: Information ] {CLASS} - INFO: TWO scopes. => L1 => L2 blazor.webassembly.js\:1:35542
> \[ 3: Information ] {CLASS} - INFO: THREE scopes. => L1 => L2 => L3

The `{CLASS}` placeholder in the preceding example is `BlazorWebAssemblyScopesLogger.Pages.CustomLoggerExample`.



## Prerendered component logging

Prerendered components execute [component initialization code twice](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync). Logging takes place server-side on the first execution of initialization code and client-side on the second execution of initialization code. Depending on the goal of logging during initialization, check logs server-side, client-side, or both.

## SignalR client logging with the SignalR client builder

*This section applies to server-side apps.*

In Blazor script start configuration, pass in the `configureSignalR` configuration object that calls `configureLogging` with the log level.

For the `configureLogging` log level value, pass the argument as either the string or integer log level shown in the following table.

| [Microsoft.Extensions.Logging.LogLevel](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel) | String setting | Integer setting |
| --- | :---: | :---: |
| [Microsoft.Extensions.Logging.LogLevel.Trace](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Trace) | `trace` | 0 |
| [Microsoft.Extensions.Logging.LogLevel.Debug](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Debug) | `debug` | 1 |
| [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) | `information` | 2 |
| [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning) | `warning` | 3 |
| [Microsoft.Extensions.Logging.LogLevel.Error](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Error) | `error` | 4 |
| [Microsoft.Extensions.Logging.LogLevel.Critical](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Critical) | `critical` | 5 |
| [Microsoft.Extensions.Logging.LogLevel.None](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.None) | `none` | 6 |

Example 1: Set the [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) log level with a string value.

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.configureLogging("information");
      }
    }
  });
</script>
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:



**Applies to: < aspnetcore-11.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      builder.configureLogging("information");
    }
  });
</script>
```



**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

Example 2: Set the [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) log level with an integer value.

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.configureLogging(2); // LogLevel.Information
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:



**Applies to: < aspnetcore-11.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      builder.configureLogging(2); // LogLevel.Information
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



> **Note:**
> Using an integer to specify the logging level in Example 2, often referred to as a *magic number* or *magic constant*, is considered a poor coding practice because the integer doesn't clearly identify the logging level when viewing the source code. If minimizing the bytes transferred to the browser is a priority, using an integer might be justified (consider removing the comment in such cases).

For more information on Blazor startup (`Blazor.start()`), see [blazor/fundamentals/startup](startup.md).

## SignalR client logging with app configuration

Set up app settings configuration as described in [blazor/fundamentals/configuration#logging-configuration](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fconfiguration%23logging-configuration). Place app settings files in `wwwroot` that contain a `Logging:LogLevel:HubConnection` app setting.

> **Note:**
> As an alternative to using app settings, you can pass the [Microsoft.Extensions.Logging.LogLevel](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel) as the argument to [Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel%252A) when the hub connection is created in a Razor component. However, accidentally deploying the app to a production hosting environment with verbose logging may result in a performance penalty. We recommend using app settings to set the log level.

Provide a `Logging:LogLevel:HubConnection` app setting in the default `appsettings.json` file and in the `Development` environment app settings file. Use a typical less-verbose log level for the default, such as [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning). The default app settings value is what is used in `Staging` and `Production` environments if no app settings files for those environments are present. Use a verbose log level in the `Development` environment app settings file, such as [Microsoft.Extensions.Logging.LogLevel.Trace](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Trace).

`wwwroot/appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "HubConnection": "Warning"
    }
  }
}
```

`wwwroot/appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "HubConnection": "Trace"
    }
  }
}
```

> **Important:**
> Configuration in the preceding app settings files is only used by the app if the guidance in [blazor/fundamentals/configuration#logging-configuration](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fconfiguration%23logging-configuration) is followed.

At the top of the Razor component file (`.razor`):

* Inject an [Microsoft.Extensions.Logging.ILoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider) to add a `WebAssemblyConsoleLogger` to the logging providers passed to [Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder). Unlike a [Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider), `WebAssemblyConsoleLogger` is a wrapper around browser-specific logging APIs (for example, `console.log`). Use of `WebAssemblyConsoleLogger` makes logging possible within Mono inside a browser context.
* Inject an `IConfiguration` to read the `Logging:LogLevel:HubConnection` app setting.

> **Note:**
> `WebAssemblyConsoleLogger` is [internal](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/internal) and not supported for direct use in developer code.

```csharp
@inject ILoggerProvider LoggerProvider
@inject IConfiguration Config
```

> **Note:**
> The following example is based on the demonstration in the [SignalR with Blazor tutorial](../tutorials/signalr-blazor.md). Consult the tutorial for further details.

In the component's [`OnInitializedAsync` method](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync), use [Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.ConfigureLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.ConfigureLogging%252A) to add the logging provider and set the minimum log level from configuration:

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .ConfigureLogging(builder => 
        {
            builder.AddProvider(LoggerProvider);
            builder.SetMinimumLevel(
                Config.GetValue<LogLevel>("Logging:LogLevel:HubConnection"));
        })
        .Build();

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```

> **Note:**
> In the preceding example, `Navigation` is an injected [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager).

For more information on setting the app's environment, see [blazor/fundamentals/environments](environments.md).

**Applies to: \>= aspnetcore-7.0**

## Client-side authentication logging

Log Blazor authentication messages at the [Microsoft.Extensions.Logging.LogLevel.Debug](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Debug) or [Microsoft.Extensions.Logging.LogLevel.Trace](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Trace) logging levels with a logging configuration in app settings or by using a log filter for [Microsoft.AspNetCore.Components.WebAssembly.Authentication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication) in the `Program` file.

Use ***either*** of the following approaches:

* In an app settings file (for example, `wwwroot/appsettings.Development.json`):

  ```json
  "Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore.Components.WebAssembly.Authentication": "Debug"
    }
  }
  ```

  For more information on how to configure a client-side app to read app settings files, see [blazor/fundamentals/configuration#logging-configuration](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fconfiguration%23logging-configuration).

* Using a log filter, the following example:

  * Activates logging for the `Debug` build configuration using a [C# preprocessor directive](https://learn.microsoft.com/dotnet/csharp/language-reference/preprocessor-directives).
  * Logs Blazor authentication messages at the [Microsoft.Extensions.Logging.LogLevel.Debug](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Debug) log level.

  ```csharp
  #if DEBUG
      builder.Logging.AddFilter(
          "Microsoft.AspNetCore.Components.WebAssembly.Authentication", 
          LogLevel.Debug);
  #endif
  ```

> **Note:**
> Razor components rendered on the client only log to the client-side [browser developer tools](https://developer.mozilla.org/docs/Glossary/Developer_Tools) console.



## Additional resources

* [fundamentals/logging/index](../../fundamentals/logging/index.md)
* [`Loglevel` Enum (API documentation)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel)
* [Implement a custom logging provider in .NET](https://learn.microsoft.com/dotnet/core/extensions/custom-logging-provider)
* Browser developer tools documentation:
  * [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
  * [Microsoft Edge Developer Tools overview](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
