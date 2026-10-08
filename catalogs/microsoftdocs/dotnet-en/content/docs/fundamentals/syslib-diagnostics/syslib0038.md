---
title: SYSLIB0038 warning - SerializationFormat.Binary is obsolete
description: Learn about the obsoletion of SerializationFormat.Binary that generates compile-time warning SYSLIB0038.
ms.date: 03/18/2022
f1_keywords:
  - syslib0038
---
# SYSLIB0038: SerializationFormat.Binary is obsolete

[System.Data.SerializationFormat.Binary](https://learn.microsoft.com/search/?terms=System.Data.SerializationFormat.Binary) is marked as obsolete, starting in .NET 7. Using this API in code generates warning `SYSLIB0038` at compile time.

## Workaround

If your code uses [System.Data.SerializationFormat.Binary](https://learn.microsoft.com/search/?terms=System.Data.SerializationFormat.Binary), switch to using [System.Data.SerializationFormat.Xml](https://learn.microsoft.com/search/?terms=System.Data.SerializationFormat.Xml) or use another method of serialization.

Otherwise, you can set the `Switch.System.Data.AllowUnsafeSerializationFormatBinary` [System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext) switch. This switch lets you opt in to allowing the use of [System.Data.SerializationFormat.Binary](https://learn.microsoft.com/search/?terms=System.Data.SerializationFormat.Binary), so that code can work as before. However, this switch will be removed in .NET 8. For information about setting the switch, see [AppContext for library consumers](https://learn.microsoft.com/dotnet/api/system.appcontext#appcontext-for-library-consumers).

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0038

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0038
```

To suppress all the `SYSLIB0038` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0038</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).

## See also

- [SerializationFormat.Binary is obsolete](../../core/compatibility/serialization/7.0/serializationformat-binary.md)
