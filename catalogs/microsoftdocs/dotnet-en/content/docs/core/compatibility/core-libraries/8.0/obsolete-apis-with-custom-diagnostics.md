---
title: "Breaking change: .NET 8 obsoletions with custom IDs"
titleSuffix: ""
description: Learn about the .NET 8 breaking change in core .NET libraries where some APIs have been marked as obsolete with a custom diagnostic ID.
ms.date: 10/09/2023
---
# API obsoletions with non-default diagnostic IDs (.NET 8)

Some APIs have been marked as obsolete, starting in .NET 8. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is [CS0618](../../../../csharp/language-reference/compiler-messages/cs0618.md) for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 8 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| --- | --- | --- |
| [SYSLIB0011](../../../../fundamentals/syslib-diagnostics/syslib0011.md) | BinaryFormatter serialization is obsolete | Warning/error |
| [SYSLIB0048](../../../../fundamentals/syslib-diagnostics/syslib0048.md) | [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D)) and [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D)) are obsolete. Use [System.Security.Cryptography.RSA.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Encrypt*) and [System.Security.Cryptography.RSA.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Decrypt*) instead. | Warning |
| [SYSLIB0049](../../../../fundamentals/syslib-diagnostics/syslib0049.md) | JsonSerializerOptions.AddContext is obsolete. To register a JsonSerializerContext, use either the TypeInfoResolver or TypeInfoResolverChain property. | Warning |
| [SYSLIB0050](../../../../fundamentals/syslib-diagnostics/syslib0050.md) | Formatter-based serialization is obsolete and should not be used. | Warning |
| [SYSLIB0051](../../../../fundamentals/syslib-diagnostics/syslib0051.md) | APIs that support obsolete formatter-based serialization are obsolete. They should not be called or extended by application code. | Warning |
| [SYSLIB0052](../../../../fundamentals/syslib-diagnostics/syslib0052.md) | APIs that support obsolete mechanisms for Regex extensibility are obsolete. | Warning |
| [SYSLIB0053](../../../../fundamentals/syslib-diagnostics/syslib0053.md) | [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) should indicate the required tag size for encryption and decryption. Use a constructor that accepts the tag size. | Warning |

## Version introduced

.NET 8

## Type of breaking change

