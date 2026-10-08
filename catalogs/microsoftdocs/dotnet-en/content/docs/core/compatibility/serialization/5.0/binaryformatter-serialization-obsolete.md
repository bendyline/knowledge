---
title: "Breaking change: BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps"
description: Learn about the .NET 5 breaking change in core .NET libraries where serialize and deserialize methods on BinaryFormatter, Formatter, and IFormatter are obsolete.
ms.date: 11/01/2020
---
# BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps

`Serialize` and `Deserialize` methods on [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter), [System.Runtime.Serialization.Formatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter), and [System.Runtime.Serialization.IFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter) are now obsolete as warning. Additionally, [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) serialization is prohibited by default for ASP.NET apps.

> **Note:**
> In .NET 7, the [affected APIs](#affected-apis) are obsolete as *error*. For more information, see [BinaryFormatter serialization APIs produce compiler errors](../7.0/binaryformatter-apis-produce-errors.md).

## Change description

Due to [security vulnerabilities](../../../../standard/serialization/binaryformatter-security-guide.md#binaryformatter-security-vulnerabilities) in [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter), the following methods are now obsolete and produce a compile-time warning with ID `SYSLIB0011`. Additionally, in ASP.NET Core 5.0 and later apps, they will throw a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException), unless the web app has re-enabled [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) functionality.

- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*)

The following serialization methods are also obsolete and produce warning `SYSLIB0011`, but have no behavioral changes:

- [System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream))
- [System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream))

## Version introduced

5.0

## Reason for change

These methods are marked obsolete as part of an effort to wind down usage of [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) within the .NET ecosystem.

## Recommended action

- Stop using [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) in your code. Instead, consider using [System.Text.Json.JsonSerializer](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer) or [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer). For more information, see [BinaryFormatter security guide](../../../../standard/serialization/binaryformatter-security-guide.md).

- You can temporarily suppress the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) compile-time warning, which is `SYSLIB0011`. We recommend that you thoroughly assess your code for risks before choosing this option. The easiest way to suppress the warnings is to surround the individual call site with `#pragma` directives.

  ```csharp
  // Now read the purchase order back from disk
  using (var readStream = new FileStream("myfile.bin", FileMode.Open))
  {
      var formatter = new BinaryFormatter();
  #pragma warning disable SYSLIB0011
      return (PurchaseOrder)formatter.Deserialize(readStream);
  #pragma warning restore SYSLIB0011
  }
  ```

  You can also suppress the warning in the project file.

  ```xml
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <!-- Disable "BinaryFormatter is obsolete" warnings for entire project -->
    <NoWarn>$(NoWarn);SYSLIB0011</NoWarn>
  </PropertyGroup>
  ```

  If you suppress the warning in the project file, the warning is suppressed for all code files in the project. Suppressing `SYSLIB0011` does not suppress warnings caused by using other obsolete APIs.

- To continue using [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) in ASP.NET apps, you can re-enable it in the project file. However, it's strongly recommended not to do this. For more information, see [BinaryFormatter security guide](../../../../standard/serialization/binaryformatter-security-guide.md).

  ```xml
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <!-- Warning: Setting the following switch is *NOT* recommended in web apps. -->
    <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
  </PropertyGroup>
  ```

For more information about recommended actions, see [Resolving BinaryFormatter obsoletion and disablement errors](../../../../standard/serialization/binaryformatter-security-guide.md).

## Affected APIs

- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*)
- [System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream))
- [System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream))

## See also

- [SerializationFormat.Binary is obsolete (.NET 7)](../7.0/serializationformat-binary.md)
- [BinaryFormatter serialization APIs produce compiler errors (.NET 7)](../7.0/binaryformatter-apis-produce-errors.md)
- [BinaryFormatter disabled across most project types (.NET 8)](../8.0/binaryformatter-disabled.md)
