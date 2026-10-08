---
title: TLS/SSL best practices
description: Learn the best practices when using SslStream in .NET.
author: rzikm
ms.author: radekzikmund
ms.date: 08/26/2026
ai-usage: ai-assisted
---

# TLS/SSL best practices

TLS (Transport Layer Security) is a cryptographic protocol designed to secure communication between two computers over the internet. The TLS protocol is exposed in .NET via the [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) class.

This article presents best practices for setting up secure communication between client and server and assumes use of .NET. For best practices with .NET Framework, see [Transport Layer Security (TLS) best practices with the .NET Framework](../../framework/network-programming/tls.md).

## Select TLS version

While it is possible to specify the version of the TLS protocol to be used via the [System.Net.Security.SslClientAuthenticationOptions.EnabledSslProtocols](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.EnabledSslProtocols) property, it is recommended to defer to the operating system settings by using [System.Security.Authentication.SslProtocols.None](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols.None) value (this is the default).

Deferring the decision to the OS automatically uses the most recent version of TLS available and lets the application pick up changes after OS upgrades. The operating system may also prevent use of TLS versions which are no longer considered secure.

## Select cipher suites

`SslStream` allows users to specify which cipher suites can be negotiated by the TLS handshake via the [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) class. As with TLS versions, it's recommended to let the OS decide which are the best cipher suites to negotiate with, and, therefore, it's recommended to avoid using [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy).

> **Note:**
> [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) is not supported on Windows and attempts to instantiate it will cause [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) to be thrown.

## Specify a local certificate

When authenticating as a server, [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) always requires a certificate. When authenticating as a client, you also provide a certificate if the server requests one for mutual TLS (mTLS). In both roles, the certificate must be an [System.Security.Cryptography.X509Certificates.X509Certificate2](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2) instance that contains the private key.

Recent .NET versions handle the server and client sides symmetrically, so the following guidance applies whether the application authenticates as a server, a client, or both.

You can provide the certificate to [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) in several ways.

When you authenticate as a server:

- Set the [System.Net.Security.SslServerAuthenticationOptions.ServerCertificate](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.ServerCertificate) property, or pass the certificate to [System.Net.Security.SslStream.AuthenticateAsServerAsync*](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.AuthenticateAsServerAsync*).
- Return the certificate from the [System.Net.Security.SslServerAuthenticationOptions.ServerCertificateSelectionCallback](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.ServerCertificateSelectionCallback) callback.
- Set a [System.Net.Security.SslStreamCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext) on the [System.Net.Security.SslServerAuthenticationOptions.ServerCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.ServerCertificateContext) property.

When you authenticate as a client:

- Add the certificate to the [System.Net.Security.SslClientAuthenticationOptions.ClientCertificates](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.ClientCertificates) collection, or pass a collection that contains it to [System.Net.Security.SslStream.AuthenticateAsClientAsync*](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.AuthenticateAsClientAsync*).
- Return the certificate from the [System.Net.Security.SslClientAuthenticationOptions.LocalCertificateSelectionCallback](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.LocalCertificateSelectionCallback) callback.
- Set a [System.Net.Security.SslStreamCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext) on the [System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext) property.

> **Note:**
> The [System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext) property is available starting in .NET 8.

For better performance, use the certificate context property ([System.Net.Security.SslServerAuthenticationOptions.ServerCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.ServerCertificateContext) or [System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.ClientCertificateContext)). When you provide the certificate in one of the other ways, [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) creates a [System.Net.Security.SslStreamCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext) internally. Creating the context builds an [System.Security.Cryptography.X509Certificates.X509Chain](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Chain), which is a CPU-intensive operation, so it's more efficient to create the context once and reuse it across multiple [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) instances.

