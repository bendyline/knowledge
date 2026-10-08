---
title: Enable a web application that calls web API options by using Azure Active Directory B2C
description:  This article discusses how to enable the use of a web application that calls web API options in several ways.

author: kengaderdus
manager: CelesteDG
ms.service: entra-id

ms.topic: reference
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: "b2c-support"


#Customer intent: As a web developer using Azure AD B2C, I want to configure authentication options in my web app that calls a web API, so that I can customize and enhance the authentication experience for my users.

---

# Configure authentication options in a web app that calls a web API by using Azure AD B2C 

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

This article describes ways you can customize and enhance the Azure Active Directory B2C (Azure AD B2C) authentication experience for your web application that calls a web API. Before you start, familiarize yourself with the following articles: 
* [Configure authentication in a sample web application](configure-authentication-sample-web-app-with-api.md)
* [Enable authentication in your own web application](enable-authentication-web-app-with-api.md).

## Use a custom domain

By using a [custom domain](custom-domain.md), you can fully brand the authentication URL. From a user perspective, users remain on your domain during the authentication process, rather than being redirected to the Azure AD B2C b2clogin.com domain name.

To remove all references to "b2c" in the URL, you can also replace your B2C tenant name, contoso.onmicrosoft.com, in the authentication request URL with your tenant ID GUID. For example, you can change `https://fabrikamb2c.b2clogin.com/contoso.onmicrosoft.com/` to `https://account.contosobank.co.uk/<tenant ID GUID>/`.
 

To use a custom domain and your tenant ID in the authentication URL, follow the guidance in [Enable custom domains](custom-domain.md). Under the project root folder, open the `appsettings.json` file. This file contains information about your Azure AD B2C identity provider. 

