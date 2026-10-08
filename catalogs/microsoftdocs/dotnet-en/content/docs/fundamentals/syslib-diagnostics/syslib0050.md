---
title: SYSLIB0050 warning - Formatter-based serialization is obsolete
description: Learn about the obsoletion of formatter-based serialization APIs that generates compile-time warning SYSLIB0050.
ms.date: 05/11/2023
f1_keywords:
  - syslib0050
---
# SYSLIB0050: Formatter-based serialization is obsolete

The following APIs are obsolete, starting in .NET 8. Calling them in code generates warning `SYSLIB0050` at compile time.

- [System.Runtime.Serialization.FormatterConverter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.FormatterConverter)
- [System.Runtime.Serialization.FormatterServices](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.FormatterServices)
- [System.Runtime.Serialization.IFormatterConverter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatterConverter)
- [System.Runtime.Serialization.IObjectReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IObjectReference)
- [System.Runtime.Serialization.ISafeSerializationData](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISafeSerializationData)
- [System.Runtime.Serialization.ISerializationSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializationSurrogate)
- [System.Runtime.Serialization.ISurrogateSelector](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISurrogateSelector)
- [System.Runtime.Serialization.ObjectIDGenerator](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ObjectIDGenerator)
- [System.Runtime.Serialization.ObjectManager](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ObjectManager)
- [System.Runtime.Serialization.SafeSerializationEventArgs](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SafeSerializationEventArgs)
- [System.Runtime.Serialization.SerializationObjectManager](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationObjectManager)
- [System.Runtime.Serialization.StreamingContextStates](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.StreamingContextStates)
- [System.Runtime.Serialization.SurrogateSelector](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SurrogateSelector)
- [System.Runtime.Serialization.Formatters.FormatterAssemblyStyle](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.FormatterAssemblyStyle)
- [System.Runtime.Serialization.Formatters.FormatterTypeStyle](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.FormatterTypeStyle)
- [System.Runtime.Serialization.Formatters.IFieldInfo](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.IFieldInfo)
- [System.Runtime.Serialization.Formatters.TypeFilterLevel](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.TypeFilterLevel)
- [System.Type.IsSerializable](https://learn.microsoft.com/search/?terms=System.Type.IsSerializable)
- [System.Reflection.FieldAttributes.NotSerialized](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.NotSerialized)
- [System.Reflection.FieldInfo.IsNotSerialized](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.IsNotSerialized)
- [System.Reflection.TypeAttributes.Serializable](https://learn.microsoft.com/search/?terms=System.Reflection.TypeAttributes.Serializable)
- [System.Runtime.Serialization.ISerializable.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Runtime.Serialization.SerializationInfo.%23ctor(System.Type,System.Runtime.Serialization.IFormatterConverter,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationInfo.%2523ctor(System.Type%2CSystem.Runtime.Serialization.IFormatterConverter%2CSystem.Boolean))
- [System.Runtime.Serialization.SerializationInfo.%23ctor(System.Type,System.Runtime.Serialization.IFormatterConverter)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationInfo.%2523ctor(System.Type%2CSystem.Runtime.Serialization.IFormatterConverter))
- [System.Runtime.Serialization.StreamingContext.%23ctor(System.Runtime.Serialization.StreamingContextStates,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.StreamingContext.%2523ctor(System.Runtime.Serialization.StreamingContextStates%2CSystem.Object))
- [System.Runtime.Serialization.StreamingContext.%23ctor(System.Runtime.Serialization.StreamingContextStates)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.StreamingContext.%2523ctor(System.Runtime.Serialization.StreamingContextStates))

## Workaround

- If you were using [System.Runtime.Serialization.FormatterServices.GetUninitializedObject(System.Type)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.FormatterServices.GetUninitializedObject(System.Type)), use [System.Runtime.CompilerServices.RuntimeHelpers.GetUninitializedObject(System.Type)](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.GetUninitializedObject(System.Type)) instead.

  If you cross-compile for .NET Framework and modern .NET, you can use an `#if` statement to selectively call the appropriate API, as shown in the following snippet.

  ```csharp
  Type typeToInstantiate;
  #if NET5_0_OR_GREATER
  object obj = System.Runtime.CompilerServices.RuntimeHelpers.GetUninitializedObject(typeToInstantiate);
  #else
  object obj = System.Runtime.Serialization.FormatterServices.GetUninitializedObject(typeToInstantiate);
  #endif
  ```

- If you're writing a serialization library, we strongly recommend against serialization libraries that support the legacy serialization infrastructure (`[Serializable]` and `ISerializable`). Modern serialization libraries should have policy based on a type's public APIs rather than its private implementation details. If you base a serializer on these implementation details and strongly tie it to `ISerializable` and other mechanisms that encourage embedding type names within the serialized payload, it can lead to the problems described in [Deserialization risks in use of BinaryFormatter and related types](../../standard/serialization/binaryformatter-security-guide.md).

  If your serialization library must remain compatible with the legacy serialization infrastructure, you can easily [suppress](#suppress-a-warning) the legacy serialization API obsoletions.

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0050

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0050
```

To suppress all the `SYSLIB0050` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0050</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).

## See also

- [SYSLIB0051: Legacy serialization support APIs are obsolete](syslib0051.md)