Reusing a [System.Net.Security.SslStreamCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext) instance also enables extra features such as [TLS session resumption](https://datatracker.ietf.org/doc/html/rfc5077) on Linux servers.

### Send intermediate certificates to the peer

When an intermediate certificate authority issues the local certificate, the peer might not be able to build the full certificate chain unless the handshake includes the intermediate certificates. To send these intermediates, create a [System.Net.Security.SslStreamCertificateContext](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext) with the [System.Net.Security.SslStreamCertificateContext.Create*](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStreamCertificateContext.Create*) method and pass the intermediate certificates in the `additionalCertificates` parameter:

```csharp
X509Certificate2 leafCertificate = GetLeafCertificate();
X509Certificate2Collection intermediates = GetIntermediateCertificates();

SslStreamCertificateContext certificateContext =
    SslStreamCertificateContext.Create(leafCertificate, intermediates);

// When you authenticate as a server.
serverOptions.ServerCertificateContext = certificateContext;

// When you authenticate as a client for mutual TLS.
clientOptions.ClientCertificateContext = certificateContext;
```

The context works the same way for both roles. On the client side, the certificate context is the recommended way to send intermediates, because the alternative—adding the intermediates to the machine or user certificate store—affects every application on the system.

## Custom `X509Certificate` validation

There are certain scenarios in which the default certificate validation procedure isn't adequate and some custom validation logic is required. Parts of the validation logic can be customized by specifying [System.Net.Security.SslClientAuthenticationOptions.CertificateChainPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.CertificateChainPolicy) or [System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy). Alternatively, completely custom logic can be provided via the <System.Net.Security.SslClientAuthenticationOptions.RemoteCertificateValidationCallback> property. For more information, see [Custom certificate trust](#custom-certificate-trust).

### Custom certificate trust

When encountering a certificate that wasn't issued by any of the certificate authorities trusted by the machine (including self-signed certificates), the default certificate validation procedure will fail. One possible way to resolve this is to add the necessary issuer certificates to the machine's trusted store. That, however, might affect other applications on the system and is not always possible.

The alternative solution is to specify custom trusted root certificates via an [System.Security.Cryptography.X509Certificates.X509ChainPolicy](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509ChainPolicy). To specify a custom trust list that will be used instead of the system trust list during validation, consider the following example:

```csharp
SslClientAuthenticationOptions clientOptions = new();

clientOptions.CertificateChainPolicy = new X509ChainPolicy()
{
    TrustMode = X509ChainTrustMode.CustomRootTrust,
    CustomTrustStore =
    {
        customIssuerCert
    }
};
```

Clients configured with the preceding policy would only accept certificates trusted by `customIssuerCert`.

### Ignore specific validation errors

Consider an IoT device without a persistent clock. After powering on, the clock of the device would start many years in the past and, therefore, all certificates would be considered "not yet valid". Consider the following code that shows a validation callback implementation ignoring validity period violations.

```csharp
static bool CustomCertificateValidationCallback(
    object sender,
    X509Certificate? certificate,
    X509Chain? chain,
    SslPolicyErrors sslPolicyErrors)
{
    // Anything that would have been accepted by default is OK
    if (sslPolicyErrors == SslPolicyErrors.None)
    {
        return true;
    }

    // If there is something wrong other than a chain processing error, don't trust it.
    if (sslPolicyErrors != SslPolicyErrors.RemoteCertificateChainErrors)
    {
        return false;
    }

    Debug.Assert(chain is not null);

    // If the reason for RemoteCertificateChainError is that the chain built empty, don't trust it.
    if (chain.ChainStatus.Length == 0)
    {
        return false;
    }

    foreach (X509ChainStatus status in chain.ChainStatus)
    {
        // If an error other than `NotTimeValid` (or `NoError`) is present, don't trust it.
        if ((status.Status & ~X509ChainStatusFlags.NotTimeValid) != X509ChainStatusFlags.NoError)
        {
            return false;
        }
    }

    return true;
}
```

### Certificate pinning

Another situation where custom certificate validation is necessary is when clients expect servers to use a specific certificate, or a certificate from a small set of known certificates. This practice is known as [certificate pinning](https://owasp.org/www-community/controls/Certificate_and_Public_Key_Pinning). The following code snippet shows a validation callback which checks that the server presents a certificate with a specific known public key.

```csharp
static bool CustomCertificateValidationCallback(
    object sender,
    X509Certificate? certificate,
    X509Chain? chain,
    SslPolicyErrors sslPolicyErrors)
{
    // If there is something wrong other than a chain processing error, don't trust it.
    if ((sslPolicyErrors & ~SslPolicyErrors.RemoteCertificateChainErrors) != 0)
    {
        return false;
    }

    Debug.Assert(certificate is not null);

    const string ExpectedPublicKey =
        "3082010A0282010100C204ECF88CEE04C2B3D850D57058CC9318EB5C" +
        "A86849B022B5F9959EB12B2C763E6CC04B604C4CEAB2B4C00F80B6B0" +
        "F972C98602F95C415D132B7F71C44BBCE9942E5037A6671C618CF641" +
        "42C546D31687279F74EB0A9D11522621736C844C7955E4D16BE8063D" +
        "481552ADB328DBAAFF6EFF60954A776B39F124D131B6DD4DC0C4FC53" +
        "B96D42ADB57CFEAEF515D23348E72271C7C2147A6C28EA374ADFEA6C" +
        "B572B47E5AA216DC69B15744DB0A12ABDEC30F47745C4122E19AF91B" +
        "93E6AD2206292EB1BA491C0C279EA3FB8BF7407200AC9208D98C5784" +
        "538105CBE6FE6B5498402785C710BB7370EF6918410745557CF9643F" +
        "3D2CC3A97CEB931A4C86D1CA850203010001";

    return certificate.GetPublicKeyString().Equals(ExpectedPublicKey);
}
```

## Considerations for client certificate validation

Server applications need to be careful when requiring and validating client certificates. Certificates may contain the [AIA (Authority Information Access)](http://www.pkiglobe.org/auth_info_access.html) extension which specifies where the issuer certificate can be downloaded. The server may therefore attempt to download the issuer certificate from external server when building the [System.Security.Cryptography.X509Certificates.X509Chain](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Chain) for the client certificate. Similarly, servers may need to contact external servers to ensure that the client certificate has not been revoked.

The need to contact external servers when building and validating the [System.Security.Cryptography.X509Certificates.X509Chain](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Chain) might expose the application to denial of service attacks if the external servers are slow to respond. Therefore, server applications should configure the [System.Security.Cryptography.X509Certificates.X509Chain](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Chain) building behavior using the [System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy).

> **Note:**
> Starting in .NET 11, `SslStream` disables AIA certificate downloads by default when validating client certificates as a server. If no custom [System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions.CertificateChainPolicy) is provided, the server won't attempt to fetch missing intermediate certificates via AIA. For more information, see [SslStream server-side AIA certificate downloads disabled by default](../compatibility/networking/11/sslstream-aia-downloads-disabled.md).
