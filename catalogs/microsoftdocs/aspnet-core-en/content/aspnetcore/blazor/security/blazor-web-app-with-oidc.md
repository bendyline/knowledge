---
title: Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)
ai-usage: ai-assisted
author: guardrex
description: Learn how to secure a Blazor Web App with OpenID Connect (OIDC).
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 12/18/2025
uid: blazor/security/blazor-web-app-oidc
zone_pivot_groups: blazor-web-app-oidc-specification
---
# Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


<!-- UPDATE 15.0 - Remove this INCLUDE file and delete all content
                   on B2C when .NET 15 releases in 2030, which is 
                   when B2C support ends for existing customer
                   accounts established prior to 5/1/25. -->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see [Azure AD B2C: Frequently asked questions (FAQ)](https://learn.microsoft.com/azure/active-directory-b2c/faq).


This article describes how to secure a Blazor Web App with [OpenID Connect (OIDC)](https://openid.net/developers/how-connect-works/) using a sample app in the [`dotnet/blazor-samples` GitHub repository (.NET 8 or later)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps)).

**Applies to: with-yarp-and-aspire**


**Applies to: \>= aspnetcore-9.0**

For Microsoft Entra ID, you can use [Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%252A) from [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) ([`Microsoft.Identity.Web` NuGet package](https://www.nuget.org/packages/Microsoft.Identity.Web), [API documentation](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/security/\[Microsoft.Identity.Web]\(https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web\))), which adds both the OIDC and Cookie authentication handlers with the appropriate defaults. The sample app and the guidance in this article don't use Microsoft Identity Web. The guidance demonstrates how to configure the OIDC handler *manually* for any OIDC provider. For more information on implementing Microsoft Identity Web, see [blazor/security/blazor-web-app-entra](blazor-web-app-with-entra.md).



This version of the article covers implementing OIDC with the [Backend for Frontend (BFF) pattern](https://learn.microsoft.com/azure/architecture/patterns/backends-for-frontends) with [YARP](https://dotnet.github.io/yarp/) and [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview). Change the article version selector to either **Without YARP and Aspire (Interactive Auto)** (Interactive Auto rendering) or **Without YARP and Aspire (Interactive Server)** (Interactive Server rendering) if the app's specification doesn't call for adopting YARP and Aspire.

## Prerequisites

[Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview) requires [Visual Studio](https://visualstudio.microsoft.com/) version 17.10 or later.

Also, see the *Prerequisites* section of [Quickstart: Build your first Aspire solution](https://learn.microsoft.com/dotnet/aspire/get-started/build-your-first-aspire-app?tabs=visual-studio#prerequisites).

## Sample solution

The sample app consists of the following projects:

* Aspire:
  * `Aspire.AppHost`: Used to manage the high-level orchestration concerns of the app.
  * `Aspire.ServiceDefaults`: Contains default Aspire app configurations that can be extended and customized as needed.
* `MinimalApiJwt`: Backend web API, containing an example [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.
* `BlazorWebAppOidc`: Server-side project of the Blazor Web App. The project uses [YARP](https://dotnet.github.io/yarp/) to proxy requests to a weather forecast endpoint in the backend web API project (`MinimalApiJwt`) with the `access_token` stored in the authentication cookie.
* `BlazorWebAppOidc.Client`: Client-side project of the Blazor Web App.

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppOidcBffAutoYarpAspire` folder for .NET 8 or later.

Start the solution from the ***`Aspire/Aspire.AppHost` project***.

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

The Blazor Web App uses [the Auto render mode with global interactivity](../components/render-modes.md).

**Applies to: \>= aspnetcore-9.0**

The server project calls [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A) to add a server-side authentication state provider that uses [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) to flow the authentication state to the client. The client calls [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A) to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.



**Applies to: < aspnetcore-9.0**

The `PersistingAuthenticationStateProvider` class (`PersistingAuthenticationStateProvider.cs`) is a server-side [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) that uses [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) to flow the authentication state to the client, which is then fixed for the lifetime of the WebAssembly application.



This app is a starting point for any OIDC authentication flow. OIDC is configured manually in the app and doesn't rely upon [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra) or [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) packages, nor does the sample app require [Microsoft Azure](https://azure.microsoft.com/) hosting. However, the sample app can be used with Entra, Microsoft Identity Web, and hosted in Azure.

Automatic non-interactive token refresh with the help of a custom cookie refresher (`CookieOidcRefresher.cs`).

The [Backend for Frontend (BFF) pattern](https://learn.microsoft.com/azure/architecture/patterns/backends-for-frontends) is adopted using [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview) for service discovery and [YARP](https://dotnet.github.io/yarp/) for proxying requests to a weather forecast endpoint on the backend app.

The backend web API (`MinimalApiJwt`) uses JWT-bearer authentication to validate JWT tokens saved by the Blazor Web App in the sign-in cookie.

Aspire improves the experience of building .NET cloud-native apps. It provides a consistent, opinionated set of tools and patterns for building and running distributed apps.

YARP (Yet Another Reverse Proxy) is a library used to create a reverse proxy server. `MapForwarder` in the `Program` file of the server project adds direct forwarding of HTTP requests that match the specified pattern to a specific destination using default configuration for the outgoing request, customized transforms, and default HTTP client:

* When rendering the `Weather` component on the server, the component uses the `ServerWeatherForecaster` class to proxy the request for weather data with the user's access token. [Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext) determines if an [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) is available for use by the `GetWeatherForecastAsync` method. For more information, see [blazor/components/index#ihttpcontextaccessorhttpcontext](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23ihttpcontextaccessorhttpcontext).
* When the component is rendered on the client, the component uses the `ClientWeatherForecaster` service implementation, which uses a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) (in the client project's `Program` file) to make a web API call to the server project. A Minimal API endpoint (`/weather-forecast`) defined in the server project's `Program` file transforms the request with the user's access token to obtain the weather data.

For more information on (web) API calls using a service abstractions in Blazor Web Apps, see [blazor/call-web-api#service-abstractions-for-web-api-calls](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23service-abstractions-for-web-api-calls).

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppOidc` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

For app and web API registration guidance, see [Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppOidc`/`BlazorWebAppOidc.Client`) with a **Web** platform configuration and a **Redirect URI** of `https://localhost/signin-oidc` (a port isn't required). The app's tenant ID and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `Program` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal's **Implicit grant and hybrid flows** app registration configuration, don't select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Establish the client secret

*This section only applies to the server project of the Blazor Web App (`BlazorWebAppOidc` project).*

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


For local development testing, use the [Secret Manager tool](../../security/app-secrets.md) to store the Blazor server project's client secret under the configuration key `Authentication:Schemes:MicrosoftOidc:ClientSecret`.

The Blazor server project hasn't been initialized for the Secret Manager tool. Use a command shell, such as the Developer PowerShell command shell in Visual Studio, to execute the following command. Before executing the command, change the directory with the `cd` command to the server project's directory. The command establishes a user secrets identifier (`<UserSecretsId>` in the server app's project file):

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret. The `{SECRET}` placeholder is the client secret obtained from the app's registration:

```dotnetcli
dotnet user-secrets set "Authentication:Schemes:MicrosoftOidc:ClientSecret" "{SECRET}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the server project in **Solution Explorer** and selecting **Manage User Secrets**.

## Aspire projects

For more information on using Aspire and details on the `.AppHost` and `.ServiceDefaults` projects of the sample app, see the [Aspire documentation](https://learn.microsoft.com/dotnet/aspire/).

Confirm that you've met the prerequisites for Aspire. For more information, see the *Prerequisites* section of [Quickstart: Build your first Aspire solution](https://learn.microsoft.com/dotnet/aspire/get-started/build-your-first-aspire-app?tabs=visual-studio#prerequisites).

The sample app only configures an insecure HTTP launch profile (`http`) for use during development testing.

## `MinimalApiJwt` project

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data. Requests from the Blazor Web App server-side project (`BlazorWebAppOidc`) are proxied to the `MinimalApiJwt` project.

The `MinimalApiJwt.http` file can be used for testing the weather data request. Note that the `MinimalApiJwt` project must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see [test/http-files](../../test/http-files.md).

**Applies to: \>= aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md).



**Applies to: < aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md) and the [Swagger UI](https://swagger.io/api-hub/) in the `Development` environment. For more information, see [fundamentals/openapi/using-openapi-documents#use-swagger-ui-for-local-ad-hoc-testing](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Fusing-openapi-documents%23use-swagger-ui-for-local-ad-hoc-testing).



A secure weather forecast data endpoint is in the project's `Program` file:

```csharp
app.MapGet("/weather-forecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
}).RequireAuthorization();
```

The [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) extension method requires authorization for the route definition. For any controllers that you add to the project, add the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) to the controller or action.

Configure the project in the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions) of the [Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%252A) call in the project's `Program` file.

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%252A) sets the Authority for making OIDC calls. We recommend using a separate app registration for the `MinimalApiJwt` project. The authority matches the issurer (`iss`) of the JWT returned by the identity provider.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The format of the Authority depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee`.

ME-ID tenant Authority example:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see [blazor/security/blazor-web-app-entra#sts-token-version](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fblazor-web-app-entra%23sts-token-version).

AAD B2C tenant Authority example:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%252A) sets the Audience for any received OIDC token. 

```csharp
jwtOptions.Audience = "{APP ID URI}";
```

> **Note:**
> When using Microsoft Entra ID, match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The format of the Audience depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `contoso` and a Client ID of `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant App ID URI example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```

## Server-side Blazor Web App project (`BlazorWebAppOidc`)

This section explains how to configure the server-side Blazor project.

The following [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions) configuration is found in the project's `Program` file on the call to [Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%252A).

**Applies to: \>= aspnetcore-9.0**

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%252A): Controls [Pushed Authorization Requests (PAR) support](https://learn.microsoft.com/search/?terms=aspnetcore-9%23openidconnecthandler-adds-support-for-pushed-authorization-requests-par). By default, the setting is to use PAR if the identity provider's discovery document (usually found at `.well-known/openid-configuration`) advertises support for PAR. If you wish to require PAR support for the app, you can assign a value of [`PushedAuthorizationBehavior.Require`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.PushedAuthorizationBehavior). PAR isn't supported by Microsoft Entra, and there are no plans for Entra to ever support it in the future.

```csharp
oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.UseIfAvailable;
```



[Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%252A): Sets the authentication scheme corresponding to the middleware responsible of persisting user's identity after a successful authentication. The OIDC handler needs to use a sign-in scheme that's capable of persisting user credentials across requests. The following line is present merely for demonstration purposes. If omitted, [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%252A) is used as a fallback value.

```csharp
oidcOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
```

Scopes for `openid` and `profile` ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)) (Optional): The `openid` and `profile` scopes are also configured by default because they're required for the OIDC handler to work, but these may need to be re-added if scopes are included in the `Authentication:Schemes:MicrosoftOidc:Scope` configuration. For general configuration guidance, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md) and [blazor/fundamentals/configuration](../fundamentals/configuration.md).

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
```

[Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%252A): Defines whether access and refresh tokens should be stored in the [Microsoft.AspNetCore.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties) after a successful authorization. This property is set to `true` so the refresh token gets stored for non-interactive token refresh.

```csharp
oidcOptions.SaveTokens = true;
```

Scope for offline access ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)): The `offline_access` scope is required for the refresh token.

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

Scopes for obtaining weather data from the web API ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)): Configure the `Weather.Get` scope for accessing the external web API for weather data. In the following example, the `{APP ID URI}` placeholder is found in the Entra or Azure portal where the web API is exposed. For any other identity provider, use the appropriate scope.

```csharp
oidcOptions.Scope.Add("{APP ID URI}/Weather.Get");
```

The format of the scope depends on the type of tenant in use. In the following examples, the Tenant Domain is `contoso.onmicrosoft.com`, and the Client ID is `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

AAD B2C tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%252A) and [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%252A): Sets the Authority and Client ID for OIDC calls.

```csharp
oidcOptions.Authority = "{AUTHORITY}";
oidcOptions.ClientId = "{CLIENT ID}";
```

The following example uses a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a Client ID of `00001111-aaaa-2222-bbbb-3333cccc4444`:

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
oidcOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
```

For multi-tenant apps, the "common" authority should be used. You can also use the "common" authority for single-tenant apps, but a custom [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A) is required, as shown later in this section.

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/common/v2.0";
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%252A): Configures the OIDC handler to only perform authorization code flow. Implicit grants and hybrid flows are unnecessary in this mode. The OIDC handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

```csharp
oidcOptions.ResponseType = OpenIdConnectResponseType.Code;
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) and configuration of [Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%252A) and [Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%252A): Many OIDC servers use "`name`" and "`role`" rather than the SOAP/WS-Fed defaults in [System.Security.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes). When [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) is set to `false`, the handler doesn't perform claims mappings, and the claim names from the JWT are used directly by the app. The following example sets the role claim type to "`roles`," which is appropriate for [Microsoft Entra ID (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra). Consult your identity provider's documentation for more information.

> **Note:**
> [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) must be set to `false` for most OIDC providers, which prevents renaming claims.

```csharp
oidcOptions.MapInboundClaims = false;
oidcOptions.TokenValidationParameters.NameClaimType = "name";
oidcOptions.TokenValidationParameters.RoleClaimType = "roles";
```

Path configuration: Paths must match the redirect URI (login callback path) and post logout redirect (signed-out callback path) paths configured when registering the application with the OIDC provider. In the Azure portal, paths are configured in the **Authentication** blade of the app's registration. Both the sign-in and sign-out paths must be registered as redirect URIs. The default values are `/signin-oidc` and `/signout-callback-oidc`.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signin-oidc

> **Note:**
> A port isn't required for `localhost` addresses when using Microsoft Entra ID. Most other OIDC providers require the correct port.

[Microsoft.AspNetCore.Builder.OpenIdConnectOptions.SignedOutCallbackPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenIdConnectOptions.SignedOutCallbackPath%252A) (configuration key: "`SignedOutCallbackPath`"): The request path within the app's base path intercepted by the OIDC handler where the user agent is first returned after signing out from the identity provider. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OIDC handler redirects to the [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%252A) or [Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%252A), if specified.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signout-callback-oidc

> **Note:**
> When using Microsoft Entra ID, set the path in the **Web** platform configuration's **Redirect URI** entries in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port. If you don't add the signed-out callback path URI to the app's registration in Entra, Entra refuses to redirect the user back to the app and merely asks them to close their browser window.

[Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%252A): Requests received on this path cause the handler to invoke sign-out using the sign-out scheme.

In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost/signout-oidc

> **Note:**
> When using Microsoft Entra ID, set the **Front-channel logout URL** in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port.

```csharp
oidcOptions.CallbackPath = new PathString("{PATH}");
oidcOptions.SignedOutCallbackPath = new PathString("{PATH}");
oidcOptions.RemoteSignOutPath = new PathString("{PATH}");
```

Examples (default values):

```csharp
oidcOptions.CallbackPath = new PathString("/signin-oidc");
oidcOptions.SignedOutCallbackPath = new PathString("/signout-callback-oidc");
oidcOptions.RemoteSignOutPath = new PathString("/signout-oidc");
```

(*Microsoft Azure only with the "common" endpoint*) [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A): Many OIDC providers work with the default issuer validator, but we need to account for the issuer parameterized with the Tenant ID (`{TENANT ID}`) returned by `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`. For more information, see [SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "common" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731)](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/issues/1731).

Only for apps using Microsoft Entra ID with the "common" endpoint:

```csharp
var microsoftIssuerValidator = AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = microsoftIssuerValidator.Validate;
```

## Client-side Blazor Web App project (`BlazorWebAppOidc.Client`)

The `BlazorWebAppOidc.Client` project is the client-side project of the Blazor Web App.

**Applies to: \>= aspnetcore-9.0**

The client calls [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A) to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.



**Applies to: < aspnetcore-9.0**

The `PersistentAuthenticationStateProvider` class (`PersistentAuthenticationStateProvider.cs`) is a client-side [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) that determines the user's authentication state by looking for data persisted in the page when it was rendered on the server. The authentication state is fixed for the lifetime of the WebAssembly application.



If the user needs to log in or out, a full page reload is required.

The sample app only provides a user name and email for display purposes.



**Applies to: without-yarp-and-aspire**


**Applies to: \>= aspnetcore-9.0**

For Microsoft Entra ID, you can use [Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%252A) from [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) ([`Microsoft.Identity.Web` NuGet package](https://www.nuget.org/packages/Microsoft.Identity.Web), [API documentation](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/security/\[Microsoft.Identity.Web]\(https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web\))), which adds both the OIDC and Cookie authentication handlers with the appropriate defaults. The sample app and the guidance in this article don't use Microsoft Identity Web. The guidance demonstrates how to configure the OIDC handler *manually* for any OIDC provider. For more information on implementing Microsoft Identity Web, see [blazor/security/blazor-web-app-entra](blazor-web-app-with-entra.md).



This version of the article covers implementing OIDC with the [Backend for Frontend (BFF) pattern](https://learn.microsoft.com/azure/architecture/patterns/backends-for-frontends) without [YARP](https://dotnet.github.io/yarp/) and [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview). Change the article version selector to **With YARP and Aspire (Interactive Auto)** if the app's specification calls for adopting YARP and Aspire.

The following specification is adopted:

* The Blazor Web App uses [the Auto render mode with global interactivity](../components/render-modes.md).
* Custom auth state provider services are used by the server and client apps to capture the user's authentication state and flow it between the server and client.
* This app is a starting point for any OIDC authentication flow. OIDC is configured manually in the app and doesn't rely upon [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra) or [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) packages, nor does the sample app require [Microsoft Azure](https://azure.microsoft.com/) hosting. However, the sample app can be used with Entra, Microsoft Identity Web, and hosted in Azure.
* Automatic non-interactive token refresh.
* A separate web API project demonstrates a secure web API call for weather data.

For an alternative experience using [Microsoft Authentication Library for .NET](https://learn.microsoft.com/entra/msal/dotnet/), [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/), and [Microsoft Entra ID](https://www.microsoft.com/security/business/identity-access/microsoft-entra-id), see [blazor/security/blazor-web-app-entra](blazor-web-app-with-entra.md).

## Sample solution

The sample app consists of the following projects:

* `BlazorWebAppOidc`: Server-side project of the Blazor Web App, containing an example [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.
* `BlazorWebAppOidc.Client`: Client-side project of the Blazor Web App.
* `MinimalApiJwt`: Backend web API with a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppOidcBffAuto` folder for .NET 8 or later.

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

Sample solution features:

* Automatic non-interactive token refresh with the help of a custom cookie refresher (`CookieOidcRefresher.cs`).

* Weather data is handled by a Minimal API endpoint (`/weather-forecast`) in the `Program` file (`Program.cs`) of the `MinimalApiJwt` project. The endpoint requires authorization by calling [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A). For any controllers that you add to the project, add the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) to the controller or action. For more information on requiring authorization across the app via an [authorization policy](../../security/authorization/policies.md) and opting out of authorization at a subset of public endpoints, see the [Razor Pages OIDC guidance](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fconfigure-oidc-web-authentication%23force-authorization).

* The app securely calls a web API for weather data:

  * When rendering the `Weather` component on the server, the component uses the `ServerWeatherForecaster` on the server to obtain weather data from the web API in the `MinimalApiJwt` project using a [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) (`TokenHandler`) that attaches the access token from the [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) to the request. For more information on [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) instances, see [fundamentals/http-requests#outgoing-request-middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23outgoing-request-middleware).
  * When the component is rendered on the client, the component uses the `ClientWeatherForecaster` service implementation, which uses a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) (in the client project's `Program` file) to make the web API call from the server project's `ServerWeatherForecaster`.

**Applies to: \>= aspnetcore-9.0**

* The server project calls [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A) to add a server-side authentication state provider that uses [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) to flow the authentication state to the client. The client calls [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A) to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.



**Applies to: < aspnetcore-9.0**

* The `PersistingAuthenticationStateProvider` class (`PersistingAuthenticationStateProvider.cs`) is a server-side [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) that uses [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) to flow the authentication state to the client, which is then fixed for the lifetime of the WebAssembly application.



For more information on (web) API calls using a service abstractions in Blazor Web Apps, see [blazor/call-web-api#service-abstractions-for-web-api-calls](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23service-abstractions-for-web-api-calls).

## OIDC provider terminology and guidance

Although you aren't required to adopt [Microsoft Entra (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra) as the OIDC provider to use the sample app and the guidance in this article, this article describes settings for ME-ID using names that are found in Microsoft documentation and the Azure/Entra portals. OIDC settings have similar naming across OIDC providers. When using a third-party OIDC provider, use the provider's documentation in conjunction with the guidance in this article for app and web API registrations.

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppOidc` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

For app and web API registration guidance, see [Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppOidc`/`BlazorWebAppOidc.Client`) with a **Web** platform configuration and a **Redirect URI** of `https://localhost/signin-oidc` (a port isn't required). The app's tenant ID and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `Program` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal's **Implicit grant and hybrid flows** app registration configuration, don't select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Establish the client secret

*This section only applies to the server project of the Blazor Web App (`BlazorWebAppOidc` project).*

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


For local development testing, use the [Secret Manager tool](../../security/app-secrets.md) to store the Blazor server project's client secret under the configuration key `Authentication:Schemes:MicrosoftOidc:ClientSecret`.

The Blazor server project hasn't been initialized for the Secret Manager tool. Use a command shell, such as the Developer PowerShell command shell in Visual Studio, to execute the following command. Before executing the command, change the directory with the `cd` command to the server project's directory. The command establishes a user secrets identifier (`<UserSecretsId>` in the server app's project file):

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret. The `{SECRET}` placeholder is the client secret obtained from the app's registration:

```dotnetcli
dotnet user-secrets set "Authentication:Schemes:MicrosoftOidc:ClientSecret" "{SECRET}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the server project in **Solution Explorer** and selecting **Manage User Secrets**.

## `MinimalApiJwt` project

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.

The `MinimalApiJwt.http` file can be used for testing the weather data request. Note that the `MinimalApiJwt` project must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see [test/http-files](../../test/http-files.md).

**Applies to: \>= aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md).



**Applies to: < aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md) and the [Swagger UI](https://swagger.io/api-hub/) in the `Development` environment. For more information, see [fundamentals/openapi/using-openapi-documents#use-swagger-ui-for-local-ad-hoc-testing](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Fusing-openapi-documents%23use-swagger-ui-for-local-ad-hoc-testing).



The project creates a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data:

```csharp
app.MapGet("/weather-forecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
}).RequireAuthorization();
```

Configure the project in the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions) of the [Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%252A) call in the project's `Program` file.

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%252A) sets the Authority for making OIDC calls. We recommend using a separate app registration for the `MinimalApiJwt` project. The authority matches the issurer (`iss`) of the JWT returned by the identity provider.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The format of the Authority depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee`.

ME-ID tenant Authority example:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see [blazor/security/blazor-web-app-entra#sts-token-version](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fblazor-web-app-entra%23sts-token-version).

AAD B2C tenant Authority example:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%252A) sets the Audience for any received OIDC token. 

```csharp
jwtOptions.Audience = "{APP ID URI}";
```

> **Note:**
> When using Microsoft Entra ID, match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The format of the Audience depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `contoso` and a Client ID of `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant App ID URI example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```

## Blazor Web App server project (`BlazorWebAppOidc`)

The `BlazorWebAppOidc` project is the server-side project of the Blazor Web App.

A [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) (`TokenHandler`) manages attaching a user's access token to outgoing requests. The token handler only executes during static server-side rendering (static SSR), so using [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) is safe in this scenario. For more information, see [blazor/components/httpcontext](../components/httpcontext.md) and [blazor/security/additional-scenarios#use-a-token-handler-for-web-api-calls](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls).

`TokenHandler.cs`:

```csharp
public class TokenHandler(IHttpContextAccessor httpContextAccessor) : 
    DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (httpContextAccessor.HttpContext is null)
        {
            throw new Exception("HttpContext not available");
        }

        var accessToken = await httpContextAccessor.HttpContext
            .GetTokenAsync("access_token");

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
```

In the project's `Program` file, the token handler (`TokenHandler`) is registered as a service and specified as the message handler with [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%252A) for making secure requests to the backend `MinimalApiJwt` web API using a [named HTTP client](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) ("`ExternalApi`").

```csharp
builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("ExternalApi",
      client => client.BaseAddress = new Uri(builder.Configuration["ExternalApiUri"] ?? 
          throw new Exception("Missing base address!")))
      .AddHttpMessageHandler<TokenHandler>();
```

In the project's `appsettings.json` file, configure the external API URI:

```json
"ExternalApiUri": "{BASE ADDRESS}"
```

Example:

```json
"ExternalApiUri": "https://localhost:7277"
```

The following [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions) configuration is found in the project's `Program` file on the call to [Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%252A):

**Applies to: \>= aspnetcore-9.0**

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%252A): Controls [Pushed Authorization Requests (PAR) support](https://learn.microsoft.com/search/?terms=aspnetcore-9%23openidconnecthandler-adds-support-for-pushed-authorization-requests-par). By default, the setting is to use PAR if the identity provider's discovery document (usually found at `.well-known/openid-configuration`) advertises support for PAR. If you wish to require PAR support for the app, you can assign a value of [`PushedAuthorizationBehavior.Require`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.PushedAuthorizationBehavior). PAR isn't supported by Microsoft Entra, and there are no plans for Entra to ever support it in the future.

```csharp
oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.UseIfAvailable;
```



[Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%252A): Sets the authentication scheme corresponding to the middleware responsible of persisting user's identity after a successful authentication. The OIDC handler needs to use a sign-in scheme that's capable of persisting user credentials across requests. The following line is present merely for demonstration purposes. If omitted, [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%252A) is used as a fallback value.

```csharp
oidcOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
```

Scopes for `openid` and `profile` ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)) (Optional): The `openid` and `profile` scopes are also configured by default because they're required for the OIDC handler to work, but these may need to be re-added if scopes are included in the `Authentication:Schemes:MicrosoftOidc:Scope` configuration. For general configuration guidance, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md) and [blazor/fundamentals/configuration](../fundamentals/configuration.md).

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
```

[Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%252A): Defines whether access and refresh tokens should be stored in the [Microsoft.AspNetCore.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties) after a successful authorization. This property is set to `true` so the refresh token gets stored for non-interactive token refresh.

```csharp
oidcOptions.SaveTokens = true;
```

Scope for offline access ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)): The `offline_access` scope is required for the refresh token.

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%252A) and [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%252A): Sets the Authority and Client ID for OIDC calls.

```csharp
oidcOptions.Authority = "{AUTHORITY}";
oidcOptions.ClientId = "{CLIENT ID}";
```

The following example uses a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a Client ID of `00001111-aaaa-2222-bbbb-3333cccc4444`:

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
oidcOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
```

For multi-tenant apps, the "common" authority should be used. You can also use the "common" authority for single-tenant apps, but a custom [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A) is required, as shown later in this section.

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/common/v2.0";
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%252A): Configures the OIDC handler to only perform authorization code flow. Implicit grants and hybrid flows are unnecessary in this mode. The OIDC handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

```csharp
oidcOptions.ResponseType = OpenIdConnectResponseType.Code;
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) and configuration of [Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%252A) and [Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%252A): Many OIDC servers use "`name`" and "`role`" rather than the SOAP/WS-Fed defaults in [System.Security.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes). When [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) is set to `false`, the handler doesn't perform claims mappings, and the claim names from the JWT are used directly by the app. The following example sets the role claim type to "`roles`," which is appropriate for [Microsoft Entra ID (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra). Consult your identity provider's documentation for more information.

> **Note:**
> [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) must be set to `false` for most OIDC providers, which prevents renaming claims.

```csharp
oidcOptions.MapInboundClaims = false;
oidcOptions.TokenValidationParameters.NameClaimType = "name";
oidcOptions.TokenValidationParameters.RoleClaimType = "roles";
```

Path configuration: Paths must match the redirect URI (login callback path) and post logout redirect (signed-out callback path) paths configured when registering the application with the OIDC provider. In the Azure portal, paths are configured in the **Authentication** blade of the app's registration. Both the sign-in and sign-out paths must be registered as redirect URIs. The default values are `/signin-oidc` and `/signout-callback-oidc`.

[Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.CallbackPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.CallbackPath): The request path within the app's base path where the user-agent is returned.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signin-oidc

> **Note:**
> A port isn't required for `localhost` addresses when using Microsoft Entra ID. Most other OIDC providers require the correct port.

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath%252A) (configuration key: "`SignedOutCallbackPath`"): The request path within the app's base path intercepted by the OIDC handler where the user agent is first returned after signing out from the identity provider. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OIDC handler redirects to the [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%252A) or [Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%252A), if specified.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signout-callback-oidc

> **Note:**
> When using Microsoft Entra ID, set the path in the **Web** platform configuration's **Redirect URI** entries in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port. If you don't add the signed-out callback path URI to the app's registration in Entra, Entra refuses to redirect the user back to the app and merely asks them to close their browser window.

[Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%252A): Requests received on this path cause the handler to invoke sign-out using the sign-out scheme.

In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost/signout-oidc

> **Note:**
> When using Microsoft Entra ID, set the **Front-channel logout URL** in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port.

```csharp
oidcOptions.CallbackPath = new PathString("{PATH}");
oidcOptions.SignedOutCallbackPath = new PathString("{PATH}");
oidcOptions.RemoteSignOutPath = new PathString("{PATH}");
```

Examples (default values):

```csharp
oidcOptions.CallbackPath = new PathString("/signin-oidc");
oidcOptions.SignedOutCallbackPath = new PathString("/signout-callback-oidc");
oidcOptions.RemoteSignOutPath = new PathString("/signout-oidc");
```

(*Microsoft Azure only with the "common" endpoint*) [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A): Many OIDC providers work with the default issuer validator, but we need to account for the issuer parameterized with the Tenant ID (`{TENANT ID}`) returned by `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`. For more information, see [SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "common" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731)](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/issues/1731).

Only for apps using Microsoft Entra ID with the "common" endpoint:

```csharp
var microsoftIssuerValidator = AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = microsoftIssuerValidator.Validate;
```

## Blazor Web App client project (`BlazorWebAppOidc.Client`)

The `BlazorWebAppOidc.Client` project is the client-side project of the Blazor Web App.

**Applies to: \>= aspnetcore-9.0**

The client calls [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A) to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.



**Applies to: < aspnetcore-9.0**

The `PersistentAuthenticationStateProvider` class (`PersistentAuthenticationStateProvider.cs`) is a client-side [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) that determines the user's authentication state by looking for data persisted in the page when it was rendered on the server. The authentication state is fixed for the lifetime of the WebAssembly application.



If the user needs to log in or out, a full page reload is required.

The sample app only provides a user name and email for display purposes.



**Applies to: without-yarp-and-aspire-server**


**Applies to: \>= aspnetcore-9.0**

For Microsoft Entra ID or Azure AD B2C, you can use [Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp%252A) from [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) ([`Microsoft.Identity.Web` NuGet package](https://www.nuget.org/packages/Microsoft.Identity.Web), [API documentation](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/security/\[Microsoft.Identity.Web]\(https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web\))), which adds both the OIDC and Cookie authentication handlers with the appropriate defaults. The sample app and the guidance in this article don't use Microsoft Identity Web. The guidance demonstrates how to configure the OIDC handler *manually* for any OIDC provider. For more information on implementing Microsoft Identity Web, see [blazor/security/blazor-web-app-entra](blazor-web-app-with-entra.md).



This version of the article covers implementing OIDC with the [Backend for Frontend (BFF) pattern](https://learn.microsoft.com/azure/architecture/patterns/backends-for-frontends) without [YARP](https://dotnet.github.io/yarp/) and [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview). Change the article version selector to **With YARP and Aspire (Interactive Auto)** if the app's specification calls for adopting YARP and Aspire.

The following specification is adopted:

* The Blazor Web App uses [the Server render mode with global interactivity](../components/render-modes.md).
* This app is a starting point for any OIDC authentication flow. OIDC is configured manually in the app and doesn't rely upon [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra) or [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) packages, nor does the sample app require [Microsoft Azure](https://azure.microsoft.com/) hosting. However, the sample app can be used with Entra, Microsoft Identity Web, and hosted in Azure.
* Automatic non-interactive token refresh.
* A separate web API project demonstrates a secure web API call for weather data.

For an alternative experience using [Microsoft Authentication Library for .NET](https://learn.microsoft.com/entra/msal/dotnet/), [Microsoft Identity Web](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/), and [Microsoft Entra ID](https://www.microsoft.com/security/business/identity-access/microsoft-entra-id), see [blazor/security/blazor-web-app-entra](blazor-web-app-with-entra.md).

## Sample solution

The sample app consists of the following projects:

* `BlazorWebAppOidcServer`: Blazor Web App server-side project (global Interactive Server rendering).
* `MinimalApiJwt`: Backend web API with a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppOidcBffServer` folder for .NET 8 or later.

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppOidcServer` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppOidcServer`) with a **Web** platform configuration and a **Redirect URI** of `https://localhost/signin-oidc` (a port isn't required). The app's tenant ID and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `Program` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal's **Implicit grant and hybrid flows** app registration configuration, don't select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Establish the client secret

*This section only applies to the server project of the Blazor Web App (`BlazorWebAppOidcServer` project).*

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


For local development testing, use the [Secret Manager tool](../../security/app-secrets.md) to store the Blazor server project's client secret under the configuration key `Authentication:Schemes:MicrosoftOidc:ClientSecret`.

The Blazor server project hasn't been initialized for the Secret Manager tool. Use a command shell, such as the Developer PowerShell command shell in Visual Studio, to execute the following command. Before executing the command, change the directory with the `cd` command to the server project's directory. The command establishes a user secrets identifier (`<UserSecretsId>` in the app's project file):

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret. The `{SECRET}` placeholder is the client secret obtained from the app's registration:

```dotnetcli
dotnet user-secrets set "Authentication:Schemes:MicrosoftOidc:ClientSecret" "{SECRET}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the project in **Solution Explorer** and selecting **Manage User Secrets**.

## `MinimalApiJwt` project

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data.

The `MinimalApiJwt.http` file can be used for testing the weather data request. Note that the `MinimalApiJwt` project must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see [test/http-files](../../test/http-files.md).

**Applies to: \>= aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md).



**Applies to: < aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../fundamentals/openapi/overview.md) and the [Swagger UI](https://swagger.io/api-hub/) in the `Development` environment. For more information, see [fundamentals/openapi/using-openapi-documents#use-swagger-ui-for-local-ad-hoc-testing](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Fusing-openapi-documents%23use-swagger-ui-for-local-ad-hoc-testing).



The project creates a [Minimal API](../../fundamentals/minimal-apis.md) endpoint for weather data:

```csharp
app.MapGet("/weather-forecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
}).RequireAuthorization();
```

Configure the project in the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions) of the [Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer%252A) call in the project's `Program` file.

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority%252A) sets the Authority for making OIDC calls. We recommend using a separate app registration for the `MinimalApiJwt` project. The authority matches the issurer (`iss`) of the JWT returned by the identity provider.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The format of the Authority depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee`.

ME-ID tenant Authority example:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see [blazor/security/blazor-web-app-entra#sts-token-version](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fblazor-web-app-entra%23sts-token-version).

AAD B2C tenant Authority example:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience%252A) sets the Audience for any received OIDC token. 

```csharp
jwtOptions.Audience = "{APP ID URI}";
```

> **Note:**
> When using Microsoft Entra ID, match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The format of the Audience depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `contoso` and a Client ID of `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant App ID URI example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```

## `BlazorWebAppOidcServer` project

Automatic non-interactive token refresh is managed by a custom cookie refresher (`CookieOidcRefresher.cs`).

A [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) (`TokenHandler`) manages attaching a user's access token to outgoing requests. The token handler only executes during static server-side rendering (static SSR), so using [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext) is safe in this scenario. For more information, see [blazor/components/httpcontext](../components/httpcontext.md) and [blazor/security/additional-scenarios#use-a-token-handler-for-web-api-calls](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls).

`TokenHandler.cs`:

```csharp
public class TokenHandler(IHttpContextAccessor httpContextAccessor) : 
    DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (httpContextAccessor.HttpContext is null)
        {
            throw new Exception("HttpContext not available");
        }

        var accessToken = await httpContextAccessor.HttpContext
            .GetTokenAsync("access_token");

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
```

In the project's `Program` file, the token handler (`TokenHandler`) is registered as a service and specified as the message handler with [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%252A) for making secure requests to the backend `MinimalApiJwt` web API using a [named HTTP client](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) ("`ExternalApi`").

```csharp
builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("ExternalApi",
      client => client.BaseAddress = new Uri(builder.Configuration["ExternalApiUri"] ?? 
          throw new Exception("Missing base address!")))
      .AddHttpMessageHandler<TokenHandler>();
```

The `Weather` component uses the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) to prevent unauthorized access. For more information on requiring authorization across the app via an [authorization policy](../../security/authorization/policies.md) and opting out of authorization at a subset of public endpoints, see the [Razor Pages OIDC guidance](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fconfigure-oidc-web-authentication%23force-authorization).

The `ExternalApi` HTTP client is used to make a request for weather data to the secure web API. In the [`OnInitializedAsync` lifecycle event](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync) of `Weather.razor`:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
var client = ClientFactory.CreateClient("ExternalApi");
using var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();

forecasts = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
    throw new IOException("No weather forecast!");
```

In the project's `appsettings.json` file, configure the external API URI:

```json
"ExternalApiUri": "{BASE ADDRESS}"
```

Example:

```json
"ExternalApiUri": "https://localhost:7277"
```

The following [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions) configuration is found in the project's `Program` file on the call to [Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect%252A):

**Applies to: \>= aspnetcore-9.0**

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior%252A): Controls [Pushed Authorization Requests (PAR) support](https://learn.microsoft.com/search/?terms=aspnetcore-9%23openidconnecthandler-adds-support-for-pushed-authorization-requests-par). By default, the setting is to use PAR if the identity provider's discovery document (usually found at `.well-known/openid-configuration`) advertises support for PAR. If you wish to require PAR support for the app, you can assign a value of [`PushedAuthorizationBehavior.Require`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.PushedAuthorizationBehavior). PAR isn't supported by Microsoft Entra, and there are no plans for Entra to ever support it in the future.

```csharp
oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.UseIfAvailable;
```



[Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme%252A): Sets the authentication scheme corresponding to the middleware responsible of persisting user's identity after a successful authentication. The OIDC handler needs to use a sign-in scheme that's capable of persisting user credentials across requests. The following line is present merely for demonstration purposes. If omitted, [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme%252A) is used as a fallback value.

```csharp
oidcOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
```

Scopes for `openid` and `profile` ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)) (Optional): The `openid` and `profile` scopes are also configured by default because they're required for the OIDC handler to work, but these may need to be re-added if scopes are included in the `Authentication:Schemes:MicrosoftOidc:Scope` configuration. For general configuration guidance, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md) and [blazor/fundamentals/configuration](../fundamentals/configuration.md).

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
```

Configure the `Weather.Get` scope for accessing the external web API for weather data. The following example is based on using Entra ID in an ME-ID tenant domain. In the following example, the `{APP ID URI}` placeholder is found in the Entra or Azure portal where the web API is exposed. For any other identity provider, use the appropriate scope.

```csharp
oidcOptions.Scope.Add("{APP ID URI}/Weather.Get");
```

The format of the scope depends on the type of tenant in use. In the following examples, the Tenant Domain is `contoso.onmicrosoft.com`, and the Client ID is `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

AAD B2C tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

[Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%252A): Defines whether access and refresh tokens should be stored in the [Microsoft.AspNetCore.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties) after a successful authorization. This property is set to `true` so the refresh token gets stored for non-interactive token refresh.

```csharp
oidcOptions.SaveTokens = true;
```

Scope for offline access ([Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope%252A)): The `offline_access` scope is required for the refresh token.

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority%252A) and [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId%252A): Sets the Authority and Client ID for OIDC calls.

```csharp
oidcOptions.Authority = "{AUTHORITY}";
oidcOptions.ClientId = "{CLIENT ID}";
```

The following example uses a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a Client ID of `00001111-aaaa-2222-bbbb-3333cccc4444`:

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
oidcOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
```

For multi-tenant apps, the "common" authority should be used. You can also use the "common" authority for single-tenant apps, but a custom [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A) is required, as shown later in this section.

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/common/v2.0";
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType%252A): Configures the OIDC handler to only perform authorization code flow. Implicit grants and hybrid flows are unnecessary in this mode. The OIDC handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

```csharp
oidcOptions.ResponseType = OpenIdConnectResponseType.Code;
```

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) and configuration of [Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType%252A) and [Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType%252A): Many OIDC servers use "`name`" and "`role`" rather than the SOAP/WS-Fed defaults in [System.Security.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes). When [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) is set to `false`, the handler doesn't perform claims mappings, and the claim names from the JWT are used directly by the app. The following example sets the role claim type to "`roles`," which is appropriate for [Microsoft Entra ID (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra). Consult your identity provider's documentation for more information.

> **Note:**
> [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims%252A) must be set to `false` for most OIDC providers, which prevents renaming claims.

```csharp
oidcOptions.MapInboundClaims = false;
oidcOptions.TokenValidationParameters.NameClaimType = "name";
oidcOptions.TokenValidationParameters.RoleClaimType = "roles";
```

Path configuration: Paths must match the redirect URI (login callback path) and post logout redirect (signed-out callback path) paths configured when registering the application with the OIDC provider. In the Azure portal, paths are configured in the **Authentication** blade of the app's registration. Both the sign-in and sign-out paths must be registered as redirect URIs. The default values are `/signin-oidc` and `/signout-callback-oidc`.

[Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.CallbackPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.CallbackPath): The request path within the app's base path where the user-agent is returned.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signin-oidc

> **Note:**
> A port isn't required for `localhost` addresses when using Microsoft Entra ID. Most other OIDC providers require the correct port.

[Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath%252A) (configuration key: "`SignedOutCallbackPath`"): The request path within the app's base path intercepted by the OIDC handler where the user agent is first returned after signing out from the identity provider. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OIDC handler redirects to the [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri%252A) or [Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri%252A), if specified.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost:{PORT}/signout-callback-oidc

> **Note:**
> When using Microsoft Entra ID, set the path in the **Web** platform configuration's **Redirect URI** entries in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port. If you don't add the signed-out callback path URI to the app's registration in Entra, Entra refuses to redirect the user back to the app and merely asks them to close their browser window.
  
[Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath%252A): Requests received on this path cause the handler to invoke sign-out using the sign-out scheme.

In the following example, the `{PORT}` placeholder is the app's port:

> https\://localhost/signout-oidc

> **Note:**
> When using Microsoft Entra ID, set the **Front-channel logout URL** in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port.

```csharp
oidcOptions.CallbackPath = new PathString("{PATH}");
oidcOptions.SignedOutCallbackPath = new PathString("{PATH}");
oidcOptions.RemoteSignOutPath = new PathString("{PATH}");
```

Examples (default values):

```csharp
oidcOptions.CallbackPath = new PathString("/signin-oidc");
oidcOptions.SignedOutCallbackPath = new PathString("/signout-callback-oidc");
oidcOptions.RemoteSignOutPath = new PathString("/signout-oidc");
```

(*Microsoft Azure only with the "common" endpoint*) [Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%2A](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator%252A): Many OIDC providers work with the default issuer validator, but we need to account for the issuer parameterized with the Tenant ID (`{TENANT ID}`) returned by `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`. For more information, see [SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "common" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731)](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/issues/1731).

Only for apps using Microsoft Entra ID with the "common" endpoint:

```csharp
var microsoftIssuerValidator = AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = microsoftIssuerValidator.Validate;
```



**Applies to: \>= aspnetcore-9.0**

## Only serialize the name and role claims

*This section only applies to the Interactive Auto render mode sample apps.*

In the `Program` file, all claims are serialized by setting [Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims%252A) to `true`. If you only want the name and role claims serialized for CSR, remove the option or set it to `false`.



## Supply configuration with the JSON configuration provider (app settings)

The [sample solution projects](#sample-solution) configure OIDC and JWT bearer authentication in their `Program` files in order to make configuration settings discoverable using C# autocompletion. Professional apps usually use a *configuration provider* to configure OIDC options, such as the default [JSON configuration provider](../../fundamentals/configuration/index.md). The JSON configuration provider loads configuration from app settings files `appsettings.json`/`appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's [runtime environment](../../fundamentals/environments.md). Follow the guidance in this section to use app settings files for configuration.

In the app settings file (`appsettings.json`) of the `BlazorWebAppOidc` or `BlazorWebAppOidcServer` project, add the following JSON configuration:

```json
"Authentication": {
  "Schemes": {
    "MicrosoftOidc": {
      "Authority": "https://login.microsoftonline.com/{TENANT ID (BLAZOR APP)}/v2.0",
      "ClientId": "{CLIENT ID (BLAZOR APP)}",
      "CallbackPath": "/signin-oidc",
      "SignedOutCallbackPath": "/signout-callback-oidc",
      "RemoteSignOutPath": "/signout-oidc",
      "SignedOutRedirectUri": "/",
      "Scope": [
        "openid",
        "profile",
        "offline_access",
        "{APP ID URI (WEB API)}/Weather.Get"
      ]
    }
  }
},
```

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{TENANT ID (BLAZOR APP)}`: The Tenant Id of the Blazor app.
* `{CLIENT ID (BLAZOR APP)}`: The Client Id of the Blazor app.
* `{APP ID URI (WEB API)}`: The App ID URI of the web API.

The "common" Authority (`https://login.microsoftonline.com/common/v2.0`) should be used for multi-tenant apps. To use the "common" Authority for single-tenant apps, see the [Use the "common" Authority for single-tenant apps](#use-the-common-authority-for-single-tenant-apps) section.

Update any other values in the preceding configuration to match custom/non-default values used in the `Program` file.

The configuration is automatically picked up by the authentication builder.

Remove the following lines from the `Program` file:

```diff
- oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
- oidcOptions.Scope.Add("...");
- oidcOptions.CallbackPath = new PathString("...");
- oidcOptions.SignedOutCallbackPath = new PathString("...");
- oidcOptions.RemoteSignOutPath = new PathString("...");
- oidcOptions.Authority = "...";
- oidcOptions.ClientId = "...";
```

In the `ConfigureCookieOidc` method of `CookieOidcServiceCollectionExtensions.cs`, remove the following line:

```diff
- oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

In the `MinimalApiJwt` project, add the following app settings configuration to the `appsettings.json` file:

```json
"Authentication": {
  "Schemes": {
    "Bearer": {
      "Authority": "https://sts.windows.net/{TENANT ID (WEB API)}/",
      "ValidAudiences": [ "{APP ID URI (WEB API)}" ]
    }
  }
},
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see [blazor/security/blazor-web-app-entra#sts-token-version](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fblazor-web-app-entra%23sts-token-version).

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{TENANT ID (WEB API)}`: The Tenant Id of the web API.
* `{APP ID URI (WEB API)}`: The App ID URI of the web API.

Authority formats adopt the following patterns:

* ME-ID tenant type: `https://sts.windows.net/{TENANT ID}/`
* Microsoft Entra External ID: `https://{DIRECTORY NAME}.ciamlogin.com/{TENANT ID}/v2.0`
* B2C tenant type: `https://login.microsoftonline.com/{TENANT ID}/v2.0`

The preceding example for the ME-ID tenant type uses the V1 STS token URL format. For guidance on V2 STS tokens, see [blazor/security/blazor-web-app-entra#sts-token-version](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fblazor-web-app-entra%23sts-token-version).

Audience formats adopt the following patterns (`{CLIENT ID}` is the Client Id of the web API; `{DIRECTORY NAME}` is the directory name, for example, `contoso`):

* ME-ID tenant type: `api://{CLIENT ID}`
* Microsoft Entra External ID: `{CLIENT ID}`
* B2C tenant type: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID}`

The configuration is automatically picked up by the JWT bearer authentication builder.

Remove the following lines from the `Program` file:

```diff
- jwtOptions.Authority = "...";
- jwtOptions.Audience = "...";
```

For more information on configuration, see the following resources:

* [fundamentals/configuration/index](../../fundamentals/configuration/index.md)
* [blazor/fundamentals/configuration](../fundamentals/configuration.md)

## Use the "common" Authority for single-tenant apps

You can use the "common" Authority for single-tenant apps, but you must take the following steps to implement a custom issuer validator.

Add the [`Microsoft.IdentityModel.Validators` NuGet package](https://www.nuget.org/packages/Microsoft.IdentityModel.Validators) to the server project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


At the top of the `Program` file, make the [Microsoft.IdentityModel.Validators](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Validators) namespace available:

```csharp
using Microsoft.IdentityModel.Validators;
```

Use the following code in the `Program` file where OIDC options are configured:

```csharp
var microsoftIssuerValidator = 
    AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = 
    microsoftIssuerValidator.Validate;
```

For more information, see [SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "common" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731)](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/issues/1731).

## Redirect to the home page on logout

The `LogInOrOut` component (`Layout/LogInOrOut.razor`) sets a hidden field for the return URL (`ReturnUrl`) to the current URL (`currentURL`). When the user signs out of the app, the identity provider returns the user to the page from which they logged out. If the user logs out from a secure page, they're returned to the same secure page and sent back through the authentication process. This authentication flow is reasonable when users need to change accounts regularly.

Alternatively, use the following `LogInOrOut` component, which doesn't supply a return URL when logging out.

`Layout/LogInOrOut.razor`:

```razor
<div class="nav-item px-3">
    <AuthorizeView>
        <Authorized>
            <form action="authentication/logout" method="post">
                <AntiforgeryToken />
                <button type="submit" class="nav-link">
                    <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true">
                    </span> Logout
                </button>
            </form>
        </Authorized>
        <NotAuthorized>
            <a class="nav-link" href="authentication/login">
                <span class="bi bi-person-badge-nav-menu" aria-hidden="true"></span> 
                Login
            </a>
        </NotAuthorized>
    </AuthorizeView>
</div>
```

**Applies to: < aspnetcore-10.0**

## Token refresh

The custom cookie refresher (`CookieOidcRefresher.cs`) implementation updates the user's claims automatically when they expire. The current implementation expects to receive an ID token from the token endpoint in exchange for the refresh token. The claims in this ID token are then used to overwrite the user's claims.

The sample implementation doesn't include code for requesting claims from the [UserInfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo) on token refresh. For more information, see [`BlazorWebAppOidc AddOpenIdConnect with GetClaimsFromUserInfoEndpoint = true doesn't propogate [sic] role claims to client` (`dotnet/aspnetcore` #58826)](https://github.com/dotnet/aspnetcore/issues/58826#issuecomment-2492738142).

> **Note:**
> Some identity providers [only return an access token when using a refresh token](https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokenResponse). The `CookieOidcRefresher` can be updated with additional logic to continue to use the prior set of claims stored in the authentication cookie or use the access token to request claims from the UserInfo endpoint.



## Cryptographic nonce

A *nonce* is a string value that associates a client's session with an ID token to mitigate [replay attacks](https://developer.mozilla.org/docs/Glossary/Replay_attack).

If you receive a nonce error during authentication development and testing, use a new InPrivate/incognito browser session for each test run, no matter how small the change made to the app or test user because stale cookie data can lead to a nonce error. For more information, see the [Cookies and site data](#cookies-and-site-data) section.

A nonce isn't required or used when a refresh token is exchanged for a new access token. In the sample app, the `CookieOidcRefresher` (`CookieOidcRefresher.cs`) deliberately sets [Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectProtocolValidator.RequireNonce](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectProtocolValidator.RequireNonce) to `false`.

## Application roles for apps not registered with Microsoft Entra (ME-ID)

*This section pertains to apps that don't use [Microsoft Entra ID (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra) as the identity provider. For apps registered with ME-ID, see the [Application roles for apps registered with Microsoft Entra (ME-ID)](#application-roles-for-apps-registered-with-microsoft-entra-me-id) section.*

Configure the role claim type ([Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType)) in the [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions) of `Program.cs`:

```csharp
oidcOptions.TokenValidationParameters.RoleClaimType = "{ROLE CLAIM TYPE}";
```

For many OIDC identity providers, the role claim type is `role`. Check your identity provider's documentation for the correct value.

Replace the `UserInfo` class in the `BlazorWebAppOidc.Client` project with the following class.

`UserInfo.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using System.Security.Claims;

namespace BlazorWebAppOidc.Client;

// Add properties to this class and update the server and client 
// AuthenticationStateProviders to expose more information about 
// the authenticated user to the client.
public sealed class UserInfo
{
    public required string UserId { get; init; }
    public required string Name { get; init; }
    public required string[] Roles { get; init; }

    public const string UserIdClaimType = "sub";
    public const string NameClaimType = "name";
    private const string RoleClaimType = "role";

    public static UserInfo FromClaimsPrincipal(ClaimsPrincipal principal) =>
        new()
        {
            UserId = GetRequiredClaim(principal, UserIdClaimType),
            Name = GetRequiredClaim(principal, NameClaimType),
            Roles = principal.FindAll(RoleClaimType).Select(c => c.Value)
                .ToArray(),
        };

    public ClaimsPrincipal ToClaimsPrincipal() =>
        new(new ClaimsIdentity(
            Roles.Select(role => new Claim(RoleClaimType, role))
                .Concat([
                    new Claim(UserIdClaimType, UserId),
                    new Claim(NameClaimType, Name),
                ]),
            authenticationType: nameof(UserInfo),
            nameType: NameClaimType,
            roleType: RoleClaimType));

    private static string GetRequiredClaim(ClaimsPrincipal principal,
        string claimType) =>
            principal.FindFirst(claimType)?.Value ??
            throw new InvalidOperationException(
                $"Could not find required '{claimType}' claim.");
}
```

At this point, Razor components can adopt [role-based and policy-based authorization](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23role-based-and-policy-based-authorization). Application roles appear in `role` claims, one claim per role.

## Application roles for apps registered with Microsoft Entra (ME-ID)

Use the guidance in this section to implement application roles, ME-ID security groups, and ME-ID built-in administrator roles for apps using [Microsoft Entra ID (ME-ID)](https://www.microsoft.com/security/business/microsoft-entra).

The approach described in this section configures ME-ID to send groups and roles in the authentication cookie header. When users are only a member of a few security groups and roles, the following approach should work for most hosting platforms without running into a problem where headers are too long, for example with IIS hosting that has a default header length limit of 16 KB (`MaxRequestBytes`). If header length is a problem due to high group or role membership, we recommend not following the guidance in this section in favor of implementing [Microsoft Graph](https://learn.microsoft.com/graph/sdks/sdks-overview) to obtain a user's groups and roles from ME-ID separately, an approach that doesn't inflate the size of the authentication cookie. For more information, see [Bad Request - Request Too Long - IIS Server (`dotnet/aspnetcore` #57545)](https://github.com/dotnet/aspnetcore/issues/57545).

Configure the role claim type ([Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType](https://learn.microsoft.com/search/?terms=Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType)) in [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions) of `Program.cs`. Set the value to `roles`:

```csharp
oidcOptions.TokenValidationParameters.RoleClaimType = "roles";
```

Although you can't [assign roles to groups](https://learn.microsoft.com/entra/identity/role-based-access-control/groups-concept) without an ME-ID Premium account, you can assign roles to users and receive role claims for users with a standard Azure account. The guidance in this section doesn't require an ME-ID Premium account.

When working with the default directory, follow the guidance in [Add app roles to your application and receive them in the token (ME-ID documentation)](https://learn.microsoft.com/entra/identity-platform/howto-add-app-roles-in-apps) to configure and assign roles. If you aren't working with the default directory, edit the app's manifest in the Azure portal to establish the app's roles manually in the `appRoles` entry of the manifest file. For more information, see [Configure the role claim (ME-ID documentation)](https://learn.microsoft.com/entra/identity-platform/enterprise-app-role-management).

A user's Azure security groups arrive in `groups` claims, and a user's built-in ME-ID administrator role assignments arrive in [well-known IDs (`wids`) claims](https://learn.microsoft.com/entra/identity-platform/access-tokens#payload-claims). Values for both claim types are GUIDs. When received by the app, these claims can be used to establish [role and policy authorization in Razor components](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23role-based-and-policy-based-authorization).

In the app's manifest in the Azure portal, set the [`groupMembershipClaims` attribute](https://learn.microsoft.com/entra/identity-platform/reference-app-manifest#groupmembershipclaims-attribute) to `All`. A value of `All` results in ME-ID sending all of the security/distribution groups (`groups` claims) and roles (`wids` claims) of the signed-in user. To set the `groupMembershipClaims` attribute:

1. Open the app's registration in the Azure portal.
1. Select **Manage** > **Manifest** in the sidebar.
1. Find the `groupMembershipClaims` attribute.
1. Set the value to `All` (`"groupMembershipClaims": "All"`).
1. Select the **Save** button.

Replace the `UserInfo` class in the `BlazorWebAppOidc.Client` project with the following class.

`UserInfo.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using System.Security.Claims;

namespace BlazorWebAppOidc.Client;

// Add properties to this class and update the server and client 
// AuthenticationStateProviders to expose more information about 
// the authenticated user to the client.
public sealed class UserInfo
{
    public required string UserId { get; init; }
    public required string Name { get; init; }
    public required string[] Roles { get; init; }
    public required string[] Groups { get; init; }
    public required string[] Wids { get; init; }

    public const string UserIdClaimType = "sub";
    public const string NameClaimType = "name";
    private const string RoleClaimType = "roles";
    private const string GroupsClaimType = "groups";
    private const string WidsClaimType = "wids";

    public static UserInfo FromClaimsPrincipal(ClaimsPrincipal principal) =>
        new()
        {
            UserId = GetRequiredClaim(principal, UserIdClaimType),
            Name = GetRequiredClaim(principal, NameClaimType),
            Roles = principal.FindAll(RoleClaimType).Select(c => c.Value)
                .ToArray(),
            Groups = principal.FindAll(GroupsClaimType).Select(c => c.Value)
                .ToArray(),
            Wids = principal.FindAll(WidsClaimType).Select(c => c.Value)
                .ToArray(),
        };

    public ClaimsPrincipal ToClaimsPrincipal() =>
        new(new ClaimsIdentity(
            Roles.Select(role => new Claim(RoleClaimType, role))
                .Concat(Groups.Select(role => new Claim(GroupsClaimType, role)))
                .Concat(Wids.Select(role => new Claim(WidsClaimType, role)))
                .Concat([
                    new Claim(UserIdClaimType, UserId),
                    new Claim(NameClaimType, Name),
                ]),
            authenticationType: nameof(UserInfo),
            nameType: NameClaimType,
            roleType: RoleClaimType));

    private static string GetRequiredClaim(ClaimsPrincipal principal,
        string claimType) =>
            principal.FindFirst(claimType)?.Value ??
            throw new InvalidOperationException(
                $"Could not find required '{claimType}' claim.");
}
```

At this point, Razor components can adopt [role-based and policy-based authorization](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23role-based-and-policy-based-authorization):

* Application roles appear in `roles` claims, one claim per role.
* Security groups appear in `groups` claims, one claim per group. The security group GUIDs appear in the Azure portal when you create a security group and are listed when selecting **Identity** > **Overview** > **Groups** > **View**.
* Built-in ME-ID administrator roles appear in `wids` claims, one claim per role. The `wids` claim with a value of `b79fbf4d-3ef9-4689-8143-76b194e85509` is always sent by ME-ID for non-guest accounts of the tenant and doesn't refer to an administrator role. Administrator role GUIDs (*role template IDs*) appear in the Azure portal when selecting **Roles & admins**, followed by the ellipsis (**&hellip;**) > **Description** for the listed role. The role template IDs are also listed in [Microsoft Entra built-in roles (Entra documentation)](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference).

## Alternative: Duende Access Token Management

In the sample app, a custom cookie refresher (`CookieOidcRefresher.cs`) implementation is used to perform automatic non-interactive token refresh. An alternative solution can be found in the open source [`Duende.AccessTokenManagement.OpenIdConnect` package](https://docs.duendesoftware.com/accesstokenmanagement/web-apps/).

Duende Access Token Management provides automatic access token management features for .NET worker and ASP.NET Core web apps, including Blazor, without the need to add a custom cookie refresher.

After the package is installed, remove the `CookieOidcRefresher` and add access token management for the currently logged-in user in the `Program` file:

```csharp
// Add services for token management
builder.Services.AddOpenIdConnectAccessTokenManagement();

// Register a typed HTTP client with token management support
builder.Services.AddHttpClient<InvoiceClient>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com/invoices/");
    })
    .AddUserAccessTokenHandler();
```

The [typed HTTP client](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23typed-httpclient) (or [named HTTP client](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory), if implemented) has automatic access token lifetime management on behalf of the currently logged-in user, including transparent refresh token management.

For more information, see the [Duende Access Token Management documentation for Blazor](https://docs.duendesoftware.com/accesstokenmanagement/blazor-server/).

## Host in a web farm or cluster

Server-side Blazor Web Apps hosted in a web farm or cluster of machines must adopt [*session affinity*](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23use-session-affinity-sticky-sessions-for-server-side-web-farm-hosting) to maintain Blazor circuits for users of the app.

We also recommend using a shared [Data Protection](../../security/data-protection/introduction.md) key ring in production, even when the app uses the Interactive WebAssembly render mode exclusively for client-side rendering (no Blazor circuits). For more information, see the following articles:

* [security/data-protection/configuration/overview](../../security/data-protection/configuration/overview.md)
* [security/data-protection/implementation/key-storage-providers](../../security/data-protection/implementation/key-storage-providers.md)
* [security/data-protection/implementation/key-encryption-at-rest](../../security/data-protection/implementation/key-encryption-at-rest.md)

## Troubleshoot

### Logging

The server app is a standard ASP.NET Core app. See the [ASP.NET Core logging guidance](../../fundamentals/logging/index.md) to enable a lower logging level in the server app.

To enable debug or trace logging for Blazor WebAssembly authentication, see the *Client-side authentication logging* section of [blazor/fundamentals/logging](../fundamentals/logging.md) with the article version selector set to ASP.NET Core in .NET 7 or later.

### Common errors

* Debugger breaks on an exception during logout with Microsoft Entra External ID

  The following exception stops the Visual Studio debugger during logout with [Microsoft Entra External ID](https://learn.microsoft.com/entra/external-id/external-identities-overview):

  > Uncaught TypeError TypeError: Failed to execute 'postMessage' on 'Window': The provided value cannot be converted to a sequence.

  Visual Studio Debugger breaking on JavaScript exception during logout

  The exception is thrown from Entra JavaScript code, so this isn't a problem with ASP.NET Core. The exception doesn't impact app functionality in production, so the exception can be ignored during local development testing.

* Misconfiguration of the app or Identity Provider (IP)

  The most common errors are caused by incorrect configuration. The following are a few examples:
  
  * Depending on the requirements of the scenario, a missing or incorrect Authority, Instance, Tenant ID, Tenant domain, Client ID, or Redirect URI prevents an app from authenticating clients.
  * Incorrect request scopes prevent clients from accessing server web API endpoints.
  * Incorrect or missing server API permissions prevent clients from accessing server web API endpoints.
  * Running the app at a different port than is configured in the Redirect URI of the IP's app registration. Note that a port isn't required for Microsoft Entra ID and an app running at a `localhost` development testing address, but the app's port configuration and the port where the app is running must match for non-`localhost` addresses.
  
  Configuration coverage in this article shows examples of the correct configuration. Carefully check the configuration looking for app and IP misconfiguration.
  
  If the configuration appears correct:
  
  * Analyze application logs.
  * Examine the network traffic between the client app and the IP or server app with the browser's developer tools. Often, an exact error message or a message with a clue to what's causing the problem is returned to the client by the IP or server app after making a request. Developer tools guidance is found in the following articles:

    * [Google Chrome](https://developers.google.com/web/tools/chrome-devtools/network) (Google documentation)
    * [Microsoft Edge](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/network/)
    * [Mozilla Firefox](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/index.html) (Mozilla documentation)
  
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

### Start the solution from the correct project

Blazor Web Apps:

* For one of the Backend-for-Frontend (BFF) pattern samples, start the solution from the ***`Aspire/Aspire.AppHost` project***.
* For one of the non-BFF pattern samples, start the solution from the ***server project***.

Blazor Server:

Start the solution from the ***server project***.

### Inspect the user

The following `UserClaims` component can be used directly in apps or serve as the basis for further customization.

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]

<PageTitle>User Claims</PageTitle>

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li><b>@claim.Type:</b> @claim.Value</li>
        }
    </ul>
}

@code {
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    [CascadingParameter]
    private Task<AuthenticationState>? AuthState { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthState == null)
        {
            return;
        }

        var authState = await AuthState;
        claims = authState.User.Claims;
    }
}
```

### Inspect the access token

Obtaining the access token during development is often helpful when troubleshooting app and Azure configuration problems. In the following example for a weather forecast endpoint, the bearer token and token details are logged only when the app is compiled with the `DEBUG` symbol, which is typically a Debug build. You can decode the token using an online JWT token decoder, such as the [Microsoft JWT token decoder](https://jwt.ms/), or log details from the token in C#, as the following example demonstrates.

> **Caution:**
> In production, avoid logging the token or its contents.

```csharp
app.MapGet("/weather-forecast", (HttpContext context, ILogger<Program> logger) =>
{
#if DEBUG
    var authHeader = context.Request.Headers.Authorization.FirstOrDefault(v => 
        v != null && 
        v.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase));

    if (authHeader is not null)
    {
        var token = authHeader["Bearer ".Length..].Trim();
        logger.LogDebug("Token: {Token}", token);

        try
        {
                var handler = 
                    new Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler();
                var jwtToken = handler.ReadJsonWebToken(token);
                logger.LogDebug("Audience: {Audience}", 
                    string.Join(", ", jwtToken.Audiences));
                logger.LogDebug("Issuer: {Issuer}", jwtToken.Issuer);
            var jwtToken = handler.ReadJwtToken(token);
            logger.LogDebug("Audience: {Audience}", 
                string.Join(", ", jwtToken.Audiences));
            logger.LogDebug("Issuer: {Issuer}", jwtToken.Issuer);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to decode token.");
        }
    }
#endif

    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
}).RequireAuthorization();
```


## Additional resources

<!-- UPDATE 11.0 The PU has scheduled dotnet/aspnetcore #55213
                 for investigation/resolution. It might be
                 addressed for .NET 11. -->

* [`AzureAD/microsoft-identity-web` GitHub repository](https://github.com/AzureAD/microsoft-identity-web/wiki): Helpful guidance on implementing Microsoft Identity Web for Microsoft Entra ID for ASP.NET Core apps, including links to sample apps and related Azure documentation. Currently, Blazor Web Apps aren't explicitly addressed by the Azure documentation, but the setup and configuration of a Blazor Web App for ME-ID and Azure hosting is the same as it is for any ASP.NET Core web app.
* [`AuthenticationStateProvider` service](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authenticationstateprovider-service)
* [Manage authentication state in Blazor Web Apps](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23manage-authentication-state-in-blazor-web-apps)
* [Refresh token during http request in Blazor Interactive Server with OIDC (`dotnet/aspnetcore` #55213)](https://github.com/dotnet/aspnetcore/issues/55213)
* [Secure data in Blazor Web Apps with Interactive Auto rendering](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23secure-data-in-blazor-web-apps-with-interactive-auto-rendering)
* [How to access an `AuthenticationStateProvider` from a `DelegatingHandler`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware)
* [Opaque (reference) access token support](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23opaque-reference-access-token-support)
