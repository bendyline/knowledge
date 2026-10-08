---
description: "Learn more about: How to: Access Hardware Encryption Devices"
title: "How to: Access Hardware Encryption Devices"
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "encryption"
  - "key card"
  - "cryptography"
  - "hardware encryption"
  - "CspParameters"
---
# How to: Access hardware encryption devices

> **Note:**
> This article applies to Windows.

You can use the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) class to access hardware encryption devices. For example, you can use this class to integrate your application with a smart card, a hardware random number generator, or a hardware implementation of a particular cryptographic algorithm.

The [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) class creates a cryptographic service provider (CSP) that accesses a properly installed hardware encryption device.  You can verify the availability of a CSP by inspecting the following registry key using the Registry Editor (Regedit.exe):  HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Defaults\Provider.

### To sign data using a key card

1. Create a new instance of the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) class, passing the integer provider type and the provider name to the constructor.

2. Pass the appropriate flags to the [System.Security.Cryptography.CspParameters.Flags](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters.Flags) property of the newly created [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object.  For example, pass the [System.Security.Cryptography.CspProviderFlags.UseDefaultKeyContainer](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspProviderFlags.UseDefaultKeyContainer) flag.

3. Create a new instance of an [System.Security.Cryptography.AsymmetricAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm) class (for example, the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class), passing the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the constructor.

4. Sign your data using one of the `Sign` methods and verify your data using one of the `Verify` methods.

### To generate a random number using a hardware random number generator

1. Create a new instance of the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) class, passing the integer provider type and the provider name to the constructor.

2. Create a new instance of the [System.Security.Cryptography.RNGCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider), passing the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the constructor.

3. Create a random value using the [System.Security.Cryptography.RNGCryptoServiceProvider.GetBytes*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider.GetBytes*) or [System.Security.Cryptography.RNGCryptoServiceProvider.GetNonZeroBytes*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RNGCryptoServiceProvider.GetNonZeroBytes*) method.

## Example

The following code example demonstrates how to sign data using a smart card.  The code example creates a [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object that exposes a smart card, and then initializes an [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) object using the CSP.  The code example then signs and verifies some data.

Due to collision problems with SHA1, we recommend SHA256 or better.
[Cryptography.SmartCardCSP#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Cryptography.SmartCardCSP/CS/example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Cryptography.SmartCardCSP/CS/example.cs.md)
[Cryptography.SmartCardCSP#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Cryptography.SmartCardCSP/VB/example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Cryptography.SmartCardCSP/VB/example.vb.md)

## Compiling the Code

- Include the [System](https://learn.microsoft.com/search/?terms=System) and [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography) namespaces.

- You must have a smart card reader and drivers installed on your computer.

- You must initialize the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object using information specific to your card reader.  For more information, see the documentation of your card reader.

## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
