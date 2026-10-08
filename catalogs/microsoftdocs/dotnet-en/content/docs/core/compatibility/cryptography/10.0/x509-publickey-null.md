---
title: "Breaking change - X509Certificate and PublicKey key parameters can be null"
description: "Learn about the breaking change in .NET 10 where key parameters in X509Certificate and PublicKey can be null."
ms.date: 3/13/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/45325
---

# X509Certificate and PublicKey key parameters can be null

The behavior of [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) and [System.Security.Cryptography.X509Certificates.PublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey) has changed. When these objects contain a key without algorithm parameters, they now return `null` instead of an empty array.

## Version introduced

.NET 10

## Previous behavior

Previously, [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) or [System.Security.Cryptography.X509Certificates.PublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey) objects that contained a key without algorithm parameters returned an empty array when accessing the key algorithm parameters.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
// parameters would be an empty array if no algorithm parameters were present
```

## New behavior

Starting in .NET 10, [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) or [System.Security.Cryptography.X509Certificates.PublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey) objects that contain a key without algorithm parameters return `null` when accessing the key algorithm parameters.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
// parameters will be null if no algorithm parameters are present
```

## Type of breaking change

This is both a [behavioral](../../categories.md#behavioral-change) and [source compatibility](../../categories.md#source-compatibility) change.

## Reason for change

The [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate), [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2), and [System.Security.Cryptography.X509Certificates.PublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey) classes expose information about the *Subject Public Key Info*. One of the properties of the *Subject Public Key Info* is the parameters for the algorithm. A *Subject Public Key Info* is not required to contain algorithm parameters. Previously, this was represented as an empty byte array, which is not valid ASN.1. Attempting to encode or decode it would result in an exception. To more clearly represent absent key parameters, `null` is now returned, and the members that return algorithm parameters have been annotated to return nullable values.

## Recommended action

When accessing a member that returns information about a subject public key info's algorithm parameters, expect the member to possibly return `null` and handle the `null` value accordingly.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
if (parameters == null)
{
    // Handle the absence of algorithm parameters
}
```

## Affected APIs

- [System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParameters)
- [System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParametersString](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParametersString)
- [System.Security.Cryptography.X509Certificates.PublicKey.%23ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.AsnEncodedData,System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.%2523ctor(System.Security.Cryptography.Oid%2CSystem.Security.Cryptography.AsnEncodedData%2CSystem.Security.Cryptography.AsnEncodedData))
- [System.Security.Cryptography.X509Certificates.PublicKey.EncodedParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.PublicKey.EncodedParameters)
