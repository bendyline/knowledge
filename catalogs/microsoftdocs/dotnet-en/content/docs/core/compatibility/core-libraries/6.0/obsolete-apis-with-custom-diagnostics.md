---
title: "Breaking change: .NET 6 obsoletions with non-default diagnostic IDs"
titleSuffix: ""
description: Learn about the .NET 6 breaking change in core .NET libraries where some APIs have been marked as obsolete with a custom diagnostic ID.
ms.date: 09/07/2021
---
# API obsoletions with non-default diagnostic IDs (.NET 6)

Some APIs have been marked as obsolete, starting in .NET 6. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is [CS0618](../../../../csharp/language-reference/compiler-messages/cs0618.md) for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 6 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - |
| [SYSLIB0013](../../../../fundamentals/syslib-diagnostics/syslib0013.md) | [System.Uri.EscapeUriString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeUriString(System.String)) can corrupt the URI string in some cases. Consider using [System.Uri.EscapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeDataString(System.String)) for query string components instead. | Warning |
| [SYSLIB0014](../../../../fundamentals/syslib-diagnostics/syslib0014.md) | [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest), [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest), [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint), and [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) are obsolete. Use [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instead. | Warning |
| [SYSLIB0015](../../../../fundamentals/syslib-diagnostics/syslib0015.md) | [System.Runtime.CompilerServices.DisablePrivateReflectionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DisablePrivateReflectionAttribute) has no effect in .NET 6+. | Warning |
| [SYSLIB0016](../../../../fundamentals/syslib-diagnostics/syslib0016.md) | Use the [System.Drawing.Graphics.GetContextInfo*](https://learn.microsoft.com/search/?terms=System.Drawing.Graphics.GetContextInfo*) overloads that accept arguments for better performance and fewer allocations. | Warning |
| [SYSLIB0017](../../../../fundamentals/syslib-diagnostics/syslib0017.md) | Strong-name signing is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0018](../../../../fundamentals/syslib-diagnostics/syslib0018.md) | Reflection-only loading is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0019](../../../../fundamentals/syslib-diagnostics/syslib0019.md) | The [System.Runtime.InteropServices.RuntimeEnvironment](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment) members [System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile), [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid%2CSystem.Guid)), and [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid%2CSystem.Guid)) are no longer supported and throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0020](../../../../fundamentals/syslib-diagnostics/syslib0020.md) | [System.Text.Json.JsonSerializerOptions.IgnoreNullValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreNullValues) is obsolete. To ignore null values when serializing, set [System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition) to [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull). | Warning |
| [SYSLIB0021](../../../../fundamentals/syslib-diagnostics/syslib0021.md) | Derived cryptographic types are obsolete. Use the `Create` method on the base type instead. | Warning |
| [SYSLIB0022](../../../../fundamentals/syslib-diagnostics/syslib0022.md) | The [System.Security.Cryptography.Rijndael](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael) and [System.Security.Cryptography.RijndaelManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RijndaelManaged) types are obsolete. Use [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) instead. | Warning |
| [SYSLIB0023](../../../../fundamentals/syslib-diagnostics/syslib0023.md) | [System.Security.Cryptography.RNGCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider) is obsolete. To generate a random number, use one of the [System.Security.Cryptography.RandomNumberGenerator](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator) static methods instead. | Warning |
| [SYSLIB0024](../../../../fundamentals/syslib-diagnostics/syslib0024.md) | Creating and unloading [AppDomains](https://learn.microsoft.com/search/?terms=System.AppDomain) is not supported and throws an exception. | Warning |
| [SYSLIB0025](../../../../fundamentals/syslib-diagnostics/syslib0025.md) | [System.Runtime.CompilerServices.SuppressIldasmAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SuppressIldasmAttribute) has no effect in .NET 6+. | Warning |
| [SYSLIB0026](../../../../fundamentals/syslib-diagnostics/syslib0026.md) | [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) and [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) are immutable. Use the appropriate constructor to create a new certificate. | Warning |
| [SYSLIB0027](../../../../fundamentals/syslib-diagnostics/syslib0027.md) | [System.Security.Cryptography.X509Certificates.PublicKey.Key](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.Key) is obsolete. Use the appropriate method to get the public key, such as [System.Security.Cryptography.X509Certificates.PublicKey.GetRSAPublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.GetRSAPublicKey). | Warning |
| [SYSLIB0028](../../../../fundamentals/syslib-diagnostics/syslib0028.md) | [System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey) is obsolete. Use the appropriate method to get the private key, such as [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)), or use the [System.Security.Cryptography.X509Certificates.X509Certificate2.CopyWithPrivateKey(System.Security.Cryptography.ECDiffieHellman)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.CopyWithPrivateKey(System.Security.Cryptography.ECDiffieHellman)) method to create a new instance with a private key. | Warning |
| [SYSLIB0029](../../../../fundamentals/syslib-diagnostics/syslib0029.md) | `ProduceLegacyHmacValues` is obsolete. Producing legacy HMAC values is no longer supported. | Warning |
| [SYSLIB0030](../../../../fundamentals/syslib-diagnostics/syslib0030.md) | `HMACSHA1` always uses the algorithm implementation provided by the platform. Use a constructor without the `useManagedSha1` parameter. | Warning |
| [SYSLIB0031](../../../../fundamentals/syslib-diagnostics/syslib0031.md) | [System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)) is obsolete. Use the ASN.1 functionality provided in [System.Formats.Asn1](https://learn.microsoft.com/search/?terms=System.Formats.Asn1). | Warning |
| [SYSLIB0032](../../../../fundamentals/syslib-diagnostics/syslib0032.md) | Recovery from corrupted process state exceptions is not supported; [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute) is ignored. | Warning |
| [SYSLIB0033](../../../../fundamentals/syslib-diagnostics/syslib0033.md) | [System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String%2CSystem.String%2CSystem.Int32%2CSystem.Byte%5B%5D)) is obsolete and is not supported. Use [System.Security.Cryptography.PasswordDeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.PasswordDeriveBytes.CryptDeriveKey(System.String%2CSystem.String%2CSystem.Int32%2CSystem.Byte%5B%5D)) instead. | Warning |
| [SYSLIB0034](../../../../fundamentals/syslib-diagnostics/syslib0034.md) | [System.Security.Cryptography.Pkcs.CmsSigner.%23ctor(System.Security.Cryptography.CspParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner.%2523ctor(System.Security.Cryptography.CspParameters)) is obsolete. Use an alternative constructor instead. | Warning |
| [SYSLIB0035](../../../../fundamentals/syslib-diagnostics/syslib0035.md) | [System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature) is obsolete. Use the overload that accepts a [System.Security.Cryptography.Pkcs.CmsSigner](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner) instead. | Warning |

## Version introduced

.NET 6

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0013

- [System.Uri.EscapeUriString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeUriString(System.String))

### SYSLIB0014

- [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest)
- [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest)
- [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint)
- [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient)

### SYSLIB0015

- [System.Runtime.CompilerServices.DisablePrivateReflectionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DisablePrivateReflectionAttribute)

### SYSLIB0016

- [System.Drawing.Graphics.GetContextInfo](https://learn.microsoft.com/search/?terms=System.Drawing.Graphics.GetContextInfo)

### SYSLIB0017

- [System.Reflection.AssemblyName.KeyPair](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.KeyPair)
- [System.Reflection.StrongNameKeyPair](https://learn.microsoft.com/search/?terms=System.Reflection.StrongNameKeyPair)

### SYSLIB0018

- [System.Reflection.Assembly.ReflectionOnlyLoad*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoad*)
- [System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String))
- [System.Type.ReflectionOnlyGetType(System.String,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.ReflectionOnlyGetType(System.String%2CSystem.Boolean%2CSystem.Boolean))

### SYSLIB0019

- [System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile)
- [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid%2CSystem.Guid))
- [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid%2CSystem.Guid))

### SYSLIB0020

- [System.Text.Json.JsonSerializerOptions.IgnoreNullValues](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.IgnoreNullValues)

### SYSLIB0021

- [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider)
- [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged)
- [System.Security.Cryptography.DESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DESCryptoServiceProvider)
- [System.Security.Cryptography.MD5CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.MD5CryptoServiceProvider)
- [System.Security.Cryptography.RC2CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RC2CryptoServiceProvider)
- [System.Security.Cryptography.SHA1CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1CryptoServiceProvider)
- [System.Security.Cryptography.SHA1Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1Managed)
- [System.Security.Cryptography.SHA256Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256Managed)
- [System.Security.Cryptography.SHA256CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256CryptoServiceProvider)
- [System.Security.Cryptography.SHA384Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA384Managed)
- [System.Security.Cryptography.SHA384CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA384CryptoServiceProvider)
- [System.Security.Cryptography.SHA512Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA512Managed)
- [System.Security.Cryptography.SHA512CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA512CryptoServiceProvider)
- [System.Security.Cryptography.TripleDESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDESCryptoServiceProvider)

### SYSLIB0022

- [System.Security.Cryptography.Rijndael](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael)
- [System.Security.Cryptography.RijndaelManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RijndaelManaged)

### SYSLIB0023

- [System.Security.Cryptography.RNGCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider)

### SYSLIB0024

- [System.AppDomain.CreateDomain(System.String)](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain(System.String))
- [System.AppDomain.Unload(System.AppDomain)](https://learn.microsoft.com/search/?terms=System.AppDomain.Unload(System.AppDomain))

### SYSLIB0025

- [System.Runtime.CompilerServices.SuppressIldasmAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SuppressIldasmAttribute)

### SYSLIB0026

- [System.Security.Cryptography.X509Certificates.X509Certificate.%23ctor](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.%2523ctor)
- [System.Security.Cryptography.X509Certificates.X509Certificate.Import*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.Import*)
- [System.Security.Cryptography.X509Certificates.X509Certificate2.%23ctor](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.%2523ctor)
- [System.Security.Cryptography.X509Certificates.X509Certificate2.Import*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.Import*)

### SYSLIB0027

- [System.Security.Cryptography.X509Certificates.PublicKey.Key](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.Key)

### SYSLIB0028

- [System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey)

### SYSLIB0029

- [System.Security.Cryptography.HMACSHA384.ProduceLegacyHmacValues](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA384.ProduceLegacyHmacValues)
- [System.Security.Cryptography.HMACSHA512.ProduceLegacyHmacValues](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA512.ProduceLegacyHmacValues)

### SYSLIB0030

- [System.Security.Cryptography.HMACSHA1.%23ctor(System.Byte\[\],System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA1.%2523ctor(System.Byte%5B%5D%2CSystem.Boolean))

### SYSLIB0031

- [System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.EncodeOID(System.String))

### SYSLIB0032

- [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute)

### SYSLIB0033

- [System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String%2CSystem.String%2CSystem.Int32%2CSystem.Byte%5B%5D))

### SYSLIB0034

- [System.Security.Cryptography.Pkcs.CmsSigner.%23ctor(System.Security.Cryptography.CspParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner.%2523ctor(System.Security.Cryptography.CspParameters))

### SYSLIB0035

- [System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature)

## See also

- [API obsoletions with non-default diagnostic IDs (.NET 7)](../7.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 5)](../5.0/obsolete-apis-with-custom-diagnostics.md)
- [Obsolete features in .NET 5+](../../../../fundamentals/syslib-diagnostics/obsoletions-overview.md)
