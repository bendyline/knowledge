---
title: "Breaking change: Obsolete properties on ConsoleLoggerOptions"
description: Learn about the .NET 5 breaking change in core .NET libraries where the ConsoleLoggerFormat type and some properties on ConsoleLoggerOptions are now obsolete.
ms.date: 11/01/2020
---
# Obsolete properties on ConsoleLoggerOptions

The [Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat) type and some properties on [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions) are now obsolete.

## Change description

Starting in .NET 5, the [Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat) type and several properties on [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions) are obsolete. The obsolete properties are:

- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format)

With the introduction of new formatters, these properties are now available on the individual formatters.

## Reason for change

The [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format) property is an enumeration type, which cannot represent a custom formatter.

The remaining properties were set on [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions) and applied to both of the built-in formats for console logs. However, with the introduction of a new formatter API, it makes more sense for formatting to be represented on the formatter-specific options. This change provides better separation between the logger and logger formatters.

## Version introduced

5.0

## Recommended action

- Use the new [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName) property in place of the [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format) property. For example:

  ```csharp
  loggingBuilder.AddConsole(options =>
  {
    options.FormatterName = ConsoleFormatterNames.Systemd;
  });
  ```

  There are several differences between [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName) and [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format):

  - [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format) has only two possible options: `Default` and `Systemd`.
  - [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.FormatterName) is case insensitive and can be any string. The reserved, built-in names are `Simple`, `Systemd`, and `Json` (.NET 5 and later).
  - `"Format": "Systemd"` maps to `"FormatterName": "Systemd"`.
  - `"Format": "Default"` maps to `"FormatterName": "Simple"`.

- For the [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors), [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes), [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat), and [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp) properties, use the corresponding property on the new [Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions), [Microsoft.Extensions.Logging.Console.JsonConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.JsonConsoleFormatterOptions), or [Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions) types instead. For example, the corresponding setting for [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors) is [Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions.ColorBehavior](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions.ColorBehavior).

  Previous code:

  ```csharp
  loggingBuilder.AddConsole(options =>
  {
      options.DisableColors = true;
  });
  ```

  New code:

  ```csharp
  loggingBuilder.AddSimpleConsole(options =>
  {
      options.ColorBehavior = LoggerColorBehavior.Disabled;
  });
  ```

The following two JSON snippets show how the configuration file changes. Old configuration file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "None",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },

    "Console": {
      "LogLevel": {
        "Default": "Information"
      },
      "Format": "Systemd",
      "IncludeScopes": true,
      "TimestampFormat": "HH:mm:ss",
      "UseUtcTimestamp": true
    }
  },
  "AllowedHosts": "*"
}
```

New configuration file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "None",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },

    "Console": {
      "LogLevel": {
        "Default": "Information"
      },
      "FormatterName": "Systemd",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "HH:mm:ss",
        "UseUtcTimestamp": true
      }
    }
  },
  "AllowedHosts": "*"
}
```

## Affected APIs

- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp)
- [Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format)

<!--

#### Category

- Core .NET libraries
- ASP.NET

### Affected APIs

- `P:Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.DisableColors`
- `P:Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.IncludeScopes`
- `P:Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.TimestampFormat`
- `P:Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.UseUtcTimestamp`
- `P:Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions.Format`

-->
