---
title: SYSLIB1230 warning
description: Learn about the diagnostic that generates compile-time warning SYSLIB1230.
ms.date: 10/08/2024
f1_keywords:
  - syslib1230
---

# SYSLIB1230: Deriving from a `GeneratedComInterface`-attributed interface defined in another assembly is not supported

In .NET 9 and later versions, defining an interface with the [System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute) attribute that derives from a `GeneratedComInterface`-attributed interface that's defined in another assembly is supported with the following restrictions:

- The base interface type must be compiled targeting the same framework as the derived type.
- The base interface type must not shadow any members of its base interface, if it has one.

Additionally, any changes to any generated virtual method offsets in the base interface chain defined in another assembly won't be accounted for in the derived interfaces until the project is rebuilt.

When you define an interface with the [System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute) attribute that derives from a `GeneratedComInterface`-attributed interface that's defined in another assembly, the SYSLIB1230 warning is emitted to inform you of the limitations. To acknowledge the limitations, suppress the warning in code as follows:

```csharp
// Disable the warning.
#pragma warning disable SYSLIB1230
[GeneratedComInterface]
interface IDerived : IBaseInOtherAssembly
// Re-enable the warning.
#pragma warning restore SYSLIB1230
{
    // the interface definition
}
```

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

- [SYSLIB diagnostics for COM interop source generation](syslib-cominterfacegenerator.md)
