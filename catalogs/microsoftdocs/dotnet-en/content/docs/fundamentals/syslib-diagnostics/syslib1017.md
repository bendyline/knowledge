---
title: SYSLIB1017 error
description: Learn about the diagnostic that generates compile-time error SYSLIB1017.
ms.date: 05/07/2021
f1_keywords:
  - syslib1017
---

# SYSLIB1017: A `LogLevel` value must be supplied in the `LoggerMessage` attribute or as a parameter to the logging method

The `LoggerMessageAttribute` attribute was applied to a method without a `LogLevel` value specified. When you do this, one argument to the logging method must be of that type so that the `LogLevel` value ends up being specified explicitly when calling the logging method.

## Workarounds

Either specify a `LogLevel` value in the `LoggerMessage` attribute, or make one of the arguments of the logging method a `LogLevel` value.

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
