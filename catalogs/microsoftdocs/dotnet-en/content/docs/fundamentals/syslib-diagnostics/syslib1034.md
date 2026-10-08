---
title: SYSLIB1034 error
description: Learn about the diagnostic that generates compile-time error SYSLIB1034.
ms.date: 10/26/2023
f1_keywords:
  - syslib1034
---

# SYSLIB1034: JsonSourceGenerator encountered a [JsonStringEnumConverter] annotation

The non-generic [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) requires dynamic code and can't be used with source generation.

## Workarounds

Use [System.Text.Json.Serialization.JsonStringEnumConverter`1](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter%601) instead, which doesn't require runtime code generation.

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
