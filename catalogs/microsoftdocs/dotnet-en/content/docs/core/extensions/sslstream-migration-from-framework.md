---
title: Migrate SslStream code from .NET Framework to .NET
description: Learn how to migrate code that uses SslStream in .NET Framework to .NET.
author: rzikm
ms.author: radekzikmund
ms.date: 03/13/2023
---

# Migrate SslStream code from .NET Framework to .NET

.NET Core brought many improvements as well as breaking changes to how [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) works. The most important change related to network security is that the [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) class has been mostly obsoleted and affects only the legacy [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest) interface.

For each [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) instance, you must configure the allowed TLS protocols and certificate validation callbacks separately via [System.Net.Security.SslServerAuthenticationOptions](https://learn.microsoft.com/search/?terms=System.Net.Security.SslServerAuthenticationOptions) or [System.Net.Security.SslClientAuthenticationOptions](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions). To configure network security options used in HTTPS in [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient), you need to configure the security options in the underlying handler. The default handler used by [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler), which has an [System.Net.Http.SocketsHttpHandler.SslOptions](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler.SslOptions) property that accepts [System.Net.Security.SslClientAuthenticationOptions](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions).

Consider the following example that demonstrates how to create an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) with a custom certificate validation callback:

```csharp
bool CustomCertificateValidator(
    object sender,
    X509Certificate? certificate,
    X509Chain? chain,
    SslPolicyErrors sslPolicyErrors)
{
    // TODO: Always returns false. 
    // Need to implement certificate evaluation logic.
    return false;
}

HttpClient httpClient = new(
    new SocketsHttpHandler
    {
        SslOptions =
        {
            RemoteCertificateValidationCallback = CustomCertificateValidator
        }
    });
```

The following table shows how to migrate individual [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) properties related to TLS.

| Source API | Target API |
| --- | --- |
| [System.Net.ServicePointManager.CheckCertificateRevocationList](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.CheckCertificateRevocationList) | Set appropriate [System.Security.Cryptography.X509Certificates.X509RevocationMode](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509RevocationMode) on [System.Net.Security.SslClientAuthenticationOptions.CertificateRevocationCheckMode](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.CertificateRevocationCheckMode). |
| [System.Net.ServicePointManager.EncryptionPolicy](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.EncryptionPolicy) | Use [System.Net.Security.SslClientAuthenticationOptions.EncryptionPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.EncryptionPolicy). |
| [System.Net.ServicePointManager.SecurityProtocol](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.SecurityProtocol) | Use [System.Net.Security.SslClientAuthenticationOptions.EnabledSslProtocols](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.EnabledSslProtocols). |
| [System.Net.ServicePointManager.ServerCertificateValidationCallback](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.ServerCertificateValidationCallback) | Use [System.Net.Security.SslClientAuthenticationOptions.RemoteCertificateValidationCallback](https://learn.microsoft.com/search/?terms=System.Net.Security.SslClientAuthenticationOptions.RemoteCertificateValidationCallback). |
