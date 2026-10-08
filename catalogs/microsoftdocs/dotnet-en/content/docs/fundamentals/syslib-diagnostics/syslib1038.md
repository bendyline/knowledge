---
title: SYSLIB1038 warning
description: Learn about the diagnostic that generates compile-time warning SYSLIB1038.
ms.date: 05/07/2021
f1_keywords:
  - syslib1038
---

# SYSLIB1038: `System.Text.Json` source generator encountered a property annotated with `[JsonInclude]` but with inaccessible accessors

The `System.Text.Json` source generator encountered a property that is annotated with `[JsonInclude]` but has accessors that are inaccessible to the source generator. The property must have `public` or `internal` accessors.

## Workarounds

If serialization or deserialization of properties with accessors that are not `public` or `internal` is required, use the [reflection-based `JsonSerializer` implementation](../../standard/serialization/system-text-json/source-generation-modes.md).

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
