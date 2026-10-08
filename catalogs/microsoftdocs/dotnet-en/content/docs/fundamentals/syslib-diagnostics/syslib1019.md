---
title: SYSLIB1019 error
description: Learn about the diagnostic that generates compile-time error SYSLIB1019.
ms.date: 05/07/2021
f1_keywords:
  - syslib1019
---

# SYSLIB1019: Couldn't find a field of type `ILogger`

When a logging method definition doesn't explicitly include a parameter of type `ILogger`, then the type containing the logging method must have one and only one field of type `ILogger`. The `ILogger` will be used as the target for log messages.

## Workarounds

Ensure the type containing the logging method includes a field of type `ILogger` or include a parameter of type `ILogger` in the logging method signature.

<!-- markdownlint-disable MD027 -->
> **Note:**
> If you get this error but your class uses a [primary constructor that takes an `ILogger`](https://github.com/dotnet/runtime/issues/91121), you can resolve the error by adding an `ILogger` field as follows:
>
> ```csharp
> public partial class Foo(ILogger<Foo> logger) {
>     // Workaround for https://github.com/dotnet/runtime/issues/91121.
>     private readonly ILogger _logger = logger;
> }
> ```
<!-- markdownlint-enable MD027 -->

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
