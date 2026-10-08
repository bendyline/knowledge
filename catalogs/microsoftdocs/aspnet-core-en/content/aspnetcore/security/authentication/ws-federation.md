---
title: Authenticate users with WS-Federation in ASP.NET Core
ai-usage: ai-assisted
author: chlowell
description: This tutorial demonstrates how to use WS-Federation in an ASP.NET Core app.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.custom: sfi-image-nochange
ms.date: 08/22/2026
uid: security/authentication/ws-federation
---
# Authenticate users with WS-Federation in ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


This tutorial demonstrates how to enable users to sign in with a WS-Federation authentication provider like Active Directory Federation Services (ADFS) or [Microsoft Entra ID](https://learn.microsoft.com/azure/active-directory/). It uses the ASP.NET Core sample app described in [Facebook, Google, and external provider authentication](social/index.md).

For ASP.NET Core apps, WS-Federation support is provided by [Microsoft.AspNetCore.Authentication.WsFederation](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.WsFederation). This component is ported from [Microsoft.Owin.Security.WsFederation](https://www.nuget.org/packages/Microsoft.Owin.Security.WsFederation) and shares many of that component's mechanics. However, the components differ in a couple of important ways.

By default, the new middleware:

* Doesn't allow unsolicited logins. This feature of the WS-Federation protocol is vulnerable to XSRF attacks. However, it can be enabled with the `AllowUnsolicitedLogins` option.
* Doesn't check every form post for sign-in messages. Only requests to the `CallbackPath` are checked for sign-ins. `CallbackPath` defaults to `/signin-wsfed` but can be changed via the inherited [Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath%252A) property of the [Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions) class. This path can be shared with other authentication providers by enabling the [Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions.SkipUnrecognizedRequests%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions.SkipUnrecognizedRequests%252A) option.

## Register the app with Active Directory

### Active Directory Federation Services

* Open the server's **Add Relying Party Trust Wizard** from the ADFS Management console:

Add Relying Party Trust Wizard: Welcome

* Choose to enter data manually:

Add Relying Party Trust Wizard: Select Data Source

* Enter a display name for the relying party. The name isn't important to the ASP.NET Core app.

* [Microsoft.AspNetCore.Authentication.WsFederation](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.WsFederation) lacks support for token encryption, so don't configure a token encryption certificate:

Add Relying Party Trust Wizard: Configure Certificate

* Enable support for WS-Federation Passive protocol, using the app's URL. Verify the port is correct for the app:

Add Relying Party Trust Wizard: Configure URL

> **Note:**
> This must be an HTTPS URL. IIS Express can provide a self-signed certificate when hosting the app during development. Kestrel requires manual certificate configuration. See the [Kestrel documentation](../../fundamentals/servers/kestrel.md) for more details.

* Click **Next** through the rest of the wizard and **Close** at the end.

* ASP.NET Core Identity requires a **Name ID** claim. Add one from the **Edit Claim Rules** dialog:

Edit Claim Rules

* In the **Add Transform Claim Rule Wizard**, leave the default **Send LDAP Attributes as Claims** template selected, and click **Next**. Add a rule mapping the **SAM-Account-Name** LDAP attribute to the **Name ID** outgoing claim:

Add Transform Claim Rule Wizard: Configure Claim Rule

* Click **Finish** > **OK** in the **Edit Claim Rules** window.

### Microsoft Entra ID

Microsoft Entra ID can serve as the app's WS-Federation identity provider. Identity provider setup is maintained in the Microsoft Entra documentation. To register the app, follow the [Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app) quickstart.

After registering the app, provide the following two values to the WS-Federation middleware:

* `MetadataAddress`: The **Federation Metadata Document** URL, listed under the app registration's **Endpoints**.
* `Wtrealm`: The **Application ID URI**, configured under the app registration's **Expose an API**.

## Use WS-Federation without ASP.NET Core Identity

The WS-Federation middleware can be used without Identity. For example:

**Applies to: \>= aspnetcore-3.0**

[language="csharp" source="ws-federation/samples/StartupNon31.cs" id="snippet"::: (complete source file; reference: ws-federation/samples/StartupNon31.cs)](../../../_code/aspnetcore/security/authentication/ws-federation/samples/StartupNon31.cs.md)



**Applies to: < aspnetcore-3.0**

[language="csharp" source="ws-federation/samples/StartupNon21.cs" id="snippet"::: (complete source file; reference: ws-federation/samples/StartupNon21.cs)](../../../_code/aspnetcore/security/authentication/ws-federation/samples/StartupNon21.cs.md)



## Add WS-Federation as an external login provider for ASP.NET Core Identity

* Add a dependency on [Microsoft.AspNetCore.Authentication.WsFederation](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.WsFederation) to the project.

* Add WS-Federation to `Startup.ConfigureServices`:

**Applies to: \>= aspnetcore-3.0**

[language="csharp" source="ws-federation/samples/Startup31.cs" id="snippet"::: (complete source file; reference: ws-federation/samples/Startup31.cs)](../../../_code/aspnetcore/security/authentication/ws-federation/samples/Startup31.cs.md)



**Applies to: < aspnetcore-3.0**

[language="csharp" source="ws-federation/samples/Startup21.cs" id="snippet"::: (complete source file; reference: ws-federation/samples/Startup21.cs)](../../../_code/aspnetcore/security/authentication/ws-federation/samples/Startup21.cs.md)



<!--Don't update this for 2.2, use the 2.2 version -->
The [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.String)) overload sets the [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme%252A) property. The [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.AspNetCore.Authentication.AuthenticationOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.Action%7BMicrosoft.AspNetCore.Authentication.AuthenticationOptions%7D)) overload allows configuring authentication options, which can be used to set up default authentication schemes for different purposes. Subsequent calls to `AddAuthentication` override previously configured [Microsoft.AspNetCore.Builder.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthenticationOptions) properties.

[Microsoft.AspNetCore.Authentication.AuthenticationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilder) extension methods that register an authentication handler may only be called once per authentication scheme. Overloads exist that allow configuring the scheme properties, scheme name, and display name.


### Log in with WS-Federation

Browse to the app and click the **Log in** link in the nav header. There's an option to log in with WsFederation:

Log in page

With ADFS as the provider, the button redirects to an ADFS sign-in page:

ADFS sign-in page

With Microsoft Entra ID as the provider, the button redirects to a Microsoft Entra ID sign-in page:

Microsoft Entra ID sign-in page

A successful sign-in for a new user redirects to the app's user registration page:

Register page
