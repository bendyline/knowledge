---
title: SYSLIB1027 error
description: Learn about the diagnostic that generates compile-time error SYSLIB1027.
ms.date: 11/07/2025
f1_keywords:
  - SYSLIB1027
---

# SYSLIB1027: Primary constructor parameter of type 'Microsoft.Extensions.Logging.ILogger' is hidden by a field

A class has a primary constructor parameter of type [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) that's hidden by a field in the class or a base class, which prevents its use.

For example, the following class raises the `SYSLIB1027` diagnostic:

```csharp
partial class C(ILogger logger)
{
    private readonly object logger = logger;

    [LoggerMessage(EventId = 0, Level = LogLevel.Debug, Message = "...")]
    public partial void M1();
}
```

## Workarounds

Either remove the field or the primary constructor. For more information, see [Basic usage](../../core/extensions/logging/source-generation.md#basic-usage).

## Suppress warnings

It's recommended that you use one of the workarounds when possible. However, if you cannot change your code, you can suppress the warning through a `#pragma` directive or a `<NoWarn>` project setting. If the `SYSLIB1XXX` source generator diagnostic doesn't surface as an error, you can suppress the warning in code or in your project file.

To suppress the warnings in code (replace the diagnostic ID as necessary):

```csharp
// Disable the warning.
#pragma warning disable SYSLIB1006

// Code that generates compiler diagnostic.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB1006
```

To suppress the warnings in a project file (replace the diagnostic IDs as necessary):

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   <TargetFramework>net10.0</TargetFramework>
   <!-- NoWarn below suppresses SYSLIB1002 project-wide -->
   <NoWarn>$(NoWarn);SYSLIB1002</NoWarn>
   <!-- To suppress multiple warnings, you can use multiple NoWarn elements -->
   <NoWarn>$(NoWarn);SYSLIB1002</NoWarn>
   <NoWarn>$(NoWarn);SYSLIB1006</NoWarn>
   <!-- Alternatively, you can suppress multiple warnings by using a semicolon-delimited list -->
   <NoWarn>$(NoWarn);SYSLIB1002;SYSLIB1006;SYSLIB1007</NoWarn>
  </PropertyGroup>
</Project>
```


## See also

- [Compile-time logging source generation](../../core/extensions/logging/source-generation.md)
