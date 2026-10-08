---
title: Non-DI aware scenarios for Data Protection in ASP.NET Core
author: tdykstra
description: Learn how to support data protection scenarios where you can't or don't want to use a service provided by dependency injection.
ms.author: tdykstra
ms.date: 10/14/2016
uid: security/data-protection/configuration/non-di-scenarios
---
# Non-DI aware scenarios for Data Protection in ASP.NET Core

By [Rick Anderson](https://twitter.com/RickAndMSFT)

The ASP.NET Core Data Protection system is normally [added to a service container](../consumer-apis/overview.md) and consumed by dependent components via dependency injection (DI). However, there are cases where this isn't feasible or desired, especially when importing the system into an existing app.

To support these scenarios, the [Microsoft.AspNetCore.DataProtection.Extensions](https://www.nuget.org/packages/Microsoft.AspNetCore.DataProtection.Extensions/) package provides a concrete type, [Microsoft.AspNetCore.DataProtection.DataProtectionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionProvider), which offers a simple way to use Data Protection without relying on DI. The `DataProtectionProvider` type implements [Microsoft.AspNetCore.DataProtection.IDataProtectionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.IDataProtectionProvider). Constructing `DataProtectionProvider` only requires providing a [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo) instance to indicate where the provider's cryptographic keys should be stored, as seen in the following code sample:

[Code example (complete source file; reference: non-di-scenarios/\_static/nodisample1.cs)](../../../../_code/aspnetcore/security/data-protection/configuration/non-di-scenarios/_static/nodisample1.cs.md)

By default, the `DataProtectionProvider` concrete type doesn't encrypt raw key material before persisting it to the file system. This is to support scenarios where the developer points to a network share and the Data Protection system can't automatically deduce an appropriate at-rest key encryption mechanism.

Additionally, the `DataProtectionProvider` concrete type doesn't [isolate apps](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fconfiguration%2Foverview%23per-application-isolation) by default. All apps using the same key directory can share payloads as long as their [purpose parameters](../consumer-apis/purpose-strings.md) match.

The [Microsoft.AspNetCore.DataProtection.DataProtectionProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionProvider) constructor accepts an optional configuration callback that can be used to adjust the behaviors of the system. The sample below demonstrates restoring isolation with an explicit call to [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%252A). The sample also demonstrates configuring the system to automatically encrypt persisted keys using Windows DPAPI. If the directory points to a UNC share, you may wish to distribute a shared certificate across all relevant machines and to configure the system to use certificate-based encryption with a call to [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate%252A).

[Code example (complete source file; reference: non-di-scenarios/\_static/nodisample2.cs)](../../../../_code/aspnetcore/security/data-protection/configuration/non-di-scenarios/_static/nodisample2.cs.md)

> **Tip:**
> Instances of the `DataProtectionProvider` concrete type are expensive to create. If an app maintains multiple instances of this type and if they're all using the same key storage directory, app performance might degrade. If you use the `DataProtectionProvider` type, we recommend that you create this type once and reuse it as much as possible. The `DataProtectionProvider` type and all [Microsoft.AspNetCore.DataProtection.IDataProtector](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.IDataProtector) instances created from it are thread-safe for multiple callers.
