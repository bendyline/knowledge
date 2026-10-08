---
title: Implement a custom logging provider
description: Discover how to implement a custom logging provider with colorized logs, writing custom C# ILogger and ILoggerProvider implementations.
ms.date: 02/04/2026
ms.topic: how-to
---

# Implement a custom logging provider in .NET

There are many [logging providers](providers.md) available for common logging needs. But you might need to implement a custom [Microsoft.Extensions.Logging.ILoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider) when one of the available providers doesn't suit your application needs. In this article, you learn how to implement a custom logging provider that can be used to colorize logs in the console.

> **Tip:**
> The custom logging provider example source code is available in the [docs GitHub repo](https://github.com/dotnet/docs/tree/main/docs/core/extensions/snippets/configuration/console-custom-logging).

## Sample custom logger configuration

The sample logger creates different color console entries per log level and event ID using the following configuration type:

[language="csharp" source="../snippets/configuration/console-custom-logging/ColorConsoleLoggerConfiguration.cs"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/ColorConsoleLoggerConfiguration.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/ColorConsoleLoggerConfiguration.cs.md)

The preceding code sets the default color for the `Information` level to `Green`. The `EventId` is implicitly 0.

## Create the custom logger

The following code snippet shows the `ILogger` implementation:

[language="csharp" source="../snippets/configuration/console-custom-logging/ColorConsoleLogger.cs"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/ColorConsoleLogger.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/ColorConsoleLogger.cs.md)

Each logger instance is instantiated by passing a category name, which is typically the type where the logger is created. The `IsEnabled` method checks `getCurrentConfig().LogLevelToColorMap.ContainsKey(logLevel)` to see if the requested log level is enabled (that is, in the configuration's dictionary of log levels).

It's a good practice to call [Microsoft.Extensions.Logging.ILogger.IsEnabled*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger.IsEnabled*) within [Microsoft.Extensions.Logging.ILogger.Log*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger.Log*) implementations since `Log` can be called by any consumer, and there are no guarantees that it was previously checked. The `IsEnabled` method should be very fast in most implementations.

[language="csharp" source="../snippets/configuration/console-custom-logging/ColorConsoleLogger.cs" range="20-23"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/ColorConsoleLogger.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/ColorConsoleLogger.cs.md)

The logger is instantiated with the `name` and a `Func<ColorConsoleLoggerConfiguration>` that returns the current configuration.

> **Important:**
> The [Microsoft.Extensions.Logging.ILogger.Log*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger.Log*) implementation checks if the `config.EventId` value is set. When `config.EventId` is not set or when it matches the exact `logEntry.EventId`, the logger logs in color.

## Custom logger provider

The `ILoggerProvider` object is responsible for creating logger instances. It's not necessary to create a logger instance per category, but it makes sense for some loggers, like NLog or log4net. This strategy allows you to choose different logging output targets per category, as in the following example:

[language="csharp" source="../snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs.md)

In the preceding code, [Microsoft.Extensions.Logging.ILoggerProvider.CreateLogger(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider.CreateLogger(System.String)) creates a single instance of the `ColorConsoleLogger` per category name and stores it in the [`ConcurrentDictionary<TKey,TValue>`](https://learn.microsoft.com/dotnet/api/system.collections.concurrent.concurrentdictionary-2).

The `ColorConsoleLoggerProvider` class is decorated with two attributes:

[language="csharp" source="../snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs" range="6-8"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/ColorConsoleLoggerProvider.cs.md)

- [System.Runtime.Versioning.UnsupportedOSPlatformAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Versioning.UnsupportedOSPlatformAttribute): The `ColorConsoleLogger` type is _not supported_ in the `"browser"`.
- [Microsoft.Extensions.Logging.ProviderAliasAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ProviderAliasAttribute): Configuration sections can define options using the `"ColorConsole"` key.

The configuration can be specified with any valid [configuration provider](../configuration-providers.md). Consider the following _appsettings.json_ file:

[language="json" source="../snippets/configuration/console-custom-logging/appsettings.json"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/appsettings.json)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/appsettings.json.md)

The _appsettings.json_ file specifies that the color for the [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information) log level is [System.ConsoleColor.DarkGreen](https://learn.microsoft.com/search/?terms=System.ConsoleColor.DarkGreen), which overrides the default value set in the `ColorConsoleLoggerConfiguration` object.

## Usage and registration of the custom logger

By convention, services are registered for dependency injection as part of the startup routine of an application. In this example, the logging service is registered directly from the _Program.cs_ file.

To add the custom logging provider and corresponding logger, add an [Microsoft.Extensions.Logging.ILoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider) by calling a custom extension method, `AddColorConsoleLogger`, on the [Microsoft.Extensions.Logging.ILoggingBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggingBuilder) from the [Microsoft.Extensions.Hosting.IHostApplicationBuilder.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationBuilder.Logging) property:

[language="csharp" source="../snippets/configuration/console-custom-logging/Program.cs" highlight="8-16"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/Program.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/Program.cs.md)

By convention, extension methods on `ILoggingBuilder` are used to register the custom provider:

[language="csharp" source="../snippets/configuration/console-custom-logging/Extensions/ColorConsoleLoggerExtensions.cs"::: (complete source file; reference: ../snippets/configuration/console-custom-logging/Extensions/ColorConsoleLoggerExtensions.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console-custom-logging/Extensions/ColorConsoleLoggerExtensions.cs.md)

The `ILoggingBuilder` creates one or more `ILogger` instances. The `ILogger` instances are used by the framework to log the information.

The instantiation code overrides the color values from the _appsettings.json_ file for [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning) and [Microsoft.Extensions.Logging.LogLevel.Error](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Error).

When you run this simple app, it renders color output to the console window similar to the following image:

Color console logger sample output

## See also

- [Logging in .NET](overview.md)
- [Logging providers in .NET](providers.md)
- [Dependency injection in .NET](../dependency-injection/overview.md)
- [High-performance logging in .NET](high-performance-logging.md)
