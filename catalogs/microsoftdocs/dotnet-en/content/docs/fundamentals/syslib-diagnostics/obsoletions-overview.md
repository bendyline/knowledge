---
title: Obsolete features in .NET 5+
description: Learn about APIs that are marked as obsolete in .NET 5 and later versions that produce SYSLIB compiler warnings.
ms.date: 04/03/2026
ai-usage: ai-assisted
---

# Obsolete features in .NET 5+

Starting in .NET 5, some APIs that are newly marked as obsolete make use of two new properties on [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute).

- The [System.ObsoleteAttribute.DiagnosticId](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute.DiagnosticId) property tells the compiler to generate build warnings using a custom diagnostic ID. The custom ID allows for obsoletion warning to be suppressed specifically and separately from one another. In the case of the `System*` namespace obsoletions, the format for the custom diagnostic ID is `SYSLIB0XXX`. In the case of the `Microsoft.Extensions` obsoletions, the format for the custom diagnostic ID is `EXTOBS0XXX`.
- The [System.ObsoleteAttribute.UrlFormat](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute.UrlFormat) property tells the compiler to include a URL link to learn more about the obsoletion.

If you encounter build warnings or errors due to usage of an obsolete API, follow the specific guidance provided for the diagnostic ID listed in the reference tables that follow. Warnings or errors for these obsoletions *can't* be suppressed using the [standard diagnostic ID (CS0618)](../../csharp/language-reference/compiler-messages/cs0618.md) for obsolete types or members; use the custom `SYSLIB0XXX` or `EXTOBS0XXX` diagnostic ID values instead. For more information, see [Suppress warnings](#suppress-warnings).

The following tables provide an index to obsolete APIs with custom diagnostic IDs in .NET 5 and later versions:

