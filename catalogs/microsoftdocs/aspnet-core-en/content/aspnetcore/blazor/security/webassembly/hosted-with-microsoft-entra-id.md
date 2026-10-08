---
title: Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID
author: guardrex
description: Learn how to secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID.
monikerRange: '>= aspnetcore-3.1 < aspnetcore-8.0'
ms.author: wpickett
ms.custom: devx-track-csharp
ms.date: 11/11/2025
uid: blazor/security/webassembly/hosted-with-microsoft-entra-id
---
# Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID

> **Important:**
> The Hosted Blazor WebAssembly project template was removed from the framework with the release of .NET 8 (November, 2023). The guidance in this article is only supported for .NET 7 or earlier. Hosted Blazor WebAssembly apps that are upgraded each release continue to receive product support. Alternatively, refactor the app into either a standalone Blazor WebAssembly app or a Blazor Web App.


<!-- UPDATE 15.0 - Remove this INCLUDE file and delete all content
                   on B2C when .NET 15 releases in 2030, which is 
                   when B2C support ends for existing customer
                   accounts established prior to 5/1/25. -->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see [Azure AD B2C: Frequently asked questions (FAQ)](https://learn.microsoft.com/azure/active-directory-b2c/faq).


This article explains how to create a [hosted Blazor WebAssembly solution](https://learn.microsoft.com/search/?terms=blazor%2Fhosting-models%23blazor-webassembly) that uses [Microsoft Entra ID (ME-ID)](https://azure.microsoft.com/services/active-directory/) for authentication. This article focuses on a single tenant app with a single tenant Azure app registration.

This article doesn't cover a *multi-tenant ME-ID registration*. For more information, see [Making your application multi-tenant](https://learn.microsoft.com/entra/identity-platform/howto-convert-app-to-be-multi-tenant).

This article focuses on the use of a **Microsoft Entra** tenant, as described in [Quickstart: Set up a tenant](https://learn.microsoft.com/entra/identity-platform/quickstart-create-new-tenant). If the app is registered in an **Azure Active Directory B2C** tenant, as described in [Tutorial: Create an Azure Active Directory B2C tenant](https://learn.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant) but follows the guidance in this article, the App ID URI is managed differently by ME-ID. For more information, see the [Use of an Azure Active Directory B2C tenant](#use-of-an-azure-active-directory-b2c-tenant) section of this article.

For additional security scenario coverage after reading this article, see [blazor/security/webassembly/additional-scenarios](additional-scenarios.md).

## Walkthrough

The subsections of the walkthrough explain how to:

* Create a tenant in Azure
* Register a server API app in Azure
* Register a client app in Azure
* Create the Blazor app
* Modify the **Server** `appsettings.json` configuration
* Modify the default access token scope scheme
* Run the app

### Create a tenant in Azure

Follow the guidance in [Quickstart: Set up a tenant](https://learn.microsoft.com/entra/identity-platform/quickstart-create-new-tenant) to create a tenant in ME-ID.

### Register a server API app in Azure

Register an ME-ID app for the *Server API app*:

1. Navigate to [**Microsoft Entra ID** in the Azure portal](https://entra.microsoft.com/#home). Select **Applications** > **App registrations** in the sidebar. Select the **New registration** button.
1. Provide a **Name** for the app (for example, **Blazor Server ME-ID**).
1. Choose a **Supported account types**. You may select **Accounts in this organizational directory only** (single tenant) for this experience.
1. The *Server API app* doesn't require a **Redirect URI** in this scenario, so leave the **Select a platform** dropdown list unselected and don't enter a redirect URI.
1. This article assumes the app is registered in a **Microsoft Entra** tenant. If the app is registered in an **Azure Active Directory B2C** tenant, the **Permissions** > **Grant admin consent to openid and offline_access permissions** checkbox is present and selected. Deselect the checkbox to disable the setting. When using an **Active Azure Directory** tenant, the checkbox isn't present.
1. Select **Register**.

Record the following information:

* *Server API app* Application (client) ID (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`)
* Directory (tenant) ID (for example, `aaaabbbb-0000-cccc-1111-dddd2222eeee`)
* ME-ID Primary/Publisher/Tenant domain (for example, `contoso.onmicrosoft.com`): The domain is available as the **Publisher domain** in the **Branding** blade of the Azure portal for the registered app.

In **API permissions**, remove the **Microsoft Graph** > **User.Read** permission, as the server API app doesn't require additional API access for merely signing in users and calling server API endpoints.

In **Expose an API**:

1. Confirm or add the **App ID URI** in the format `api://{SERVER API APP CLIENT ID}`.
1. Select **Add a scope**.
1. Select **Save and continue**.
1. Provide a **Scope name** (for example, `API.Access`).
1. Provide an **Admin consent display name** (for example, `Access API`).
1. Provide an **Admin consent description** (for example, `Allows the app to access server app API endpoints.`).
1. Confirm that the **State** is set to **Enabled**.
1. Select **Add scope**.

Record the following information:

* App ID URI GUID (for example, record `00001111-aaaa-2222-bbbb-3333cccc4444` from the App ID URI of `api://00001111-aaaa-2222-bbbb-3333cccc4444`)
* Scope name (for example, `API.Access`)

> **Important:**
> If a custom value is used for the App ID URI, configuration changes are required to both the **Server** and **Client** apps after the apps are created from the Blazor WebAssembly project template. For more information, see the [Use of a custom App ID URI](#use-of-a-custom-app-id-uri) section.

### Register a client app in Azure

Register an ME-ID app for the *Client app*:

1. Navigate to **Microsoft Entra ID** in the Azure portal. Select **App registrations** in the sidebar. Select the **New registration** button.
1. Provide a **Name** for the app (for example, **Blazor Client ME-ID**).
1. Choose a **Supported account types**. You may select **Accounts in this organizational directory only** (single tenant) for this experience.
1. Set the **Redirect URI** dropdown list to **Single-page application (SPA)** and provide the following redirect URI: `https://localhost/authentication/login-callback`. If you know the production redirect URI for the Azure default host (for example, `azurewebsites.net`) or the custom domain host (for example, `contoso.com`), you can also add the production redirect URI at the same time that you're providing the `localhost` redirect URI. Be sure to include the port number for non-`:443` ports in any production redirect URIs that you add.
1. This article assumes the app is registered in a **Microsoft Entra** tenant. If the app is registered in an **Azure Active Directory B2C** tenant, the **Permissions** > **Grant admin consent to openid and offline_access permissions** checkbox is present and selected. Deselect the checkbox to disable the setting. When using an **Active Azure Directory** tenant, the checkbox isn't present.
1. Select **Register**.

> **Note:**
> Supplying the port number for a `localhost` ME-ID redirect URI isn't required. For more information, see [Redirect URI (reply URL) restrictions and limitations: Localhost exceptions (Entra documentation)](https://learn.microsoft.com/entra/identity-platform/reply-url#localhost-exceptions).

Record the **Client** app Application (client) ID (for example, `11112222-bbbb-3333-cccc-4444dddd5555`).

In **Authentication** > **Platform configurations** > **Single-page application**:

1. Confirm the redirect URI of `https://localhost/authentication/login-callback` is present.
1. In the **Implicit grant** section, ensure that the checkboxes for **Access tokens** and **ID tokens** aren't selected. **Implicit grant isn't recommended for Blazor apps using MSAL v2.0 or later.** For more information, see [blazor/security/webassembly/index#use-the-authorization-code-flow-with-pkce](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Findex%23use-the-authorization-code-flow-with-pkce).
1. The remaining defaults for the app are acceptable for this experience.
1. Select the **Save** button if you made changes.

In **API permissions**:

1. Confirm that the app has **Microsoft Graph** > **User.Read** permission.
1. Select **Add a permission** followed by **My APIs**.
1. Select the *Server API app* from the **Name** column (for example, **Blazor Server ME-ID**). You must be an owner of the app registration (and the API app registration if it's a separate app) in order to see the API in the **My APIs** area of the Azure portal. For more information, see [Assign application owner (Microsoft Entra documentation)](https://learn.microsoft.com/entra/identity-platform/quickstart-configure-app-expose-web-apis#assign-application-owner).
1. Open the **API** list.
1. Enable access to the API (for example, `API.Access`).
1. Select **Add permissions**.
1. Select the **Grant admin consent for {TENANT NAME}** button. Select **Yes** to confirm.

> **Important:**
> If you don't have the authority to grant admin consent to the tenant in the last step of **API permissions** configuration because consent to use the app is delegated to users, then you must take the following additional steps:
>
> * The app must use a [trusted publisher domain](https://learn.microsoft.com/entra/identity-platform/howto-configure-publisher-domain).
> * In the **`Server`** app's configuration in the Azure portal, select **Expose an API**. Under **Authorized client applications**, select the button to **Add a client application**. Add the **`Client`** app's Application (client) ID (for example, `11112222-bbbb-3333-cccc-4444dddd5555`).


### Create the Blazor app

In an empty folder, replace the placeholders in the following command with the information recorded earlier and execute the command in a command shell:

```dotnetcli
dotnet new blazorwasm -au SingleOrg --api-client-id "{SERVER API APP CLIENT ID}" --app-id-uri "{SERVER API APP ID URI GUID}" --client-id "{CLIENT APP CLIENT ID}" --default-scope "{DEFAULT SCOPE}" --domain "{TENANT DOMAIN}" -ho -o {PROJECT NAME} --tenant-id "{TENANT ID}"
```

> **Warning:**
> **Avoid using dashes (`-`) in the app name `{PROJECT NAME}` that break the formation of the OIDC app identifier.** Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives. For more information, see [Dashes in a hosted Blazor WebAssembly project name break OIDC security (dotnet/aspnetcore #35337)](https://github.com/dotnet/aspnetcore/issues/35337).

| Placeholder | Azure portal name | Example |
| --- | --- | --- |
| `{PROJECT NAME}` | &mdash; | `BlazorSample` |
| `{CLIENT APP CLIENT ID}` | Application (client) ID for the **Client** app | `11112222-bbbb-3333-cccc-4444dddd5555` |
| `{DEFAULT SCOPE}` | Scope name | `API.Access` |
| `{SERVER API APP CLIENT ID}` | Application (client) ID for the *Server API app* | `00001111-aaaa-2222-bbbb-3333cccc4444` |
| `{SERVER API APP ID URI GUID}` | Application ID URI GUID | `00001111-aaaa-2222-bbbb-3333cccc4444` (GUID ONLY, matches the `{SERVER API APP CLIENT ID}`) |
| `{TENANT DOMAIN}` | Primary/Publisher/Tenant domain | `contoso.onmicrosoft.com` |
| `{TENANT ID}` | Directory (tenant) ID | `aaaabbbb-0000-cccc-1111-dddd2222eeee` |

The output location specified with the `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name. **Avoid using dashes (`-`) in the app name that break the formation of the OIDC app identifier (see the earlier WARNING).**

> **Important:**
> If a custom value is used for the App ID URI, configuration changes are required to both the **Server** and **Client** apps after the apps are created from the Blazor WebAssembly project template. For more information, see the [Use of a custom App ID URI](#use-of-a-custom-app-id-uri) section.

### Run the app

Run the app from the **`Server`** project. When using Visual Studio, either:

* Select the dropdown arrow next to the **Run** button. Open **Configure Startup Projects** from the dropdown list. Select the **Single startup project** option. Confirm or change the project for the startup project to the **`Server`** project.

* Confirm that the **`Server`** project is highlighted in **Solution Explorer** before you start the app with any of the following approaches:

  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press <kbd>F5</kbd>.

* In a command shell, navigate to the **`Server`** project folder of the solution. Execute the `dotnet watch` (or `dotnet run`) command.


## Configure `User.Identity.Name`

*The guidance in this section covers optionally populating `User.Identity.Name` with the value from the `name` claim.*

The **Server** app API populates `User.Identity.Name` with the value from the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` claim type (for example, `bbbb0000-cccc-1111-dddd-2222eeee3333@contoso.onmicrosoft.com`).

To configure the app to receive the value from the `name` claim type:

* Add a namespace for [Microsoft.AspNetCore.Authentication.JwtBearer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer) to the `Program` file:

  ```csharp
  using Microsoft.AspNetCore.Authentication.JwtBearer;
  ```

* Configure the [Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType) of the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions).

  ```csharp
  builder.Services.Configure<JwtBearerOptions>(
      JwtBearerDefaults.AuthenticationScheme, options =>
      {
          options.TokenValidationParameters.NameClaimType = "name";
      });
  ```

## Remote authentication paths

*This section pertains to the solution's **Client** app.*

Remote authentication paths are customized using [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationApplicationPathsOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationApplicationPathsOptions) on the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%601.AuthenticationPaths%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%25601.AuthenticationPaths%252A) property in the app's `Program` file. For the framework's default path values, see the [`dotnet/aspnetcore` reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly.Authentication/src/RemoteAuthenticationDefaults.cs).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


If an app [customizes a remote authentication path](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23customize-app-routes), take either of the following approaches:

* Match the path in hard-coded strings around the app.

* Inject [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%25601) to obtain the configured value around the app. The following example demonstrates the approach for the [`RedirectToLogin` component](#redirecttologin-component).

  Add the following Razor directives to the top of the component's Razor file:

  ```razor
  @using Microsoft.Extensions.Options
  @inject IOptionsSnapshot<RemoteAuthenticationOptions<ApiAuthorizationProviderOptions>> RemoteOptions
  ```

  Modify the component's redirect in the `OnInitialized` method:

  ```diff
  - Navigation.NavigateToLogin("authentication/login");
  + Navigation.NavigateToLogin(RemoteOptions.Get(Options.DefaultName)
  +     .AuthenticationPaths.LogInPath);
  ```

  > **Note:**
  > If other paths differ from the project template's paths or [framework's default paths](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly.Authentication/src/RemoteAuthenticationDefaults.cs), manage them in the same fashion.


## Parts of the solution

This section describes the parts of a solution generated from the Blazor WebAssembly project template and describes how the solution's **Client** and **Server** projects are configured for reference. There's no specific guidance to follow in this section for a basic working application if you created the app using the guidance in the [Walkthrough](#walkthrough) section. The guidance in this section is helpful for updating an app to authenticate and authorize users. However, an alternative approach to updating an app is to create a new app from the guidance in the [Walkthrough](#walkthrough) section and moving the app's components, classes, and resources to the new app.

### `appsettings.json` configuration

*This section pertains to the solution's **Server** app.*

The `appsettings.json` file contains the options to configure the JWT bearer handler used to validate access tokens. Add the following `AzureAd` configuration section:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "{TENANT DOMAIN}",
    "TenantId": "{TENANT ID}",
    "ClientId": "{SERVER API APP CLIENT ID}",
    "CallbackPath": "/signin-oidc",
    "Scopes": "{SCOPES}"
  }
}
```

Example:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "contoso.onmicrosoft.com",
    "TenantId": "aaaabbbb-0000-cccc-1111-dddd2222eeee",
    "ClientId": "00001111-aaaa-2222-bbbb-3333cccc4444",
    "CallbackPath": "/signin-oidc",
    "Scopes": "API.Access"
  }
}
```

> **Important:**
> If the **Server** app is registered to use a custom App ID URI in ME-ID (not in the default format `api://{SERVER API APP CLIENT ID}`), see the [Use of a custom App ID URI](#use-of-a-custom-app-id-uri) section. Changes are required in both the **Server** and **Client** apps.

### Authentication package

*This section pertains to the solution's **Server** app.*

The support for authenticating and authorizing calls to ASP.NET Core web APIs with the Microsoft identity platform is provided by the [`Microsoft.Identity.Web` package](https://www.nuget.org/packages/Microsoft.Identity.Web).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


The **Server** app of a hosted Blazor solution created from the Blazor WebAssembly template includes the [`Microsoft.Identity.Web.UI` package](https://www.nuget.org/packages/Microsoft.Identity.Web.UI). The package adds UI for user authentication in web apps and isn't used by the Blazor framework. If the **Server** app won't be used to authenticate users directly, it's safe to remove the package reference from the **Server** app's project file.

### Authentication service support

*This section pertains to the solution's **Server** app.*

The `AddAuthentication` method sets up authentication services within the app and configures the JWT bearer handler as the default authentication method. The [Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilderExtensions.AddMicrosoftIdentityWebApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilderExtensions.AddMicrosoftIdentityWebApi%252A) method configures services to protect the web API with Microsoft identity platform v2.0. This method expects an `AzureAd` section in the app's configuration with the necessary settings to initialize authentication options.

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));
```

> **Note:**
> When a single authentication scheme is registered, the authentication scheme is automatically used as the app's default scheme, and it isn't necessary to state the scheme to [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) or via [Microsoft.AspNetCore.Authentication.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions). For more information, see [security/authentication/index#defaultscheme](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Findex%23defaultscheme) and the [ASP.NET Core announcement (aspnet/Announcements #490)](https://github.com/aspnet/Announcements/issues/490).


[Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) ensure that:

* The app attempts to parse and validate tokens on incoming requests.
* Any request attempting to access a protected resource without proper credentials fails.

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

### WeatherForecast controller

*This section pertains to the solution's **Server** app.*

The `WeatherForecast` controller (`Controllers/WeatherForecastController.cs`) exposes a protected API with the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) applied to the controller. It's **important** to understand that:

* The [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) in this API controller is the only thing that protects this API from unauthorized access.
* The [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) used in the Blazor WebAssembly app only serves as a hint to the app that the user should be authorized for the app to work correctly.

```csharp
[Authorize]
[ApiController]
[Route("[controller]")]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        ...
    }
}
```

### `wwwroot/appsettings.json` configuration

*This section pertains to the solution's **Client** app.*

Configuration is supplied by the `wwwroot/appsettings.json` file:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT APP CLIENT ID}",
    "ValidateAuthority": true
  }
}
```

Example:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/e86c78e2-...-918e0565a45e",
    "ClientId": "11112222-bbbb-3333-cccc-4444dddd5555",
    "ValidateAuthority": true
  }
}
```

### Authentication package

*This section pertains to the solution's **Client** app.*

When an app is created to use Work or School Accounts (`SingleOrg`), the app automatically receives a package reference for the [Microsoft Authentication Library](https://learn.microsoft.com/entra/identity-platform/msal-overview) ([`Microsoft.Authentication.WebAssembly.Msal`](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal)). The package provides a set of primitives that help the app authenticate users and obtain tokens to call protected APIs.

If adding authentication to an app, manually add the [`Microsoft.Authentication.WebAssembly.Msal` package](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


The [`Microsoft.Authentication.WebAssembly.Msal` package](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal) transitively adds the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication) to the app.

### Authentication service support

*This section pertains to the solution's **Client** app.*

Support for [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances is added that include access tokens when making requests to the **Server** app.

In the `Program` file:

```csharp
builder.Services.AddHttpClient("{PROJECT NAME}.ServerAPI", client => 
        client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("{PROJECT NAME}.ServerAPI"));
```

The `{PROJECT NAME}` placeholder is the project name at solution creation. For example, providing a project name of `BlazorSample` produces a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) of `BlazorSample.ServerAPI`.

Support for authenticating users is registered in the service container with the [Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%252A) extension method provided by the [`Microsoft.Authentication.WebAssembly.Msal` package](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal). This method sets up the services required for the app to interact with the Identity Provider (IP).

In the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);
    options.ProviderOptions.DefaultAccessTokenScopes.Add("{SCOPE URI}");
});
```

The [Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%252A) method accepts a callback to configure the parameters required to authenticate an app. The values required for configuring the app can be obtained from the Azure portal ME-ID configuration when you register the app.

### Access token scopes

*This section pertains to the solution's **Client** app.*

The default access token scopes represent the list of access token scopes that are:

* Included in the sign in request.
* Used to provision an access token immediately after authentication.

Additional scopes can be added as needed in the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes.Add("{SCOPE URI}");
});
```

Specify additional scopes with `AdditionalScopesToConsent`:

```csharp
options.ProviderOptions.AdditionalScopesToConsent.Add("{ADDITIONAL SCOPE URI}");
```

> **Note:**
> [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A) isn't able to provision delegated user permissions for Microsoft Graph via the Microsoft Entra ID consent UI when a user first uses an app registered in Microsoft Azure. For more information, see [blazor/security/webassembly/graph-api](graph-api.md).

Example default access token scope:

```csharp
options.ProviderOptions.DefaultAccessTokenScopes.Add(
    "api://00001111-aaaa-2222-bbbb-3333cccc4444/API.Access");
```

For more information, see the following sections of the *Additional scenarios* article:

* [Request additional access tokens](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23request-additional-access-tokens)
* [Attach tokens to outgoing requests](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23attach-tokens-to-outgoing-requests)

### Login mode

*This section pertains to the solution's **Client** app.*

The framework defaults to pop-up login mode and falls back to redirect login mode if a pop-up can't be opened. Configure MSAL to use redirect login mode by setting the `LoginMode` property of [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions) to `redirect`:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.LoginMode = "redirect";
});
```

The default setting is `popup`, and the string value isn't case-sensitive.


### Imports file

*This section pertains to the solution's **Client** app.*

The [Microsoft.AspNetCore.Components.Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization) namespace is made available throughout the app via the imports file (`_Imports.razor`):

```razor
...
@using Microsoft.AspNetCore.Components.Authorization
...
```

### Index page

*This section pertains to the solution's **Client** app.*

The Index page (`wwwroot/index.html`) page includes a script that defines the `AuthenticationService` in JavaScript. `AuthenticationService` handles the low-level details of the OIDC protocol. The app internally calls methods defined in the script to perform the authentication operations.

```html
<script src="_content/Microsoft.Authentication.WebAssembly.Msal/AuthenticationService.js"></script>
```


### App component

*This section pertains to the solution's **Client** app.*

The `App` component (`App.razor`) is similar to the `App` component found in Blazor Server apps:

* The [Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState) component manages exposing the [Microsoft.AspNetCore.Components.Authorization.AuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationState) to the rest of the app.
* The [Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView) component makes sure that the current user is authorized to access a given page or otherwise renders the `RedirectToLogin` component.
* The `RedirectToLogin` component manages redirecting unauthorized users to the login page.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `App` component (`App.razor`) isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `App` component (`App.razor`) in the generated app.
* Inspect the `App` component (`App.razor`) in [reference source](https://github.com/dotnet/aspnetcore). Select the version from the branch selector, and search for the component in the `ProjectTemplates` folder of the repository because the `App` component's location has changed over the years.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


### RedirectToLogin component

*This section pertains to the solution's **Client** app.*

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * [Navigation history state](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navigation-history-state) in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in [reference source](https://github.com/dotnet/aspnetcore/tree/main/src/ProjectTemplates/Web.ProjectTemplates/content/ComponentsWebAssembly-CSharp). The location of the component changed over time, so use GitHub search tools to locate the component.


### LoginDisplay component

*This section pertains to the solution's **Client** app.*

The `LoginDisplay` component (`LoginDisplay.razor`) is rendered in the `MainLayout` component (`MainLayout.razor`) and manages the following behaviors:

* For authenticated users:
  * Displays the current user name.
  * Offers a link to the user profile page in ASP.NET Core Identity.
  * Offers a button to log out of the app.
* For anonymous users:
  * Offers the option to register.
  * Offers the option to log in.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `LoginDisplay` component isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `LoginDisplay` component in the generated app.
* Inspect the `LoginDisplay` component in [reference source](https://github.com/dotnet/aspnetcore/tree/main/src/ProjectTemplates/Web.ProjectTemplates/content/ComponentsWebAssembly-CSharp). The location of the component changed over time, so use GitHub search tools to locate the component. The templated content for `Hosted` equal to `true` is used.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).



### Authentication component

*This section pertains to the solution's **Client** app.*

The page produced by the `Authentication` component (`Pages/Authentication.razor`) defines the routes required for handling different authentication stages.

The [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorView) component:

* Is provided by the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication/).
* Manages performing the appropriate actions at each stage of authentication.

```razor
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

<RemoteAuthenticatorView Action="@Action" />

@code {
    [Parameter]
    public string? Action { get; set; }
}
```

> **Note:**
> [Nullable reference types (NRTs) and .NET compiler null-state static analysis](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23nullable-reference-types-nrts-and-net-compiler-null-state-static-analysis) is supported in ASP.NET Core in .NET 6 or later. Prior to the release of ASP.NET Core in .NET 6, the `string` type appears without the null type designation (`?`).


### FetchData component

*This section pertains to the solution's **Client** app.*

The `FetchData` component shows how to:

* Provision an access token.
* Use the access token to call a protected resource API in the *Server* app.

The [`@attribute [Authorize]`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attribute) directive indicates to the Blazor WebAssembly authorization system that the user must be authorized in order to visit this component. The presence of the attribute in the **`Client`** app doesn't prevent the API on the server from being called without proper credentials. The **`Server`** app also must use `[Authorize]` on the appropriate endpoints to correctly protect them.

[Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken%252A) takes care of requesting an access token that can be added to the request to call the API. If the token is cached or the service is able to provision a new access token without user interaction, the token request succeeds. Otherwise, the token request fails with an [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException), which is caught in a [`try-catch`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/try-catch) statement.

In order to obtain the actual token to include in the request, the app must check that the request succeeded by calling [`tokenResult.TryGetToken(out var token)`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenResult.TryGetToken%252A).

If the request was successful, the token variable is populated with the access token. The [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessToken.Value](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessToken.Value) property of the token exposes the literal string to include in the `Authorization` request header.

If the token couldn't be provisioned without user interaction resulting in a failed request:

* ASP.NET Core in .NET 7 or later: The app navigates to `AccessTokenResult.InteractiveRequestUrl` using the given `AccessTokenResult.InteractionOptions` to allow refreshing the access token.
* ASP.NET Core in .NET 6 or earlier: The token result contains a redirect URL. Navigating to this URL takes the user to the login page and back to the current page after a successful authentication.

```razor
@page "/fetchdata"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@using {APP NAMESPACE}.Shared
@attribute [Authorize]
@inject HttpClient Http

...

@code {
    private WeatherForecast[] forecasts;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForecast");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```


## Use of an Azure Active Directory B2C tenant

If the app is registered in an **Azure Active Directory B2C** tenant, as described in [Tutorial: Create an Azure Active Directory B2C tenant](https://learn.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant) but follows the guidance in this article, the App ID URI is managed differently by ME-ID.

You can check the tenant type of an existing tenant by selecting the **Manage tenants** link at the top of the ME-ID organization **Overview**. Examine the **Tenant type** column value for the organization. This section pertains to apps that follow the guidance in this article but that are registered in an **Azure Active Directory B2C** tenant.

Instead of the App ID URI matching the format `api://{SERVER API APP CLIENT ID OR CUSTOM VALUE}`, the App ID URI has the format `https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}`. This difference affects **Client** and **Server** app configurations:

* For the server API app, set the `Audience` in the app settings file (`appsettings.json`) to match the app's audience (App ID URI) provided by the Azure portal with no trailing slash:

  ```json
  "Audience": "https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}"
  ```

  Example:

  ```json
  "Audience": "https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444"
  ```

* In the `Program` file of the **`Client`** app, set the audience of the scope (App ID URI) to match the server API app's audience:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes
      .Add("https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}/{DEFAULT SCOPE}");
  ```

  In the preceding scope, the App ID URI/audience is the `https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}` portion of the value, which doesn't include a trailing slash (`/`) and doesn't include the scope name (`{DEFAULT SCOPE}`).

  Example:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes
      .Add("https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444/API.Access");
  ```

  In the preceding scope, the App ID URI/audience is the `https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444` portion of the value, which doesn't include a trailing slash (`/`) and doesn't include the scope name (`API.Access`).

## Use of a custom App ID URI

If the App ID URI is a custom value, you must manually update the default access token scope URI in the **Client** app and add the audience to the **Server** app's ME-ID configuration.

> **Important:**
> The following configuration isn't required when using the default App ID URI of `api://{SERVER API APP CLIENT ID}`.

Example App ID URI of `urn://custom-app-id-uri` and a scope name of `API.Access`:

* In the `Program` file of the **Client** app:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes.Add(
      "urn://custom-app-id-uri/API.Access");
  ```

* In `appsettings.json` of the **Server** app, add an `Audience` entry with **only** the App ID URI and no trailing slash:

  ```json
  "Audience": "urn://custom-app-id-uri"
  ```

## Troubleshoot

### Logging

To enable debug or trace logging for Blazor WebAssembly authentication, see the *Client-side authentication logging* section of [blazor/fundamentals/logging](../../fundamentals/logging.md) with the article version selector set to ASP.NET Core in .NET 7 or later.

### Common errors

* Misconfiguration of the app or Identity Provider (IP)

  The most common errors are caused by incorrect configuration. The following are a few examples:
  
  * Depending on the requirements of the scenario, a missing or incorrect Authority, Instance, Tenant ID, Tenant domain, Client ID, or Redirect URI prevents an app from authenticating clients.
  * Incorrect request scopes prevent clients from accessing server web API endpoints.
  * Incorrect or missing server API permissions prevent clients from accessing server web API endpoints.
  * Running the app at a different port than is configured in the Redirect URI of the IP's app registration. Note that a port isn't required for Microsoft Entra ID and an app running at a `localhost` development testing address, but the app's port configuration and the port where the app is running must match for non-`localhost` addresses.
  
  Configuration sections of this article's guidance show examples of the correct configuration. Carefully check each section of the article looking for app and IP misconfiguration.
  
  If the configuration appears correct:
  
  * Analyze application logs.
  * Examine the network traffic between the client app and the IP or server app with the browser's developer tools. Often, an exact error message or a message with a clue to what's causing the problem is returned to the client by the IP or server app after making a request. Developer tools guidance is found in the following articles:

    * [Google Chrome](https://developers.google.com/web/tools/chrome-devtools/network) (Google documentation)
    * [Microsoft Edge](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/network/)
    * [Mozilla Firefox](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/index.html) (Mozilla documentation)

  * For releases of Blazor where a JSON Web Token (JWT) is used, decode the contents of the token used for authenticating a client or accessing a server web API, depending on where the problem is occurring. For more information, see [Inspect the content of a JSON Web Token (JWT)](#inspect-the-content-of-a-json-web-token-jwt).
  
  The documentation team responds to document feedback and bugs in articles (open an issue from the **This page** feedback section) but is unable to provide product support. Several public support forums are available to assist with troubleshooting an app. We recommend the following:
  
  * [Stack Overflow (tag: `blazor`)](https://stackoverflow.com/questions/tagged/blazor)
  * [ASP.NET Core Slack Team](https://join.slack.com/t/aspnetcore/shared_invite/zt-1mv5487zb-EOZxJ1iqb0A0ajowEbxByQ)
  * [Blazor Gitter](https://gitter.im/aspnet/Blazor)
  
  *The preceding forums are not owned or controlled by Microsoft.*
  
  For non-security, non-sensitive, and non-confidential reproducible framework bug reports, [open an issue with the ASP.NET Core product unit](https://github.com/dotnet/aspnetcore/issues). Don't open an issue with the product unit until you've thoroughly investigated the cause of a problem and can't resolve it on your own and with the help of the community on a public support forum. The product unit isn't able to troubleshoot individual apps that are broken due to simple misconfiguration or use cases involving third-party services. If a report is sensitive or confidential in nature or describes a potential security flaw in the product that cyberattackers may exploit, see [Reporting security issues and bugs (`dotnet/aspnetcore` GitHub repository)](https://github.com/dotnet/aspnetcore/blob/main/CONTRIBUTING.md#reporting-security-issues-and-bugs).

* Unauthorized client for ME-ID

  > info: Microsoft.AspNetCore.Authorization.DefaultAuthorizationService[2]
  > Authorization failed. These requirements were not met:
  > DenyAnonymousAuthorizationRequirement: Requires an authenticated user.

  Login callback error from ME-ID:

  * Error: `unauthorized_client`
  * Description: `AADB2C90058: The provided application is not configured to allow public clients.`

  To resolve the error:

  1. In the Azure portal, access the [app's manifest](https://learn.microsoft.com/entra/identity-platform/reference-app-manifest).
  1. Set the [`allowPublicClient` attribute](https://learn.microsoft.com/entra/identity-platform/reference-app-manifest#allowpublicclient-attribute) to `null` or `true`.

### Cookies and site data

Cookies and site data can persist across app updates and interfere with testing and troubleshooting. Clear the following when making app code changes, user account changes with the provider, or provider app configuration changes:

* User sign-in cookies
* App cookies
* Cached and stored site data

One approach to prevent lingering cookies and site data from interfering with testing and troubleshooting is to:

* Configure a browser
  * Use a browser for testing that you can configure to delete all cookie and site data each time the browser is closed.
  * Make sure that the browser is closed manually or by the IDE for any change to the app, test user, or provider configuration.
* Use a custom command to open a browser in InPrivate or Incognito mode in Visual Studio:
  * Open **Browse With** dialog box from Visual Studio's **Run** button.
  * Select the **Add** button.
  * Provide the path to your browser in the **Program** field. The following executable paths are typical installation locations for Windows 10. If your browser is installed in a different location or you aren't using Windows 10, provide the path to the browser's executable.
    * Microsoft Edge: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
    * Google Chrome: `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
    * Mozilla Firefox: `C:\Program Files\Mozilla Firefox\firefox.exe`
  * In the **Arguments** field, provide the command-line option that the browser uses to open in InPrivate or Incognito mode. Some browsers require the URL of the app.
    * Microsoft Edge: Use `-inprivate`.
    * Google Chrome: Use `--incognito --new-window {URL}`, where the `{URL}` placeholder is the URL to open (for example, `https://localhost:5001`).
    * Mozilla Firefox: Use `-private -url {URL}`, where the `{URL}` placeholder is the URL to open (for example, `https://localhost:5001`).
  * Provide a name in the **Friendly name** field. For example, `Firefox Auth Testing`.
  * Select the **OK** button.
  * To avoid having to select the browser profile for each iteration of testing with an app, set the profile as the default with the **Set as Default** button.
  * Make sure that the browser is closed by the IDE for any change to the app, test user, or provider configuration.

### App upgrades

A functioning app may fail immediately after upgrading either the .NET SDK on the development machine or changing package versions within the app. In some cases, incoherent packages may break an app when performing major upgrades. Most of these issues can be fixed by following these instructions:

1. Clear the local system's NuGet package caches by executing [`dotnet nuget locals all --clear`](https://learn.microsoft.com/dotnet/core/tools/dotnet-nuget-locals) from a command shell.
1. Delete the project's `bin` and `obj` folders.
1. Restore and rebuild the project.
1. Delete all of the files in the deployment folder on the server prior to redeploying the app.

> **Note:**
> Use of package versions incompatible with the app's target framework isn't supported. For information on a package, use the [NuGet Gallery](https://www.nuget.org).

**Applies to: < aspnetcore-8.0**

### Run the `Server` app

When testing and troubleshooting a hosted Blazor WebAssembly [solution](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23visual-studio-solution-file-sln), make sure that you're running the app from the **`Server`** project.



### Inspect the user

The following `User` component can be used directly in apps or serve as the basis for further customization.

`User.razor`:

```razor
@page "/user"
@attribute [Authorize]
@using System.Text.Json
@using System.Security.Claims
@inject IAccessTokenProvider AuthorizationService

<h1>@AuthenticatedUser?.Identity?.Name</h1>

<h2>Claims</h2>

@foreach (var claim in AuthenticatedUser?.Claims ?? Array.Empty<Claim>())
{
    <p class="claim">@(claim.Type): @claim.Value</p>
}

<h2>Access token</h2>

<p id="access-token">@AccessToken?.Value</p>

<h2>Access token claims</h2>

@foreach (var claim in GetAccessTokenClaims())
{
    <p>@(claim.Key): @claim.Value.ToString()</p>
}

@if (AccessToken != null)
{
    <h2>Access token expires</h2>

    <p>Current time: <span id="current-time">@DateTimeOffset.Now</span></p>
    <p id="access-token-expires">@AccessToken.Expires</p>

    <h2>Access token granted scopes (as reported by the API)</h2>

    @foreach (var scope in AccessToken.GrantedScopes)
    {
        <p>Scope: @scope</p>
    }
}

@code {
    [CascadingParameter]
    private Task<AuthenticationState> AuthenticationState { get; set; }

    public ClaimsPrincipal AuthenticatedUser { get; set; }
    public AccessToken AccessToken { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        var state = await AuthenticationState;
        var accessTokenResult = await AuthorizationService.RequestAccessToken();

        if (!accessTokenResult.TryGetToken(out var token))
        {
            throw new InvalidOperationException(
                "Failed to provision the access token.");
        }

        AccessToken = token;

        AuthenticatedUser = state.User;
    }

    protected IDictionary<string, object> GetAccessTokenClaims()
    {
        if (AccessToken == null)
        {
            return new Dictionary<string, object>();
        }

        // header.payload.signature
        var payload = AccessToken.Value.Split(".")[1];
        var base64Payload = payload.Replace('-', '+').Replace('_', '/')
            .PadRight(payload.Length + (4 - payload.Length % 4) % 4, '=');

        return JsonSerializer.Deserialize<IDictionary<string, object>>(
            Convert.FromBase64String(base64Payload));
    }
}
```

### Inspect the content of a JSON Web Token (JWT)

To decode a JSON Web Token (JWT), use Microsoft's [jwt.ms](https://jwt.ms/) tool. Values in the UI never leave your browser.

Example encoded JWT (shortened for display):

> eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1j ... bQdHBHGcQQRbW7Wmo6SWYG4V_bU55Ug_PW4pLPr20tTS8Ct7_uwy9DWrzCMzpD-EiwT5IjXwlGX3IXVjHIlX50IVIydBoPQtadvT7saKo1G5Jmutgq41o-dmz6-yBMKV2_nXA25Q

Example JWT decoded by the tool for an app that authenticates against Azure AAD B2C:

```json
{
  "typ": "JWT",
  "alg": "RS256",
  "kid": "X5eXk4xyojNFum1kl2Ytv8dlNP4-c57dO6QGTVBwaNk"
}.{
  "exp": 1610059429,
  "nbf": 1610055829,
  "ver": "1.0",
  "iss": "https://mysiteb2c.b2clogin.com/11112222-bbbb-3333-cccc-4444dddd5555/v2.0/",
  "sub": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
  "aud": "00001111-aaaa-2222-bbbb-3333cccc4444",
  "nonce": "bbbb0000-cccc-1111-dddd-2222eeee3333",
  "iat": 1610055829,
  "auth_time": 1610055822,
  "idp": "idp.com",
  "tfp": "B2C_1_signupsignin"
}.[Signature]
```


## Additional resources

* [Configure an app's publisher domain](https://learn.microsoft.com/entra/identity-platform/howto-configure-publisher-domain)
* [Microsoft Entra ID app manifest: identifierUris attribute](https://learn.microsoft.com/entra/identity-platform/reference-app-manifest#identifieruris-attribute)
* [blazor/security/webassembly/additional-scenarios](additional-scenarios.md)
* [Build a custom version of the Authentication.MSAL JavaScript library](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23build-a-custom-version-of-the-authenticationmsal-javascript-library)
* [Unauthenticated or unauthorized web API requests in an app with a secure default client](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23unauthenticated-or-unauthorized-web-api-requests-in-an-app-with-a-secure-default-client)
* [blazor/security/webassembly/meid-groups-roles-net5to7](microsoft-entra-id-groups-and-roles-net-5-to-7.md)
* [security/authentication/azure-active-directory/index](../../../security/authentication/azure-active-directory/index.md)
* [Microsoft identity platform documentation](https://learn.microsoft.com/entra/identity-platform/)
* [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app)
* [Security best practices for application properties in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/security-best-practices-for-app-registration)
