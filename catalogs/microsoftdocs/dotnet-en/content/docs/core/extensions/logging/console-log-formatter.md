---
title: Console log formatting
description: Learn how to use and implement custom console log formatting in your .NET apps. Register and create new log formatters for better application logging.
ms.date: 10/20/2025
---

# Console log formatting

The `Microsoft.Extensions.Logging.Console` namespace provides support for custom formatting in console logs. There are three predefined formatting options available: [`Simple`](#simple), [`Systemd`](#systemd), and [`Json`](#json).

> **Important:**
> Prior to .NET 5, the [Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat) enum allowed for selecting the desired log format, either human readable which was the `Default`, or single line which is also known as `Systemd`. However, these were **not** customizable, and are now deprecated.

In this article, you will learn about console log formatters. The sample source code demonstrates how to:

- Register a new formatter.
- Select a registered formatter to use, either through code or [configuration](../configuration.md).
- Implement a custom formatter. You update configuration via [Microsoft.Extensions.Options.IOptionsMonitor`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601) and enable custom color formatting.


> **Tip:**
> All of the logging example source code is available in the **Samples Browser** for download. For more information, see [Browse code samples: Logging in .NET](https://learn.microsoft.com/samples/dotnet/samples/csharp-logging-fundamentals).


## Register formatter

The [`Console` logging provider](providers.md#console) has several predefined formatters, and exposes the ability to author your own custom formatter. To register any of the available formatters, use the corresponding `Add{Type}Console` extension method:

| Available types | Method to register type |
| --- | --- |
| [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json) | [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddJsonConsole*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddJsonConsole*) |
| [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple) | [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSimpleConsole*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSimpleConsole*) |
| [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd) | [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSystemdConsole*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddSystemdConsole*) |

### Simple

To use the `Simple` console formatter, register it with `AddSimpleConsole`:

[language="csharp" source="../snippets/logging/console-formatter-simple/Program.cs" highlight="5-10"::: (complete source file; reference: ../snippets/logging/console-formatter-simple/Program.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-simple/Program.cs.md)

In the preceding sample source code, the [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple) formatter was registered. It provides logs with the ability to not only wrap information such as time and log level in each log message, but also allows for ANSI color embedding and indentation of messages.

When this sample app is run, the log messages are formatted as shown below:

Example console logs written with the simple formatter.

### Systemd

The [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd) console logger:

- Uses the "Syslog" log level format and severities.
- Does **not** format messages with colors.
- Always logs messages in a single line.

This is commonly useful for containers, which often make use of `Systemd` console logging. The `Simple` console logger also enables a compact version that logs in a single line, and also allows for disabling colors as shown in an earlier sample.

[language="csharp" source="../snippets/logging/console-formatter-systemd/Program.cs" highlight="5-9"::: (complete source file; reference: ../snippets/logging/console-formatter-systemd/Program.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-systemd/Program.cs.md)

The example produces output similar to the following log messages:

Example console logs written with the Systemd formatter.

### Json

To write logs in a JSON format, the `Json` console formatter is used. The sample source code shows how an ASP.NET Core app might register it. Using the `webapp` template, create a new ASP.NET Core app with the [dotnet new](../../tools/dotnet-new.md) command:

```dotnetcli
dotnet new webapp -o Console.ExampleFormatters.Json
```

When running the app, using the template code, you get the default log format below:

```console
info: Console.ExampleFormatters.Json.Startup[0]
      Hello .NET friends!
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\snippets\logging\console-formatter-json
```

By default, the `Simple` console log formatter is selected with default configuration. You change this by calling `AddJsonConsole` in the *Program.cs*:

[language="csharp" source="../snippets/logging/console-formatter-json/Program.cs" highlight="5-13"::: (complete source file; reference: ../snippets/logging/console-formatter-json/Program.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-json/Program.cs.md)

Alternatively, you can also configure this using logging configuration, such as that found in the _appsettings.json_ file:

[language="json" source="../snippets/logging/console-formatter-json/appsettings.json" highlight="14-23"::: (complete source file; reference: ../snippets/logging/console-formatter-json/appsettings.json)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-json/appsettings.json.md)

Run the app again, with the above change, the log message is now formatted as JSON:

[Code reference unavailable in this source snapshot: ../snippets/logging/console-formatter-json/example-output.txt](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/extensions/logging/console-log-formatter.md)

> **Tip:**
> The `Json` console formatter, by default, logs each message in a single line. To make it more readable while configuring the formatter, set [System.Text.Json.JsonWriterOptions.Indented](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonWriterOptions.Indented) to `true`.

> **Caution:**
> When using the JSON console formatter, don't pass in log messages that have already been serialized as JSON. The logging infrastructure itself manages the serialization of log messages. So if you pass in a log message that's already serialized, it will be double serialized, thus causing malformed output.

## Set formatter with configuration

The previous samples showed how to register a formatter programmatically. Alternatively, this can be done with [configuration](../configuration.md). Consider the previous web application sample source code, if you update the *appsettings.json* file rather than calling `ConfigureLogging` in the *Program.cs* file, you could get the same outcome. The updated `appsettings.json` file would configure the formatter as follows:

[language="json" source="../snippets/logging/console-formatter-json/appsettings.json" highlight="14-23"::: (complete source file; reference: ../snippets/logging/console-formatter-json/appsettings.json)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-json/appsettings.json.md)

The two key values that need to be set are `"FormatterName"` and `"FormatterOptions"`. If a formatter with the value set for `"FormatterName"` is already registered, that formatter is selected, and its properties can be configured as long as they are provided as a key inside the `"FormatterOptions"` node. The predefined formatter names are reserved under [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames):

- [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Json)
- [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Simple)
- [Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterNames.Systemd)

## Implement a custom formatter

To implement a custom formatter, you need to:

- Create a subclass of [Microsoft.Extensions.Logging.Console.ConsoleFormatter](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatter) that represents your custom formatter.
- Register your custom formatter with:
  - [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsole*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsole*)
  - [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder,System.Action{``1})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter%60%602(Microsoft.Extensions.Logging.ILoggingBuilder%2CSystem.Action%7B%60%601%7D))

Create an extension method to handle this for you:

[language="csharp" source="../snippets/logging/console-formatter-custom/ConsoleLoggerExtensions.cs" highlight="10-11"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/ConsoleLoggerExtensions.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/ConsoleLoggerExtensions.cs.md)

The `CustomOptions` are defined as follows:

[language="csharp" source="../snippets/logging/console-formatter-custom/CustomOptions.cs"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/CustomOptions.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/CustomOptions.cs.md)

In the preceding code, the options are a subclass of [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions).

The `AddConsoleFormatter` API:

- Registers a subclass of `ConsoleFormatter`.
- Handles configuration. It uses a change token to synchronize updates, based on the [options pattern](../options.md), and the [IOptionsMonitor](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601) interface.

[language="csharp" source="../snippets/logging/console-formatter-custom/Program.cs" highlight="6-7"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/Program.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/Program.cs.md)

Define a `CustomFormatter` subclass of `ConsoleFormatter`:

[language="csharp" source="../snippets/logging/console-formatter-custom/CustomFormatter.cs" highlight="22-38"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/CustomFormatter.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/CustomFormatter.cs.md)

The preceding `CustomFormatter.Write<TState>` API dictates what text gets wrapped around each log message. A standard `ConsoleFormatter` should be able to wrap around scopes, time stamps, and severity level of logs at a minimum. Additionally, you can encode ANSI colors in the log messages, and provide desired indentations as well. The implementation of the `CustomFormatter.Write<TState>` lacks these capabilities.

For inspiration on further customizing formatting, see the existing implementations in the `Microsoft.Extensions.Logging.Console` namespace:

- [SimpleConsoleFormatter](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging.Console/src/SimpleConsoleFormatter.cs).
- [SystemdConsoleFormatter](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging.Console/src/SystemdConsoleFormatter.cs)
- [JsonConsoleFormatter](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Logging.Console/src/JsonConsoleFormatter.cs)

### Custom configuration options

To further customize the logging extensibility, your derived [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions) class can be configured from any [configuration provider](../configuration-providers.md). For example, you could use the [JSON configuration provider](../configuration-providers.md#json-configuration-provider) to define your custom options. First define your [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions) subclass.

[language="csharp" source="../snippets/logging/console-formatter-custom-with-config/CustomWrappingConsoleFormatterOptions.cs"::: (complete source file; reference: ../snippets/logging/console-formatter-custom-with-config/CustomWrappingConsoleFormatterOptions.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom-with-config/CustomWrappingConsoleFormatterOptions.cs.md)

The preceding console formatter options class defines two custom properties, representing a prefix and suffix. Next, define the *appsettings.json* file that will configure your console formatter options.

[language="json" source="../snippets/logging/console-formatter-custom-with-config/appsettings.json" highlight="8,14-17"::: (complete source file; reference: ../snippets/logging/console-formatter-custom-with-config/appsettings.json)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom-with-config/appsettings.json.md)

In the preceding JSON config file:

- The `"Logging"` node defines a `"Console"`.
- The `"Console"` node specifies a `"FormatterName"` of `"CustomTimePrefixingFormatter"`, which maps to a custom formatter.
- The `"FormatterOptions"` node defines a `"CustomPrefix"`, and `"CustomSuffix"`, as well as a few other derived options.

> **Tip:**
> The `$.Logging.Console.FormatterOptions` JSON path is reserved, and will map to a custom [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions) when added using the [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter*) extension method. This provides the ability to define custom properties, in addition to the ones available.

Consider the following `CustomDatePrefixingFormatter`:

[language="csharp" source="../snippets/logging/console-formatter-custom-with-config/CustomTimePrefixingFormatter.cs"::: (complete source file; reference: ../snippets/logging/console-formatter-custom-with-config/CustomTimePrefixingFormatter.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom-with-config/CustomTimePrefixingFormatter.cs.md)

In the preceding formatter implementation:

- The `CustomWrappingConsoleFormatterOptions` are monitored for change, and updated accordingly.
- Messages that are written are wrapped with the configured prefix, and suffix.
- A timestamp is added after the prefix, but before the message using the configured [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.UseUtcTimestamp](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.UseUtcTimestamp) and [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.TimestampFormat*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions.TimestampFormat*) values.

To use custom configuration options, with custom formatter implementations, add when calling [Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.ConfigureLogging(Microsoft.Extensions.Hosting.IHostBuilder,System.Action{Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Logging.ILoggingBuilder})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.ConfigureLogging(Microsoft.Extensions.Hosting.IHostBuilder%2CSystem.Action%7BMicrosoft.Extensions.Hosting.HostBuilderContext%2CMicrosoft.Extensions.Logging.ILoggingBuilder%7D)).

[language="csharp" source="../snippets/logging/console-formatter-custom-with-config/Program.cs" highlight="9-11"::: (complete source file; reference: ../snippets/logging/console-formatter-custom-with-config/Program.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom-with-config/Program.cs.md)

The following console output is similar to what you might expect to see from using this `CustomTimePrefixingFormatter`.

```console
|-<[ 15:03:15.6179 Hello World! ]>-|
|-<[ 15:03:15.6347 The .NET developer community happily welcomes you. ]>-|
```

## Implement custom color formatting

In order to properly enable color capabilities in your custom logging formatter, you can extend the [Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions) as it has a [Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions.ColorBehavior](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions.ColorBehavior) property that can be useful for enabling colors in logs.

Create a `CustomColorOptions` that derives from `SimpleConsoleFormatterOptions`:

[language="csharp" source="../snippets/logging/console-formatter-custom/CustomColorOptions.cs" highlight="5"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/CustomColorOptions.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/CustomColorOptions.cs.md)

Next, write some extension methods in a `TextWriterExtensions` class that allow for conveniently embedding ANSI coded colors within formatted log messages:

[language="csharp" source="../snippets/logging/console-formatter-custom/TextWriterExtensions.cs"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/TextWriterExtensions.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/TextWriterExtensions.cs.md)

A custom color formatter that handles applying custom colors could be defined as follows:

[language="csharp" source="../snippets/logging/console-formatter-custom/CustomColorFormatter.cs" highlight="13-16,50-63"::: (complete source file; reference: ../snippets/logging/console-formatter-custom/CustomColorFormatter.cs)](../../../../_code/docs/core/extensions/snippets/logging/console-formatter-custom/CustomColorFormatter.cs.md)

When you run the application, the logs will show the `CustomPrefix` message in the color green when `FormatterOptions.ColorBehavior` is `Enabled`.

> **Note:**
> When [Microsoft.Extensions.Logging.Console.LoggerColorBehavior](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.LoggerColorBehavior) is `Disabled`, log messages do _not_ interpret embedded ANSI color codes within log messages. Instead, they output the raw message. For example, consider the following:
>
> ```csharp
> logger.LogInformation("Random log \x1B[42mwith green background\x1B[49m message");
> ```
>
> This would output the verbatim string, and it is _not_ colorized.
>
> ```output
> Random log \x1B[42mwith green background\x1B[49m message
> ```

## See also

- [Logging in .NET](overview.md)
- [Implement a custom logging provider in .NET](custom-provider.md)
- [High-performance logging in .NET](high-performance-logging.md)