- [SYSLIB obsoletions](#syslib-obsoletions)
- [EXTOBS obsoletions](#extobs-obsoletions)

## SYSLIB obsoletions

The following table lists the `SYSLIB0XXX` obsoletions in .NET 5+.

| Diagnostic ID | Warning or error | Description |
| --- | --- | --- |
| [SYSLIB0001](syslib0001.md) | Warning | The UTF-7 encoding is insecure and should not be used. Consider using UTF-8 instead. |
| [SYSLIB0002](syslib0002.md) | Error | [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute) is not honored by the runtime and must not be used. |
| [SYSLIB0003](syslib0003.md) | Warning | Code access security (CAS) is not supported or honored by the runtime. |
| [SYSLIB0004](syslib0004.md) | Warning | The constrained execution region (CER) feature is not supported. |
| [SYSLIB0005](syslib0005.md) | Warning | The global assembly cache (GAC) is not supported. |
| [SYSLIB0006](syslib0006.md) | Warning | [System.Threading.Thread.Abort](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort) is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0007](syslib0007.md) | Warning | The default implementation of this cryptography algorithm is not supported. |
| [SYSLIB0008](syslib0008.md) | Warning | The [System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator) API is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0009](syslib0009.md) | Warning | [System.Net.AuthenticationManager](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager) is not supported. Methods will no-op or throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0010](syslib0010.md) | Warning | Some remoting APIs are not supported and throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0011](syslib0011.md) | Warning | [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) serialization is obsolete and should not be used. |
| [SYSLIB0012](syslib0012.md) | Warning | [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase) and [System.Reflection.Assembly.EscapedCodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.EscapedCodeBase) are only included for .NET Framework compatibility. Use [System.Reflection.Assembly.Location](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Location) instead. |
| [SYSLIB0013](syslib0013.md) | Warning | [System.Uri.EscapeUriString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeUriString(System.String)) can corrupt the Uri string in some cases. Consider using [System.Uri.EscapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeDataString(System.String)) for query string components instead. |
| [SYSLIB0014](syslib0014.md) | Warning | [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest), [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest), [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint), and [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) are obsolete. Use [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instead. |
| [SYSLIB0015](syslib0015.md) | Warning | [System.Runtime.CompilerServices.DisablePrivateReflectionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DisablePrivateReflectionAttribute) has no effect in .NET 6+. |
| [SYSLIB0016](syslib0016.md) | Warning | Use the [System.Drawing.Graphics.GetContextInfo*](https://learn.microsoft.com/search/?terms=System.Drawing.Graphics.GetContextInfo*) overloads that accept arguments for better performance and fewer allocations. |
| [SYSLIB0017](syslib0017.md) | Warning | Strong-name signing is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0018](syslib0018.md) | Warning | Reflection-only loading is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0019](syslib0019.md) | Warning | The [System.Runtime.InteropServices.RuntimeEnvironment](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment) members [System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile), [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid%2CSystem.Guid)), and [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid%2CSystem.Guid)) are no longer supported and throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). |
| [SYSLIB0020](syslib0020.md) | Warning | [System.Text.Json.JsonSerializerOptions.IgnoreNullValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreNullValues) is obsolete. To ignore null values when serializing, set [System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition) to [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull). |
| [SYSLIB0021](syslib0021.md) | Warning | Derived cryptographic types are obsolete. Use the `Create` method on the base type instead. |
| [SYSLIB0022](syslib0022.md) | Warning | The [System.Security.Cryptography.Rijndael](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael) and [System.Security.Cryptography.RijndaelManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RijndaelManaged) types are obsolete. Use [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) instead. |
| [SYSLIB0023](syslib0023.md) | Warning | [System.Security.Cryptography.RNGCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider) is obsolete. To generate a random number, use one of the [System.Security.Cryptography.RandomNumberGenerator](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator) static methods instead. |
| [SYSLIB0024](syslib0024.md) | Warning | Creating and unloading [AppDomains](https://learn.microsoft.com/search/?terms=System.AppDomain) is not supported and throws an exception. |
| [SYSLIB0025](syslib0025.md) | Warning | [System.Runtime.CompilerServices.SuppressIldasmAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SuppressIldasmAttribute) has no effect in .NET 6+. |
| [SYSLIB0026](syslib0026.md) | Warning | [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) and [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) are immutable. Use the appropriate constructor to create a new certificate. |
| [SYSLIB0027](syslib0027.md) | Warning | [System.Security.Cryptography.X509Certificates.PublicKey.Key](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.Key) is obsolete. Use the appropriate method to get the public key, such as [System.Security.Cryptography.X509Certificates.PublicKey.GetRSAPublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.GetRSAPublicKey). |
| [SYSLIB0028](syslib0028.md) | Warning | [System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey) is obsolete. Use the appropriate method to get the private key, such as [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)), or use the [System.Security.Cryptography.X509Certificates.X509Certificate2.CopyWithPrivateKey(System.Security.Cryptography.ECDiffieHellman)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.CopyWithPrivateKey(System.Security.Cryptography.ECDiffieHellman)) method to create a new instance with a private key. |
| [SYSLIB0029](syslib0029.md) | Warning | `ProduceLegacyHmacValues` is obsolete. Producing legacy HMAC values is no longer supported. |
| [SYSLIB0030](syslib0030.md) | Warning | `HMACSHA1` always uses the algorithm implementation provided by the platform. Use a constructor without the `useManagedSha1` parameter. |
| [SYSLIB0031](syslib0031.md) | Warning | [System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)) is obsolete. Use the ASN.1 functionality provided in [System.Formats.Asn1](https://learn.microsoft.com/search/?terms=System.Formats.Asn1). |
| [SYSLIB0032](syslib0032.md) | Warning | Recovery from corrupted process state exceptions is not supported; [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute) is ignored. |
| [SYSLIB0033](syslib0033.md) | Warning | [System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String%2CSystem.String%2CSystem.Int32%2CSystem.Byte%5B%5D)) is obsolete and is not supported. Use [System.Security.Cryptography.PasswordDeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.PasswordDeriveBytes.CryptDeriveKey(System.String%2CSystem.String%2CSystem.Int32%2CSystem.Byte%5B%5D)) instead. |
| [SYSLIB0034](syslib0034.md) | Warning | [System.Security.Cryptography.Pkcs.CmsSigner.%23ctor(System.Security.Cryptography.CspParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner.%2523ctor(System.Security.Cryptography.CspParameters)) is obsolete. Use an alternative constructor instead. |
| [SYSLIB0035](syslib0035.md) | Warning | [System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature) is obsolete. Use the overload that accepts a [System.Security.Cryptography.Pkcs.CmsSigner](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner) instead. |
| [SYSLIB0036](syslib0036.md) | Warning | [System.Text.RegularExpressions.Regex.CompileToAssembly*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.CompileToAssembly*) is obsolete and not supported. Use `RegexGeneratorAttribute` with the regular expression source generator instead. |
| [SYSLIB0037](syslib0037.md) | Warning | [System.Reflection.AssemblyName](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName) members [System.Reflection.AssemblyName.HashAlgorithm](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.HashAlgorithm), [System.Reflection.AssemblyName.ProcessorArchitecture](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.ProcessorArchitecture), and [System.Reflection.AssemblyName.VersionCompatibility](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.VersionCompatibility) are obsolete and not supported. |
| [SYSLIB0038](syslib0038.md) | Warning | [System.Data.SerializationFormat.Binary](https://learn.microsoft.com/search/?terms=System.Data.SerializationFormat.Binary) is obsolete and should not be used. |
| [SYSLIB0039](syslib0039.md) | Warning | TLS versions 1.0 and 1.1 have known vulnerabilities and are not recommended. Use a newer TLS version instead, or use [System.Security.Authentication.SslProtocols.None](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols.None) to defer to OS defaults. |
| [SYSLIB0040](syslib0040.md) | Warning | [System.Net.Security.EncryptionPolicy.NoEncryption](https://learn.microsoft.com/search/?terms=System.Net.Security.EncryptionPolicy.NoEncryption) and [System.Net.Security.EncryptionPolicy.AllowNoEncryption](https://learn.microsoft.com/search/?terms=System.Net.Security.EncryptionPolicy.AllowNoEncryption) significantly reduce security and should not be used in production code. |
| [SYSLIB0041](syslib0041.md) | Warning | The default hash algorithm and iteration counts in [System.Security.Cryptography.Rfc2898DeriveBytes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes) constructors are outdated and insecure. Use a constructor that accepts the hash algorithm and the number of iterations. |
| [SYSLIB0042](syslib0042.md) | Warning | `ToXmlString` and `FromXmlString` have no implementation for elliptic curve cryptography (ECC) types, and are obsolete. Use a standard import and export format such as `ExportSubjectPublicKeyInfo` or `ImportSubjectPublicKeyInfo` for public keys, and `ExportPkcs8PrivateKey` or `ImportPkcs8PrivateKey` for private keys. |
| [SYSLIB0043](syslib0043.md) | Warning | [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray) and the associated constructor do not have a consistent and interoperable implementation on all platforms. Use [System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo) instead. |
| [SYSLIB0044](syslib0044.md) | Warning | [System.Reflection.AssemblyName.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.CodeBase) and [System.Reflection.AssemblyName.EscapedCodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.EscapedCodeBase) are obsolete. Using them for loading an assembly is not supported. |
| [SYSLIB0045](syslib0045.md) | Warning | Cryptographic factory methods accepting an algorithm name are obsolete. Use the parameterless `Create` factory method on the algorithm type instead. |
| [SYSLIB0046](syslib0046.md) | Warning | The [System.Runtime.ControlledExecution.Run(System.Action,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Runtime.ControlledExecution.Run(System.Action%2CSystem.Threading.CancellationToken)) method might corrupt the process and should not be used in production code. |
| [SYSLIB0047](syslib0047.md) | Warning | [System.Xml.XmlSecureResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlSecureResolver) is obsolete. Use `XmlResolver.ThrowingResolver` instead when attempting to forbid XML external entity resolution. |
| [SYSLIB0048](syslib0048.md) | Warning | [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D)) and [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D)) are obsolete. Use [System.Security.Cryptography.RSA.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Encrypt*) and [System.Security.Cryptography.RSA.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Decrypt*) instead. |
| [SYSLIB0049](syslib0049.md) | Warning | JsonSerializerOptions.AddContext is obsolete. To register a JsonSerializerContext, use either the TypeInfoResolver or TypeInfoResolverChain property. |
| [SYSLIB0050](syslib0050.md) | Warning | Formatter-based serialization is obsolete and should not be used. |
| [SYSLIB0051](syslib0051.md) | Warning | APIs that support obsolete formatter-based serialization are obsolete. They should not be called or extended by application code. |
| [SYSLIB0052](syslib0052.md) | Warning | APIs that support obsolete mechanisms for Regex extensibility are obsolete. |
| [SYSLIB0053](syslib0053.md) | Warning | [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) should indicate the required tag size for encryption and decryption. Use a constructor that accepts the tag size. |
| [SYSLIB0054](syslib0054.md) | Warning | [System.Threading.Thread.VolatileRead*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.VolatileRead*) and [System.Threading.Thread.VolatileWrite*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.VolatileWrite*) are obsolete. Use [System.Threading.Volatile.Read*](https://learn.microsoft.com/search/?terms=System.Threading.Volatile.Read*) or [System.Threading.Volatile.Write*](https://learn.microsoft.com/search/?terms=System.Threading.Volatile.Write*) instead. |
| [SYSLIB0055](syslib0055.md) | Warning | `AdvSimd.ShiftRightLogicalRoundedNarrowingSaturate*` methods with signed parameters are obsolete. Use the unsigned overloads instead. |
| [SYSLIB0056](syslib0056.md) | Warning | `Assembly.LoadFrom` with a custom `AssemblyHashAlgorithm` is obsolete. Use overloads without an `AssemblyHashAlgorithm`. |
| [SYSLIB0057](syslib0057.md) | Warning | `X509Certificate2` and `X509Certificate` constructors for binary and file content are obsolete. |
| [SYSLIB0058](syslib0058.md) | Warning | The `KeyExchangeAlgorithm`, `KeyExchangeStrength`, `CipherAlgorithm`, `CipherAlgorithmStrength`, `HashAlgorithm`, and `HashStrength` properties of [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) are obsolete. Use [System.Net.Security.SslStream.NegotiatedCipherSuite](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.NegotiatedCipherSuite) instead. |
| [SYSLIB0059](syslib0059.md) | Warning | [Microsoft.Win32.SystemEvents.EventsThreadShutdown](https://learn.microsoft.com/search/?terms=Microsoft.Win32.SystemEvents.EventsThreadShutdown) callbacks aren't run before the process exits. Use [System.AppDomain.ProcessExit](https://learn.microsoft.com/search/?terms=System.AppDomain.ProcessExit) instead. |
| [SYSLIB0060](syslib0060.md) | Warning | Constructors on [System.Security.Cryptography.Rfc2898DeriveBytes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes) are obsolete. Use [System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*) instead. |
| [SYSLIB0061](syslib0061.md) | Warning | The `Queryable` [System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MaxBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) and [System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MinBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) taking an `IComparer<TSource>` are obsolete. Use the new ones that take an `IComparer<TKey>`. |
| [SYSLIB0062](syslib0062.md) | Warning | [System.Xml.Xsl.XsltSettings.EnableScript](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings.EnableScript) is obsolete. |
| [SYSLIB0063](syslib0063.md) | Warning | The [System.IO.Pipes.NamedPipeClientStream](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeClientStream) constructor that has an `isConnected` parameter is obsolete because the argument has no effect. Use the constructor that accepts `direction`, `isAsync`, and `safePipeHandle`. |
| [SYSLIB0064](syslib0064.md) | Warning | [System.Security.Cryptography.RSACryptoServiceProvider.Encrypt(System.Byte\[\],System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.Encrypt(System.Byte%5B%5D%2CSystem.Boolean)) and [System.Security.Cryptography.RSACryptoServiceProvider.Decrypt(System.Byte\[\],System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.Decrypt(System.Byte%5B%5D%2CSystem.Boolean)) are obsolete. Use the overloads that accept an [System.Security.Cryptography.RSAEncryptionPadding](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAEncryptionPadding) instead. |
| [SYSLIB0065](syslib0065.md) | Warning | The `set` accessor of [System.Security.Cryptography.AsnEncodedData.RawData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsnEncodedData.RawData) is obsolete. Use the constructor of the appropriate type to decode data, or use [System.Security.Cryptography.AsnEncodedData.CopyFrom(System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsnEncodedData.CopyFrom(System.Security.Cryptography.AsnEncodedData)) for mutable scenarios. |

## EXTOBS obsoletions

The following table lists the `EXTOBS0XXX` obsoletions from the `Microsoft.Extensions` libraries.

| Diagnostic ID | Warning or error | Description |
| --- | --- | --- |
| [EXTOBS0001](extobs0001.md) | Warning | [Microsoft.Extensions.Diagnostics.ResourceMonitoring.IResourceMonitor](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ResourceMonitoring.IResourceMonitor) is obsolete and will be removed in a future version. Consider using [Resource Monitoring observable instruments](../../core/diagnostics/built-in-metrics-diagnostics.md#microsoftextensionsdiagnosticsresourcemonitoring). |
| [EXTOBS0002](extobs0002.md) | Warning | The `AddServiceLogEnricher` extension methods have been marked as obsolete starting in package version 10.1.0. The methods enrich application logs, not service logs, so they have been replaced with correctly named `AddApplicationLogEnricher` methods. |

## Suppress warnings

It's recommended that you use an available workaround whenever possible. However, if you can't change your code, you can suppress warnings through a `#pragma` directive or a `<NoWarn>` project setting. If you must use the obsolete APIs, and the `SYSLIB0XXX` or `EXTOBS0XXX` diagnostic doesn't surface as an error, you can suppress the warning in code or in your project file.

To suppress the warnings in code:

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0001

// Code that uses obsolete API.
//...

// Re-enable the warning.
#pragma warning restore SYSLIB0001
```

To suppress the warnings in a project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   <TargetFramework>net6.0</TargetFramework>
   <!-- NoWarn below suppresses SYSLIB0001 project-wide -->
   <NoWarn>$(NoWarn);SYSLIB0001</NoWarn>
   <!-- To suppress multiple warnings, you can use multiple NoWarn elements -->
   <NoWarn>$(NoWarn);SYSLIB0002</NoWarn>
   <NoWarn>$(NoWarn);SYSLIB0003</NoWarn>
   <!-- Alternatively, you can suppress multiple warnings by using a semicolon-delimited list -->
   <NoWarn>$(NoWarn);SYSLIB0001;SYSLIB0002;SYSLIB0003</NoWarn>
  </PropertyGroup>
</Project>
```

> **Note:**
> Suppressing warnings in this way only disables the obsoletion warnings you specify. It doesn't disable any other warnings, including obsoletion warnings with different diagnostic IDs.

## See also

- [API obsoletions with non-default diagnostic IDs (.NET 8)](../../core/compatibility/core-libraries/8.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 9)](../../core/compatibility/core-libraries/9.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 10)](../../core/compatibility/core-libraries/10.0/obsolete-apis.md)