- Update the `Instance` entry with your custom domain.
- Update the `Domain` entry with your [tenant ID]( tenant-management-read-tenant-name.md#get-your-tenant-id). For more information, see [Use tenant ID](custom-domain.md#optional-use-tenant-id).

The app settings *before* the change are shown in the following JSON code: 

```json
"AzureAdB2C": {
  "Instance": "https://contoso.b2clogin.com",
  "Domain": "tenant-name.onmicrosoft.com",
  ...
}
```  

The app settings *after* the change are shown in the following JSON code: 

```json
"AzureAdB2C": {
  "Instance": "https://login.contoso.com",
  "Domain": "00000000-0000-0000-0000-000000000000",
  ...
}
``` 

## Support advanced scenarios

The `AddMicrosoftIdentityWebAppAuthentication` method in the Microsoft identity platform API lets developers add code for advanced authentication scenarios or subscribe to OpenIdConnect events. For example, you can subscribe to OnRedirectToIdentityProvider, with which you can customize the authentication request your app sends to Azure AD B2C.

To support advanced scenarios, open the *Startup.cs* file and, in the `ConfigureServices` function, replace the `AddMicrosoftIdentityWebAppAuthentication` with the following code snippet: 

```csharp
// Configuration to sign in users with Azure AD B2C

//services.AddMicrosoftIdentityWebAppAuthentication(Configuration, "AzureAdB2C");

services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
        .AddMicrosoftIdentityWebApp(options =>
{
    Configuration.Bind("AzureAdB2C", options);
    options.Events ??= new OpenIdConnectEvents();
    options.Events.OnRedirectToIdentityProvider += OnRedirectToIdentityProviderFunc;
});
```

The code above adds the OnRedirectToIdentityProvider event with a reference to the *OnRedirectToIdentityProviderFunc* method. Add the following code snippet to the `Startup.cs` class.

```csharp
private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
{
    // Custom code here
    
    // Don't remove this line
    await Task.CompletedTask.ConfigureAwait(false);
}
```

You can pass parameters between your controller and the *OnRedirectToIdentityProvider* function using context parameters. 


## Prepopulate the sign-in name

During a sign-in user journey, your app might target a specific user. When an app targets a user, it can specify in the authorization request the `login_hint` query parameter with the user's sign-in name. Azure AD B2C automatically populates the sign-in name, and the user needs to provide only the password. 

To prepopulate the sign-in name, do the following:

1. If you're using a custom policy, add the required input claim, as described in [Set up direct sign-in](direct-signin.md#prepopulate-the-sign-in-name). 

1. Complete the [Support advanced scenarios](#support-advanced-scenarios) procedure.

1. Add the following line of code to the *OnRedirectToIdentityProvider* function:
    
    ```csharp
    private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
    {
      context.ProtocolMessage.LoginHint = "emily@contoso.com";
      
      // More code
      await Task.CompletedTask.ConfigureAwait(false);
    }
    ```

## Preselect an identity provider

If you configured the sign-in journey for your application to include social accounts, such as Facebook, LinkedIn, or Google, you can specify the `domain_hint` parameter. This query parameter provides a hint to Azure AD B2C about the social identity provider that should be used for sign-in. For example, if the application specifies `domain_hint=facebook.com`, the sign-in flow goes directly to the Facebook sign-in page. 

To redirect users to an external identity provider, do the following:


1. Check the domain name of your external identity provider. For more information, see [Redirect sign-in to a social provider](direct-signin.md#redirect-sign-in-to-a-social-provider).
1. Complete the [Support advanced scenarios](#support-advanced-scenarios) procedure. 
1. In the *OnRedirectToIdentityProviderFunc* function, add the following line of code to the *OnRedirectToIdentityProvider* function:
    
    ```csharp
    private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
    {
      context.ProtocolMessage.DomainHint = "facebook.com";
      
      // More code
      await Task.CompletedTask.ConfigureAwait(false);
    }
    ```

## Specify the UI language

Language customization in Azure AD B2C allows your user flow to accommodate a variety of languages to suit your customers' needs. For more information, see [Language customization](language-customization.md).

To set the preferred language, do the following:


1. [Configure Language customization](language-customization.md).
1. Complete the [Support advanced scenarios](#support-advanced-scenarios) procedure.
1. Add the following line of code to the *OnRedirectToIdentityProvider* function:

    ```csharp
    private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
    {
      context.ProtocolMessage.UiLocales = "es";

      // More code
      await Task.CompletedTask.ConfigureAwait(false);
    }
    ```

## Pass a custom query string parameter

With custom policies, you can pass a custom query string parameter. A good use-case example is when you want to [dynamically change the page content](customize-ui-with-html.md?pivots=b2c-custom-policy#configure-dynamic-custom-page-content-uri).

To pass a custom query string parameter, do the following:

1. Configure the [ContentDefinitionParameters](customize-ui-with-html.md#configure-dynamic-custom-page-content-uri) element.
1. Complete the [Support advanced scenarios](#support-advanced-scenarios) procedure.
1. Add the following line of code to the *OnRedirectToIdentityProvider* function:
    
    ```csharp
    private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
    {
      context.ProtocolMessage.Parameters.Add("campaignId", "123");

      // More code
      await Task.CompletedTask.ConfigureAwait(false);
    }
    ```

## Pass an ID token hint

A relying party application can send an inbound JSON Web Token (JWT) as part of the OAuth2 authorization request.  The inbound token is a hint about the user or the authorization request. Azure AD B2C validates the token and then extracts the claim.

To include an ID token hint in the authentication request, do the following:
 
1. Complete the [Support advanced scenarios](#support-advanced-scenarios) procedure.
1. In your custom policy, define an [ID token hint technical profile](id-token-hint.md).
1. Add the following line of code to the *OnRedirectToIdentityProvider* function:
    
    ```csharp
    private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
    {
      // The idTokenHint variable holds your ID token 
      context.ProtocolMessage.IdTokenHint = idTokenHint

      // More code
      await Task.CompletedTask.ConfigureAwait(false);
    }
    ```
    
## Account controller

If you want to customize a *sign-in*, *sign-up*, or *sign-out* action, we encourage you to create your own controller. When you have your own controller, you can pass parameters between your controller and the authentication library. The `AccountController` is part of `Microsoft.Identity.Web.UI` NuGet package, which handles the sign-in and sign-out actions. You can find its implementation in the [Microsoft Identity Web library](https://github.com/AzureAD/microsoft-identity-web/blob/master/src/Microsoft.Identity.Web.UI/Areas/MicrosoftIdentity/Controllers/AccountController.cs). 

The following code snippet demonstrates a custom `MyAccountController` with the **SignIn** action. The action passes a parameter named `campaign_id` to the authentication library.

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace mywebapp.Controllers
{
    [AllowAnonymous]
    [Area("MicrosoftIdentity")]
    [Route("[area]/[controller]/[action]")]
    public class MyAccountController : Controller
    {

        [HttpGet("{scheme?}")]
        public IActionResult SignIn([FromRoute] string scheme)
        {
            scheme ??= OpenIdConnectDefaults.AuthenticationScheme;
            var redirectUrl = Url.Content("~/");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            properties.Items["campaign_id"] = "1234";
            return Challenge(properties, scheme);
        }

    }
}

```

In the `_LoginPartial.cshtml` view, change the sign-in link to your controller

```
<form method="get" asp-area="MicrosoftIdentity" asp-controller="MyAccount" asp-action="SignIn">
```

In the `OnRedirectToIdentityProvider`, in the `Startup.cs` calls, you can read the custom parameter:

```csharp
private async Task OnRedirectToIdentityProviderFunc(RedirectContext context)
{
    // Read the custom parameter
    var campaign_id = (context.Properties.Items.ContainsKey("campaign_id"))
    
    // Add your custom code here
    
    await Task.CompletedTask.ConfigureAwait(false);
}
```

## Role-based access control

With [authorization in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authorization/introduction) you can use [role-based authorization](https://learn.microsoft.com/aspnet/core/security/authorization/roles), [claims-based authorization](https://learn.microsoft.com/aspnet/core/security/authorization/claims), or [policy-based authorization](https://learn.microsoft.com/aspnet/core/security/authorization/policies) to check to see whether the user is authorized to access a protected resource.

In the *ConfigureServices* method, add the *AddAuthorization* method, which adds the authorization model. The following example creates a policy named `EmployeeOnly`. The policy checks to see whether a claim `EmployeeNumber` exists. The value of the claim must be one of the following IDs: 1, 2, 3, 4 or 5.

```csharp
services.AddAuthorization(options =>
    {
        options.AddPolicy("EmployeeOnly", policy =>
              policy.RequireClaim("EmployeeNumber", "1", "2", "3", "4", "5"));
    });
```

You control authorization in ASP.NET Core by using [AuthorizeAttribute](https://learn.microsoft.com/aspnet/core/security/authorization/simple) and its various parameters. When you apply the most basic form of the `[Authorize]` attribute to a controller, action, or Razor Page, you limit access to that component's authenticated users.

You apply policies to controllers by using the `[Authorize]` attribute with the policy name. The following code limits access to the `Claims` action to users who are authorized by the `EmployeeOnly` policy:

```csharp
[Authorize(Policy = "EmployeeOnly")]
public IActionResult Claims()
{
    return View();
}
```

## Next steps

To learn more, see [Introduction to authorization in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authorization/introduction).
