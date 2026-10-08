---
title: SYSLIB1011 error
description: Learn about the diagnostic that generates compile-time error SYSLIB1011.
ms.date: 02/23/2026
f1_keywords:
  - syslib1011
---

# SYSLIB1011: Logging methods cannot use the `allows ref struct` constraint

A method annotated with `LoggerMessageAttribute` uses the C# 13 `allows ref struct` anti-constraint on a type parameter. The logging source generator stores parameters in struct fields, so it can't hold `ref struct` type arguments.

## Workarounds

Logging methods support generic type parameters and most constraint forms (`class`, `struct`, `unmanaged`, `notnull`, base types, interfaces, and `new()`). Remove the `allows ref struct` anti-constraint from the type parameter to resolve this error.

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
