---
title: Articles based on ASP.NET Core projects created with individual accounts
ai-usage: ai-assisted
author: tdykstra
description: ASP.NET Core individual accounts let you scaffold Identity UI, sign-in pages, and authentication code. Explore the authentication options and related articles.
ms.author: tdykstra
ms.date: 08/23/2026
ms.reviewer: tdykstra
uid: security/authentication/individual
---
# Articles based on ASP.NET Core projects created with individual accounts

ASP.NET Core Identity is included in project templates in Visual Studio with the "Individual Accounts" option.

The authentication templates are available in .NET CLI with `-au Individual`:

**Applies to: \>= aspnetcore-2.1**

```dotnetcli
dotnet new mvc -au Individual
dotnet new webapp -au Individual
```



**Applies to: \= aspnetcore-2.0**

```dotnetcli
dotnet new mvc -au Individual
dotnet new razor -au Individual
```



For more information about web API authentication, see [this GitHub issue](https://github.com/dotnet/AspNetCore/issues/5833).

<a name="no"></a>

## No Authentication

Specify authentication in the .NET CLI with the `-au` option. In Visual Studio, new web applications include the **Change Authentication** dialog. The default for new web apps in Visual Studio is **No Authentication**.

Projects created with no authentication:

* Don't contain web pages and UI to sign in and sign out.
* Don't contain authentication code.

<a name="win"></a>

## Windows Authentication

Specify Windows Authentication for new web apps in the .NET CLI with the `-au Windows` option. In Visual Studio, the **Change Authentication** dialog provides the **Windows Authentication** options.

If you select Windows Authentication, the app uses the [Windows Authentication IIS module](../../host-and-deploy/iis/modules.md). Windows Authentication is intended for Intranet web sites.

## dotnet new webapp authentication options

The following table shows the authentication options available for new web apps.

| Option | Type of authentication | Link for more information |
 | --- | --- | --- |
| None | No authentication. |  |
| Individual | Individual authentication. | [security/authentication/identity](identity.md) |
| IndividualB2C | Cloud-hosted individual authentication with Azure AD B2C. | [Azure AD B2C](https://learn.microsoft.com/azure/active-directory-b2c/) |
| SingleOrg | Organizational authentication for a single tenant. Entra External ID tenants also use SingleOrg. | [Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-web-app-sign-in) |
| MultiOrg | Organizational authentication for multiple tenants. | [Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-web-app-sign-in) |
| Windows | Windows authentication. | [Windows Authentication](windowsauth.md) |

<!-- UPDATE 15.0 - Remove this INCLUDE file and delete all content
                   on B2C when .NET 15 releases in 2030, which is 
                   when B2C support ends for existing customer
                   accounts established prior to 5/1/25. -->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see [Azure AD B2C: Frequently asked questions (FAQ)](https://learn.microsoft.com/azure/active-directory-b2c/faq).


## Visual Studio new webapp authentication options

The following table shows the authentication options available when creating a new web app with Visual Studio.

| Option | Type of authentication | Link for more information |
 | --- | --- | --- |
| None | No authentication |  |
| Individual Accounts / Store user accounts in-app | Individual authentication | [security/authentication/identity](identity.md) |
| Individual Accounts / Connect to an existing user store in the cloud | Cloud-hosted individual authentication with Azure AD B2C | [Azure AD B2C](https://learn.microsoft.com/azure/active-directory-b2c/) |
| Work or School Cloud / Single Org | Organizational authentication for a single tenant | [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-web-app-sign-in) |
| Work or School Cloud / Multiple Org | Organizational authentication for multiple tenants | [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-web-app-sign-in) |
| Windows | Windows authentication | [Windows Authentication](windowsauth.md) |

<!-- UPDATE 15.0 - Remove this INCLUDE file and delete all content
                   on B2C when .NET 15 releases in 2030, which is 
                   when B2C support ends for existing customer
                   accounts established prior to 5/1/25. -->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see [Azure AD B2C: Frequently asked questions (FAQ)](https://learn.microsoft.com/azure/active-directory-b2c/faq).


## Additional resources

The following articles show how to use the code generated in ASP.NET Core templates that use individual accounts:

* [Account confirmation and password recovery in ASP.NET Core](accconfirm.md)
* [Create an ASP.NET Core app with user data protected by authorization](../authorization/secure-data.md)