These obsoletions can affect [source compatibility](../../categories.md#source-compatibility).

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0011

- [System.Resources.Extensions.PreserializedResourceWriter.AddBinaryFormattedResource(System.String,System.Byte\[\],System.String)](https://learn.microsoft.com/search/?terms=System.Resources.Extensions.PreserializedResourceWriter.AddBinaryFormattedResource(System.String%2CSystem.Byte%5B%5D%2CSystem.String))
- [System.Runtime.Serialization.Formatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter)
- [System.Runtime.Serialization.IFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter)

### SYSLIB0048

- [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte%5B%5D))

### SYSLIB0049

- [System.Text.Json.JsonSerializerOptions.AddContext``1](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.AddContext%60%601)

### SYSLIB0050

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

### SYSLIB0051

The `SYSLIB0051` API obsoletions are organized here by namespace.

#### Microsoft.CSharp.RuntimeBinder namespace

- [Microsoft.CSharp.RuntimeBinder.RuntimeBinderException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=Microsoft.CSharp.RuntimeBinder.RuntimeBinderException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [Microsoft.CSharp.RuntimeBinder.RuntimeBinderInternalCompilerException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=Microsoft.CSharp.RuntimeBinder.RuntimeBinderInternalCompilerException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### Microsoft.VisualBasic.FileIO namespace

- [Microsoft.VisualBasic.FileIO.MalformedLineException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.MalformedLineException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [Microsoft.VisualBasic.FileIO.MalformedLineException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.MalformedLineException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System namespace

- [System.AccessViolationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.AccessViolationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.AggregateException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.AggregateException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.AggregateException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.AggregateException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.AppDomainUnloadedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.AppDomainUnloadedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ApplicationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ApplicationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArgumentException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArgumentException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArgumentException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArgumentException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArgumentNullException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArgumentNullException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArgumentOutOfRangeException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArgumentOutOfRangeException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArithmeticException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArithmeticException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ArrayTypeMismatchException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ArrayTypeMismatchException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.BadImageFormatException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.BadImageFormatException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.BadImageFormatException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.BadImageFormatException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.CannotUnloadAppDomainException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.CannotUnloadAppDomainException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ContextMarshalException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ContextMarshalException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DBNull.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DBNull.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Delegate.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Delegate.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DivideByZeroException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DivideByZeroException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DuplicateWaitObjectException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DuplicateWaitObjectException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.EntryPointNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.EntryPointNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Exception.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Exception.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Exception.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Exception.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.FieldAccessException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.FieldAccessException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.FormatException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.FormatException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.InvalidCastException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.InvalidCastException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.InvalidOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.InvalidOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.InvalidTimeZoneException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.InvalidTimeZoneException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MemberAccessException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MemberAccessException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MethodAccessException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MethodAccessException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MissingFieldException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MissingFieldException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MissingMemberException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MissingMemberException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MissingMemberException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MissingMemberException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MissingMethodException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MissingMethodException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.MulticastDelegate.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.MulticastDelegate.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.NotImplementedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.NotImplementedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.NotSupportedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.NotSupportedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.NullReferenceException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.NullReferenceException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ObjectDisposedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ObjectDisposedException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.OperatingSystem.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.OperatingSystem.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.OperationCanceledException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.OperationCanceledException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.OutOfMemoryException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.OverflowException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.OverflowException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.PlatformNotSupportedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.RankException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.RankException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.RuntimeFieldHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.RuntimeFieldHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.RuntimeMethodHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.RuntimeMethodHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.RuntimeTypeHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.RuntimeTypeHandle.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.SystemException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.SystemException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TimeoutException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TimeoutException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TimeZoneNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TimeZoneNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TypeAccessException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TypeAccessException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TypeInitializationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TypeInitializationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TypeLoadException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TypeLoadException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TypeLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TypeLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.TypeUnloadedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.TypeUnloadedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.UnauthorizedAccessException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.WeakReference.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.WeakReference.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.WeakReference.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.WeakReference.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.UriFormatException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.UriFormatException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Collections namespace

- [System.Collections.Comparer.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Comparer.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Collections.Generic namespace

- [System.Collections.Generic.LinkedList`1.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.LinkedList`1.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.LinkedList%601.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.SortedSet`1.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedSet%601.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.Dictionary`2.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.Dictionary`2.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.HashSet`1.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.HashSet`1.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Generic.KeyNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.KeyNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Collections.Specialized namespace

- [System.Collections.Specialized.NameObjectCollectionBase.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Specialized.NameObjectCollectionBase.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Specialized.NameValueCollection.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameValueCollection.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Specialized.OrderedDictionary.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.OrderedDictionary.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Collections.Specialized.OrderedDictionary.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.OrderedDictionary.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.ComponentModel namespace

- [System.ComponentModel.InvalidAsynchronousStateException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.InvalidAsynchronousStateException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.InvalidEnumArgumentException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.InvalidEnumArgumentException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.LicenseException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.LicenseException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.LicenseException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.LicenseException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.WarningException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.WarningException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.WarningException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.WarningException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.Win32Exception.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.Win32Exception.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.ComponentModel.Composition namespace

- [System.ComponentModel.Composition.CompositionContractMismatchException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Composition.CompositionContractMismatchException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.Composition.ImportCardinalityMismatchException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Composition.ImportCardinalityMismatchException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.ComponentModel.Composition.Primitives namespace

- [System.ComponentModel.Composition.Primitives.ComposablePartException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Composition.Primitives.ComposablePartException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.ComponentModel.Composition.Primitives.ComposablePartException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Composition.Primitives.ComposablePartException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.ComponentModel.DataAnnotations namespace

- [System.ComponentModel.DataAnnotations.ValidationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.ComponentModel.Design namespace

- [System.ComponentModel.Design.CheckoutException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.CheckoutException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Configuration namespace

- [System.Configuration.ConfigurationErrorsException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationErrorsException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.ConfigurationErrorsException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationErrorsException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.ConfigurationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.ConfigurationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.ConfigurationSectionCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationSectionCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.ConfigurationSectionGroupCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationSectionGroupCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.PropertyInformationCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.PropertyInformationCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyIsReadOnlyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyIsReadOnlyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyWrongTypeException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyWrongTypeException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.Provider.ProviderException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.Provider.ProviderException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyIsReadOnlyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyIsReadOnlyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Configuration.SettingsPropertyWrongTypeException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Configuration.SettingsPropertyWrongTypeException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Data namespace

- [System.Data.ConstraintException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.ConstraintException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DataException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DataException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DataSet.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DataSet.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DataTable.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DataTable.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DBConcurrencyException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DBConcurrencyException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DeletedRowInaccessibleException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DeletedRowInaccessibleException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.DuplicateNameException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.DuplicateNameException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.EvaluateException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.EvaluateException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.InRowChangingEventException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.InRowChangingEventException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.InvalidConstraintException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.InvalidConstraintException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.InvalidExpressionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.InvalidExpressionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.MissingPrimaryKeyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.MissingPrimaryKeyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.NoNullAllowedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.NoNullAllowedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.PropertyCollection.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.PropertyCollection.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.ReadOnlyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.ReadOnlyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.RowNotInTableException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.RowNotInTableException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.StrongTypingException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.StrongTypingException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.SyntaxErrorException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.SyntaxErrorException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.TypedTableBase`1.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.TypedTableBase%601.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Data.VersionNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.VersionNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Data.Common namespace

- [System.Data.Common.DbException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Data.Odbc namespace

- [System.Data.Odbc.OdbcException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Data.OleDb namespace

- [System.Data.OleDb.OleDbException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Data.SqlTypes namespace

- [System.Data.SqlTypes.SqlTypeException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes.SqlTypeException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Diagnostics.Eventing.Reader namespace

- [System.Diagnostics.Eventing.Reader.EventLogException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Diagnostics.Eventing.Reader.EventLogException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Diagnostics.Eventing.Reader.EventLogInvalidDataException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogInvalidDataException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Diagnostics.Eventing.Reader.EventLogNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Diagnostics.Eventing.Reader.EventLogProviderDisabledException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogProviderDisabledException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Diagnostics.Eventing.Reader.EventLogReadingException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Eventing.Reader.EventLogReadingException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Diagnostics.Tracing namespace

- [System.Diagnostics.Tracing.EventSourceException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSourceException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.DirectoryServices namespace

- [System.DirectoryServices.DirectoryServicesCOMException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesCOMException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.DirectoryServicesCOMException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesCOMException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.DirectoryServices.AccountManagement namespace

- [System.DirectoryServices.AccountManagement.MultipleMatchesException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.MultipleMatchesException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.NoMatchingPrincipalException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.NoMatchingPrincipalException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PasswordException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PasswordException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalExistsException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalExistsException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalServerDownException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalServerDownException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.AccountManagement.PrincipalServerDownException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.AccountManagement.PrincipalServerDownException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.DirectoryServices.ActiveDirectory namespace

- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectExistsException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectExistsException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryObjectNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryServerDownException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryServerDownException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ActiveDirectoryServerDownException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ActiveDirectoryServerDownException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ForestTrustCollisionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ForestTrustCollisionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.ForestTrustCollisionException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.ForestTrustCollisionException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.SyncFromAllServersOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.SyncFromAllServersOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.ActiveDirectory.SyncFromAllServersOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.ActiveDirectory.SyncFromAllServersOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.DirectoryServices.Protocols namespace

- [System.DirectoryServices.Protocols.BerConversionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.BerConversionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.DirectoryException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.DirectoryException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.DirectoryOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.DirectoryOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.DirectoryOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.DirectoryOperationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.LdapException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.LdapException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.LdapException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.LdapException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.DirectoryServices.Protocols.TlsOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.DirectoryServices.Protocols.TlsOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Formats.Asn1 namespace

- [System.Formats.Asn1.AsnContentException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Formats.Asn1.AsnContentException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Formats.Cbor namespace

- [System.Formats.Cbor.CborContentException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Formats.Cbor.CborContentException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Globalization namespace

- [System.Globalization.CultureNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Globalization.CultureNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Globalization.CultureNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Globalization.CultureNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.IO namespace

- [System.IO.DirectoryNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.DriveNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.DriveNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.EndOfStreamException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.EndOfStreamException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileFormatException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileFormatException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileFormatException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileFormatException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileLoadException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileLoadException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileNotFoundException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileSystemInfo.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.FileSystemInfo.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.InternalBufferOverflowException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.InternalBufferOverflowException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.IOException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.IOException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.IsolatedStorage.IsolatedStorageException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.PathTooLongException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Management namespace

- [System.Management.ManagementBaseObject.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Management.ManagementBaseObject.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Management.ManagementClass.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Management.ManagementClass.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Management.ManagementException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Management.ManagementException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Management.ManagementException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Management.ManagementException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Management.ManagementNamedValueCollection.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Management.ManagementNamedValueCollection.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Media namespace

- [System.Media.SoundPlayer.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Media.SoundPlayer.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Net namespace

- [System.Net.CookieException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.CookieException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.CookieException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.CookieException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.FileWebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.FileWebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.HttpListenerException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpListenerException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.HttpWebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.HttpWebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.ProtocolViolationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.ProtocolViolationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.ProtocolViolationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.ProtocolViolationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebHeaderCollection.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebHeaderCollection.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebHeaderCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebHeaderCollection.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.WebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Net.Mail namespace

- [System.Net.Mail.SmtpException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.Mail.SmtpException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.Mail.SmtpFailedRecipientException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpFailedRecipientException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.Mail.SmtpFailedRecipientException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpFailedRecipientException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.Mail.SmtpFailedRecipientsException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpFailedRecipientsException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.Mail.SmtpFailedRecipientsException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpFailedRecipientsException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Net.NetworkInformation namespace

- [System.Net.NetworkInformation.NetworkInformationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInformationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Net.NetworkInformation.PingException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.PingException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Net.Sockets namespace

- [System.Net.Sockets.SocketException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.SocketException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Reflection namespace

- [System.Reflection.Assembly.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.AssemblyName.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.CustomAttributeFormatException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeFormatException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.InvalidFilterCriteriaException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.InvalidFilterCriteriaException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.Module.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.Module.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.ParameterInfo.GetRealObject(System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo.GetRealObject(System.Runtime.Serialization.StreamingContext))
- [System.Reflection.ReflectionTypeLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.ReflectionTypeLoadException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.StrongNameKeyPair.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.StrongNameKeyPair.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Reflection.TargetException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.TargetException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Reflection.Metadata namespace

- [System.Reflection.Metadata.ImageFormatLimitationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.ImageFormatLimitationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Resources namespace

- [System.Resources.MissingManifestResourceException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Resources.MissingManifestResourceException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Resources.MissingSatelliteAssemblyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Resources.MissingSatelliteAssemblyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Runtime.CompilerServices namespace

- [System.Runtime.CompilerServices.RuntimeWrappedException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeWrappedException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Runtime.CompilerServices.SwitchExpressionException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SwitchExpressionException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Runtime.InteropServices namespace

- [System.Runtime.InteropServices.ExternalException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ExternalException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Runtime.Serialization.SerializationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Runtime.Serialization namespace

- [System.Runtime.Serialization.InvalidDataContractException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.InvalidDataContractException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security namespace

- [System.Security.HostProtectionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.HostProtectionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.SecurityException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.SecurityException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.SecurityException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.SecurityException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.VerificationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.VerificationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.AccessControl namespace

- [System.Security.AccessControl.PrivilegeNotHeldException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.PrivilegeNotHeldException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.Authentication namespace

- [System.Security.Authentication.InvalidCredentialException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Authentication.InvalidCredentialException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.Claims namespace

- [System.Security.Claims.ClaimsIdentity.%23ctor(System.Runtime.Serialization.SerializationInfo)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Runtime.Serialization.SerializationInfo))
- [System.Security.Claims.ClaimsIdentity.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Claims.ClaimsPrincipal.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.Cryptography namespace

- [System.Security.Cryptography.CryptographicException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Cryptography.CryptographicUnexpectedOperationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicUnexpectedOperationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Cryptography.X509Certificates.X509Certificate.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Cryptography.X509Certificates.X509Certificate2.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.Policy namespace

- [System.Security.Policy.Hash.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Policy.Hash.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Policy.PolicyException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Security.Principal namespace

- [System.Security.Principal.IdentityNotMappedException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Principal.IdentityNotMappedException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Security.Principal.WindowsIdentity.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Text.Json namespace

- [System.Text.Json.JsonException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Text.Json.JsonException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Text.RegularExpressions namespace

- [System.Text.RegularExpressions.RegexMatchTimeoutException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexMatchTimeoutException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Text.RegularExpressions.RegexParseException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexParseException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Threading namespace

- [System.Threading.CompressedStack.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.CompressedStack.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.ThreadInterruptedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.ThreadInterruptedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.ThreadStateException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.ThreadStateException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.BarrierPostPhaseException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.BarrierPostPhaseException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.AbandonedMutexException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.AbandonedMutexException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.ExecutionContext.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.LockRecursionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.LockRecursionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.SemaphoreFullException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreFullException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.SynchronizationLockException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationLockException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.WaitHandleCannotBeOpenedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandleCannotBeOpenedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Threading.Channels namespace

- [System.Threading.Channels.ChannelClosedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.Channels.ChannelClosedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Threading.Tasks namespace

- [System.Threading.Tasks.TaskCanceledException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Threading.Tasks.TaskSchedulerException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskSchedulerException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Transactions namespace

- [System.Transactions.TransactionAbortedException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionAbortedException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Transactions.TransactionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Transactions.TransactionInDoubtException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionInDoubtException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Transactions.TransactionManagerCommunicationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionManagerCommunicationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Transactions.TransactionPromotionException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionPromotionException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Xml namespace

- [System.Xml.XmlException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.XmlException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.XmlException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.XmlException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Xml.Schema namespace

- [System.Xml.Schema.XmlSchemaException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Schema.XmlSchemaException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Schema.XmlSchemaInferenceException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInferenceException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Schema.XmlSchemaInferenceException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInferenceException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Schema.XmlSchemaValidationException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Schema.XmlSchemaValidationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Xml.XPath namespace

- [System.Xml.XPath.XPathException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.XPath.XPathException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

#### System.Xml.Xsl namespace

- [System.Xml.Xsl.XsltCompileException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltCompileException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Xsl.XsltCompileException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltCompileException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Xsl.XsltException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Xml.Xsl.XsltException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltException.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))

### SYSLIB0052

- [System.Text.RegularExpressions.Regex.InitializeReferences](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.InitializeReferences)
- [System.Text.RegularExpressions.Regex.UseOptionC](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.UseOptionC)
- [System.Text.RegularExpressions.Regex.UseOptionR](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.UseOptionR)
- [System.Text.RegularExpressions.RegexRunner.CharInSet(System.Char,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexRunner.CharInSet(System.Char%2CSystem.String%2CSystem.String))
- [System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex,System.String,System.Int32,System.Int32,System.Int32,System.Int32,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex%2CSystem.String%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Boolean))
- [System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex,System.String,System.Int32,System.Int32,System.Int32,System.Int32,System.Boolean,System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex%2CSystem.String%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Boolean%2CSystem.TimeSpan))

### SYSLIB0053

- [System.Security.Cryptography.AesGcm.%23ctor(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.%2523ctor(System.Byte%5B%5D))
- [System.Security.Cryptography.AesGcm.%23ctor(System.ReadOnlySpan{System.Byte})](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.%2523ctor(System.ReadOnlySpan%7BSystem.Byte%7D))

## See also

- [API obsoletions with non-default diagnostic IDs (.NET 10)](../10.0/obsolete-apis.md)
- [API obsoletions with non-default diagnostic IDs (.NET 9)](../9.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 7)](../7.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 6)](../6.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 5)](../5.0/obsolete-apis-with-custom-diagnostics.md)
- [Obsolete features in .NET 5+](../../../../fundamentals/syslib-diagnostics/obsoletions-overview.md)
