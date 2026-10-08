---
title: Use Graph API with ASP.NET Core Blazor WebAssembly
ai-usage: ai-assisted
author: guardrex
description: Learn how to use the Microsoft Graph SDK/API with Blazor WebAssembly apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/09/2026
uid: blazor/security/webassembly/graph-api
zone_pivot_groups: blazor-graph-api
---
# Use Graph API with ASP.NET Core Blazor WebAssembly

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


This article explains how to use [Microsoft Graph](https://learn.microsoft.com/graph/) in Blazor WebAssembly apps, which enables apps to access Microsoft Cloud resources.

Two approaches are covered:

* **Graph SDK**: The [Microsoft Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview) simplifies building high-quality, efficient, and resilient apps that access Microsoft Graph. Select the **Graph SDK** button at the top of this article to adopt this approach.

* **Named HttpClient with Graph API**: A [named `HttpClient`](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) can issue [Microsoft Graph API](https://learn.microsoft.com/graph/use-the-api) requests directly to Microsoft Graph. Select the **Named HttpClient with Graph API** button at the top of this article to adopt this approach.

The guidance in this article isn't meant to replace the [Microsoft Graph documentation](https://learn.microsoft.com/graph/) and Azure security guidance in other Microsoft documentation sets. Assess the security guidance in the [Additional resources](#additional-resources) section of this article before implementing Microsoft Graph in a production environment. Follow Microsoft's best practices to limit the vulnerabilities of your apps.

Additional approaches for working with Microsoft Graph and Blazor WebAssembly are provided by the following Microsoft Graph and Azure samples:

* [Microsoft Graph sample Blazor WebAssembly app](https://github.com/microsoftgraph/msgraph-sample-blazor-clientside): The sample adopts a factory-based approach with the [Microsoft Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview) to obtain Office 365 data. The sample uses a default [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to make Graph client requests. If you need to use the default [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) with the base address of the app (`BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)`) for other purposes, for example to load data from the web root of the app, consider refactoring the Graph client factory to use a [named `HttpClient`](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) dedicated to Graph requests.
* [ASP.NET Core in .NET 8 Blazor WebAssembly | standalone app | user sign-in, protected web API access (Microsoft Graph) | Microsoft identity platform](https://github.com/Azure-Samples/ms-identity-docs-code-dotnet/tree/main/spa-blazor-wasm): The sample is a [Progressive Web Application (PWA)](../../progressive-web-app/index.md) that uses an authorization message handler and [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to obtain Graph data. As with the preceding sample, this sample also uses a default [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to make Graph client requests. Instead of using the Microsoft Graph SDK, the sample retrieves user account data as JSON via a [Microsoft Graph API](https://learn.microsoft.com/graph/use-the-api) request in a component. This is a similar technique to the **Named HttpClient with Graph API** approach in this article (use the button at the top of this article to see the guidance), except that this article's guidance uses a [named `HttpClient`](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) dedicated to Graph requests.

To provide feedback on either of the preceding two samples, open an issue on the sample's GitHub repository. If you're opening an issue for the Azure sample, provide a link to the sample in your opening comment because the Azure sample repository (`Azure-Samples`) contains many samples. Describe the problem in detail and include sample code as needed. Place a minimal app into GitHub that reproduces the problem or error. Be sure to remove Azure account configuration data from the sample before you commit it to the public repository.

To provide feedback or seek assistance with this article or ASP.NET Core, see [blazor/fundamentals/index#support-requests](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23support-requests). 

> **Important:**
> The scenarios described in this article apply to using Microsoft Entra (ME-ID) as the identity provider, not AAD B2C. Using Microsoft Graph with a client-side Blazor WebAssembly app and the AAD B2C identity provider isn't supported at this time because the app would require a client secret, which can't be secured in the client-side Blazor app. For an AAD B2C standalone Blazor WebAssembly app use Graph API, create a backend server (web) API to access Graph API on behalf of users. The client-side app authenticates and authorizes users to [call the web API](../../call-web-api.md) to securely access Microsoft Graph and return data to the client-side Blazor app from your server-based web API. The client secret is safely maintained in the server-based web API, not in the Blazor app on the client. **Never store a client secret in a client-side Blazor app.**

<!-- UPDATE 15.0 - Remove this INCLUDE file and delete all content
                   on B2C when .NET 15 releases in 2030, which is 
                   when B2C support ends for existing customer
                   accounts established prior to 5/1/25. -->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see [Azure AD B2C: Frequently asked questions (FAQ)](https://learn.microsoft.com/azure/active-directory-b2c/faq).


**Applies to: < aspnetcore-8.0**

Using a hosted Blazor WebAssembly app is supported, where the **Server** app uses the Graph SDK/API to provide Graph data to the **Client** app via web API. For more information, see the [Hosted Blazor WebAssembly solutions](#hosted-blazor-webassembly-solutions) section of this article.



The examples in this article take advantage of new .NET/C# features. When using the examples with .NET 7 or earlier, minor modifications are required. However, the text and code examples that pertain to interacting with Microsoft Graph are the same for all versions of ASP.NET Core.

**Applies to: graph-sdk-5**


*The following guidance applies to Microsoft Graph v5 or later.*

The Microsoft Graph SDK for use in Blazor apps is called the *Microsoft Graph .NET Client Library*.

**Applies to: \>= aspnetcore-8.0**

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).



**Applies to: < aspnetcore-8.0**

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app or the **Client** app of a hosted Blazor WebAssembly solution. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).



* [`Microsoft.AspNetCore.Components.WebAssembly.Authentication`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication)
* [`Microsoft.Authentication.WebAssembly.Msal`](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal)
* [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http)
* [`Microsoft.Graph`](https://www.nuget.org/packages/Microsoft.Graph)

> **Note:**
> The [`Microsoft.Authentication.WebAssembly.Msal` package](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal) transitively adds the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the Azure portal, grant delegated permissions (scopes)&dagger; for Microsoft Graph data that the app should be able to access on behalf of a user. For the example in this article, the app's registration should include delegated permission to read user data (`Microsoft.Graph` > `User.Read` scope in **API permissions**, Type: Delegated). The `User.Read` scope allows users to sign in to the app and allows the app to read the profile and company information of signed-in users. For more information, see [Overview of permissions and consent in the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/permissions-consent-overview) and [Overview of Microsoft Graph permissions](https://learn.microsoft.com/graph/permissions-overview).

&dagger;*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

After adding the Microsoft Graph API scopes to the app's registration in the Azure portal, add the following app settings configuration to the `wwwroot/appsettings.json` file in the app, which includes the Graph base URL with the Microsoft Graph version and scopes. In the following example, the `User.Read` scope is specified for the examples in later sections of this article. Scopes aren't case sensitive.

```json
"MicrosoftGraph": {
  "BaseUrl": "https://graph.microsoft.com",
  "Version": "{VERSION}",
  "Scopes": [
    "user.read"
  ]
}
```

In the preceding example, the `{VERSION}` placeholder is the version of the Microsoft Graph API (for example: `v1.0`).

The following is an example of a complete `wwwroot/appsettings.json` configuration file for an app that uses ME-ID as its identity provider, where reading user data (`user.read` scope) is specified for Microsoft Graph:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT ID}",
    "ValidateAuthority": true
  },
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com",
    "Version": "v1.0",
    "Scopes": [
      "user.read"
    ]
  }
}
```

In the preceding example, the `{TENANT ID}` placeholder is the Directory (tenant) ID, and the `{CLIENT ID}` placeholder is the Application (client) ID. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).

**Applies to: \>= aspnetcore-8.0**

Add the following `GraphClientExtensions` class to the standalone app. The scopes are provided to the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes) property of the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions) in the `AuthenticateRequestAsync` method.



**Applies to: < aspnetcore-8.0**

Add the following `GraphClientExtensions` class to the standalone app or **Client** app of a hosted Blazor WebAssembly [solution](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23visual-studio-solution-file-sln). The scopes are provided to the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes) property of the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions) in the `AuthenticateRequestAsync` method.



When an access token isn't obtained, the following code doesn't set a Bearer authorization header for Graph requests. 

`GraphClientExtensions.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Authentication.WebAssembly.Msal.Models;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions;
using Microsoft.Kiota.Abstractions.Authentication;
using IAccessTokenProvider = 
    Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider;

namespace BlazorSample;

internal static class GraphClientExtensions
{
    public static IServiceCollection AddGraphClient(
            this IServiceCollection services, string? baseUrl, List<string>? scopes)
    {
        if (string.IsNullOrEmpty(baseUrl) || scopes?.Count == 0)
        {
            return services;
        }

        services.Configure<RemoteAuthenticationOptions<MsalProviderOptions>>(
            options =>
            {
                scopes?.ForEach((scope) =>
                {
                    options.ProviderOptions.DefaultAccessTokenScopes.Add(scope);
                });
            });

        services.AddScoped<IAuthenticationProvider, GraphAuthenticationProvider>();

        services.AddScoped(sp =>
        {
            return new GraphServiceClient(
                new HttpClient(),
                sp.GetRequiredService<IAuthenticationProvider>(),
                baseUrl);
        });

        return services;
    }

    private class GraphAuthenticationProvider(IAccessTokenProvider tokenProvider, 
        IConfiguration config) : IAuthenticationProvider
    {
        private readonly IConfiguration config = config;

        public IAccessTokenProvider TokenProvider { get; } = tokenProvider;

        public async Task AuthenticateRequestAsync(RequestInformation request, 
            Dictionary<string, object>? additionalAuthenticationContext = null, 
            CancellationToken cancellationToken = default)
        {
            var result = await TokenProvider.RequestAccessToken(
                new AccessTokenRequestOptions()
                {
                    Scopes = 
                        config.GetSection("MicrosoftGraph:Scopes").Get<string[]>() ??
                        [ "user.read" ]
                });

            if (result.TryGetToken(out var token))
            {
                request.Headers.Add("Authorization", 
                    $"{CoreConstants.Headers.Bearer} {token.Value}");
            }
        }
    }
}
```

> **Important:**
> See the [`DefaultAccessTokenScopes` versus `AdditionalScopesToConsent`](#defaultaccesstokenscopes-versus-additionalscopestoconsent) section for an explanation on why the preceding code uses [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A) to add the scopes rather than [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A).

In the `Program` file, add the Graph client services and configuration with the `AddGraphClient` extension method. The following code defaults to the Version 1.0 Microsoft Graph base address and `User.Read` scopes if these settings aren't found in the app settings file:

```csharp
var baseUrl = string.Join("/",
    builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
        "https://graph.microsoft.com",
    builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
        "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

## Call Graph API from a component using the Graph SDK

The following `UserData` component uses an injected `GraphServiceClient` to obtain the user's ME-ID profile data and display their mobile phone number.

For any test user that you create in ME-ID, make sure that you give the user's ME-ID profile a mobile phone number in the Azure portal.

`UserData.razor`:

```razor
@page "/user-data"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.Graph
@attribute [Authorize]
@inject GraphServiceClient Client

<PageTitle>User Data</PageTitle>

<h1>Microsoft Graph User Data</h1>

@if (!string.IsNullOrEmpty(user?.MobilePhone))
{
    <p>Mobile Phone: @user.MobilePhone</p>
}

@code {
    private Microsoft.Graph.Models.User? user;

    protected override async Task OnInitializedAsync()
    {
        user = await Client.Me.GetAsync();
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-data">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Data
    </NavLink>
</div>
```

> **Tip:**
> To add users to an app, see the [Assign users to an app registration with or without app roles](#assign-users-to-an-app-registration-with-or-without-app-roles) section.

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#cookies-and-site-data](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23cookies-and-site-data).

## Customize user claims using the Graph SDK

In the following example, the app creates mobile phone number and office location claims for a user from their ME-ID user profile's data. The app must have the `User.Read` Graph API scope configured in ME-ID. Any test users for this scenario must have a mobile phone number and office location in their ME-ID profile, which can be added via the Azure portal.

In the following custom user account factory:

* An [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) (`logger`) is included for convenience in case you wish to log information or errors in the `CreateUserAsync` method.
* In the event that an [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) is thrown, the user is redirected to the identity provider to sign into their account. Additional or different actions can be taken when requesting an access token fails. For example, the app can log the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) and create a support ticket for further investigation.
* The framework's [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) represents the user's account. If the app requires a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap your custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

`CustomAccountFactory.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions.Authentication;

public class CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IServiceProvider serviceProvider, ILogger<CustomAccountFactory> logger,
        IConfiguration config) 
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger = logger;
    private readonly IServiceProvider serviceProvider = serviceProvider;
    private readonly string? baseUrl = string.Join("/",
        config.GetSection("MicrosoftGraph")["BaseUrl"] ?? 
            "https://graph.microsoft.com",
        config.GetSection("MicrosoftGraph")["Version"] ??
            "v1.0");

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null &&
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null && !string.IsNullOrEmpty(baseUrl))
            {
                try
                {
                    var client = new GraphServiceClient(
                        new HttpClient(),
                        serviceProvider
                            .GetRequiredService<IAuthenticationProvider>(),
                        baseUrl);

                    var user = await client.Me.GetAsync();

                    if (user is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            user.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            user.OfficeLocation ?? "Not set"));
                    }
                }
                catch (AccessTokenNotAvailableException exception)
                {
                    exception.Redirect();
                }
            }
        }

        return initialUser;
    }
}
```

Configure the MSAL authentication to use the custom user account factory.

Confirm that the `Program` file uses the [Microsoft.AspNetCore.Components.WebAssembly.Authentication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication) namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

The example in this section builds on the approach of reading the base URL with version and scopes from app configuration via the `MicrosoftGraph` section in `wwwroot/appsettings.json` file. The following lines should already be present in the `Program` file from following the guidance earlier in this article:

```csharp
var baseUrl = string.Join("/",
    builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
        "https://graph.microsoft.com",
    builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
        "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

In the `Program` file, find the call to the [Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%252A) extension method. Update the code to the following, which includes a call to [Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%252A) that adds an account claims principal factory with the `CustomAccountFactory`.

If the app uses a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap the custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

```csharp
builder.Services.AddMsalAuthentication<RemoteAuthenticationState,
    RemoteUserAccount>(options =>
    {
        builder.Configuration.Bind("AzureAd", 
            options.ProviderOptions.Authentication);
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, RemoteUserAccount,
        CustomAccountFactory>();
```

You can use the following `UserClaims` component to study the user's claims after the user authenticates with ME-ID:

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li>@claim.Type: @claim.Value</li>
        }
    </ul>
}
else
{
    <p>No claims found.</p>
}

@code {
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthenticationStateProvider
            .GetAuthenticationStateAsync();
        var user = authState.User;

        claims = user.Claims;
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-claims">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Claims
    </NavLink>
</div>
```

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#cookies-and-site-data](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23cookies-and-site-data).



**Applies to: graph-sdk-4**


*The following guidance applies to Microsoft Graph v4. If you're upgrading an app from SDK v4 to v5 or later, see the following resources:*

* *[Microsoft Graph .NET SDK v5 changelog and upgrade guide](https://github.com/microsoftgraph/msgraph-sdk-dotnet/blob/main/docs/upgrade-to-v5.md)*
* *[Microsoft Graph .NET SDK releases (`microsoftgraph/msgraph-sdk-dotnet` GitHub repository)](https://github.com/microsoftgraph/msgraph-sdk-dotnet/releases) (see the 6.0.0 breaking changes remarks)*

The Microsoft Graph SDK for use in Blazor apps is called the *Microsoft Graph .NET Client Library*.

**Applies to: \>= aspnetcore-8.0**

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).



**Applies to: < aspnetcore-8.0**

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app or the **Client** app of a hosted Blazor WebAssembly solution. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).



* [`Microsoft.AspNetCore.Components.WebAssembly.Authentication`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication)
* [`Microsoft.Authentication.WebAssembly.Msal`](https://www.nuget.org/packages/Microsoft.Authentication.WebAssembly.Msal)
* [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http)
* [`Microsoft.Graph`](https://www.nuget.org/packages/Microsoft.Graph)

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the Azure portal, grant delegated permissions (scopes)&dagger; for Microsoft Graph data that the app should be able to access on behalf of a user. For the example in this article, the app's registration should include delegated permission to read user data (`Microsoft.Graph` > `User.Read` scope in **API permissions**, Type: Delegated). The `User.Read` scope allows users to sign in to the app and allows the app to read the profile and company information of signed-in users. For more information, see [Overview of permissions and consent in the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/permissions-consent-overview) and [Overview of Microsoft Graph permissions](https://learn.microsoft.com/graph/permissions-overview).

&dagger;*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

After adding the Microsoft Graph API scopes to the app's registration in the Azure portal, add the following app settings configuration to the `wwwroot/appsettings.json` file in the app, which includes the Graph base URL with the Microsoft Graph version and scopes. In the following example, the `User.Read` scope is specified for the examples in later sections of this article. Scopes aren't case sensitive.

```json
"MicrosoftGraph": {
  "BaseUrl": "https://graph.microsoft.com",
  "Version": "{VERSION}",
  "Scopes": [
    "user.read"
  ]
}
```

In the preceding example, the `{VERSION}` placeholder is the version of the Microsoft Graph API (for example: `v1.0`).

The following is an example of a complete `wwwroot/appsettings.json` configuration file for an app that uses ME-ID as its identity provider, where reading user data (`user.read` scope) is specified for Microsoft Graph:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT ID}",
    "ValidateAuthority": true
  },
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com",
    "Version": "v1.0",
    "Scopes": [
      "user.read"
    ]
  }
}
```

In the preceding example, the `{TENANT ID}` placeholder is the Directory (tenant) ID, and the `{CLIENT ID}` placeholder is the Application (client) ID. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).

**Applies to: \>= aspnetcore-8.0**

Add the following `GraphClientExtensions` class to the standalone app. The scopes are provided to the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes) property of the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions) in the `AuthenticateRequestAsync` method. The [Microsoft.Graph.IHttpProvider.OverallTimeout](https://learn.microsoft.com/search/?terms=Microsoft.Graph.IHttpProvider.OverallTimeout) is extended from the default value of 100 seconds to 300 seconds to give the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) more time to receive a response from Microsoft Graph.



**Applies to: < aspnetcore-8.0**

Add the following `GraphClientExtensions` class to the standalone app or **Client** app of a hosted Blazor WebAssembly [solution](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23visual-studio-solution-file-sln). The scopes are provided to the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes) property of the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions) in the `AuthenticateRequestAsync` method. The [Microsoft.Graph.IHttpProvider.OverallTimeout](https://learn.microsoft.com/search/?terms=Microsoft.Graph.IHttpProvider.OverallTimeout) is extended from the default value of 100 seconds to 300 seconds to give the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) more time to receive a response from Microsoft Graph.



When an access token isn't obtained, the following code doesn't set a Bearer authorization header for Graph requests. 

`GraphClientExtensions.cs`:

```csharp
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Authentication.WebAssembly.Msal.Models;
using Microsoft.Graph;

namespace BlazorSample;

internal static class GraphClientExtensions
{
    public static IServiceCollection AddGraphClient(
        this IServiceCollection services, string? baseUrl, List<string>? scopes)
    {
        if (string.IsNullOrEmpty(baseUrl) || scopes?.Count == 0)
        {
            return services;
        }

        services.Configure<RemoteAuthenticationOptions<MsalProviderOptions>>(
            options =>
            {
                scopes?.ForEach((scope) =>
                {
                    options.ProviderOptions.DefaultAccessTokenScopes.Add(scope);
                });
            });

        services.AddScoped<IAuthenticationProvider, GraphAuthenticationProvider>();

        services.AddScoped<IHttpProvider, HttpClientHttpProvider>(sp =>
            new HttpClientHttpProvider(new HttpClient()));

        services.AddScoped(sp =>
        {
            return new GraphServiceClient(
                baseUrl,
                sp.GetRequiredService<IAuthenticationProvider>(),
                sp.GetRequiredService<IHttpProvider>());
        });

        return services;
    }

    private class GraphAuthenticationProvider(IAccessTokenProvider tokenProvider, 
        IConfiguration config) : IAuthenticationProvider
    {
        private readonly IConfiguration config = config;

        public IAccessTokenProvider TokenProvider { get; } = tokenProvider;

        public async Task AuthenticateRequestAsync(HttpRequestMessage request)
        {
            var result = await TokenProvider.RequestAccessToken(
                new AccessTokenRequestOptions()
                { 
                    Scopes = config.GetSection("MicrosoftGraph:Scopes").Get<string[]>()
                });

            if (result.TryGetToken(out var token))
            {
                request.Headers.Authorization ??= new AuthenticationHeaderValue(
                    "Bearer", token.Value);
            }
        }
    }

    private class HttpClientHttpProvider(HttpClient client) : IHttpProvider
    {
        private readonly HttpClient client = client;

        public ISerializer Serializer { get; } = new Serializer();

        public TimeSpan OverallTimeout { get; set; } = TimeSpan.FromSeconds(300);

        public Task<HttpResponseMessage> SendAsync(HttpRequestMessage request)
        {
            return client.SendAsync(request);
        }

        public Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
            HttpCompletionOption completionOption,
            CancellationToken cancellationToken)
        {
            return client.SendAsync(request, completionOption, cancellationToken);
        }

        public void Dispose()
        {
        }
    }
}
```

> **Important:**
> See the [`DefaultAccessTokenScopes` versus `AdditionalScopesToConsent`](#defaultaccesstokenscopes-versus-additionalscopestoconsent) section for an explanation on why the preceding code uses [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A) to add the scopes rather than [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A).

In the `Program` file, add the Graph client services and configuration with the `AddGraphClient` extension method:

```csharp
var baseUrl = string.Join("/",
    builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
        "https://graph.microsoft.com",
    builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
        "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

## Call Graph API from a component using the Graph SDK

The following `UserData` component uses an injected `GraphServiceClient` to obtain the user's ME-ID profile data and display their mobile phone number. For any test user that you create in ME-ID, make sure that you give the user's ME-ID profile a mobile phone number in the Azure portal.

`UserData.razor`:

```razor
@page "/user-data"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.Graph
@attribute [Authorize]
@inject GraphServiceClient Client

<PageTitle>User Data</PageTitle>

<h1>Microsoft Graph User Data</h1>

@if (!string.IsNullOrEmpty(user?.MobilePhone))
{
    <p>Mobile Phone: @user.MobilePhone</p>
}

@code {
    private Microsoft.Graph.User? user;

    protected override async Task OnInitializedAsync()
    {
        var request = Client.Me.Request();
        user = await request.GetAsync();
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-data">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Data
    </NavLink>
</div>
```

> **Tip:**
> To add users to an app, see the [Assign users to an app registration with or without app roles](#assign-users-to-an-app-registration-with-or-without-app-roles) section.

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#cookies-and-site-data](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23cookies-and-site-data).

## Customize user claims using the Graph SDK

In the following example, the app creates mobile phone number and office location claims for a user from their ME-ID user profile's data. The app must have the `User.Read` Graph API scope configured in ME-ID. Any test users for this scenario must have a mobile phone number and office location in their ME-ID profile, which can be added via the Azure portal.

In the following custom user account factory:

* An [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) (`logger`) is included for convenience in case you wish to log information or errors in the `CreateUserAsync` method.
* In the event that an [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) is thrown, the user is redirected to the identity provider to sign into their account. Additional or different actions can be taken when requesting an access token fails. For example, the app can log the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) and create a support ticket for further investigation.
* The framework's [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) represents the user's account. If the app requires a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap your custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

`CustomAccountFactory.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;
using Microsoft.Graph;

public class CustomAccountFactory(IAccessTokenProviderAccessor accessor, 
        IServiceProvider serviceProvider, ILogger<CustomAccountFactory> logger)
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger = logger;
    private readonly IServiceProvider serviceProvider = serviceProvider;

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null && 
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null)
            {
                try
                {
                    var client = ActivatorUtilities
                        .CreateInstance<GraphServiceClient>(serviceProvider);
                    var request = client.Me.Request();
                    var user = await request.GetAsync();

                    if (user is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            user.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            user.OfficeLocation ?? "Not set"));
                    }
                }
                catch (AccessTokenNotAvailableException exception)
                {
                    exception.Redirect();
                }
            }
        }

        return initialUser;
    }
}
```

Configure the MSAL authentication to use the custom user account factory.

Confirm that the `Program` file uses the [Microsoft.AspNetCore.Components.WebAssembly.Authentication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication) namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

The example in this section builds on the approach of reading the base URL with version and scopes from app configuration via the `MicrosoftGraph` section in `wwwroot/appsettings.json` file. The following lines should already be present in the `Program` file from following the guidance earlier in this article:

```csharp
var baseUrl = string.Join("/",
    builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
        "https://graph.microsoft.com",
    builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
        "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

In the `Program` file, find the call to the [Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%252A) extension method. Update the code to the following, which includes a call to [Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%252A) that adds an account claims principal factory with the `CustomAccountFactory`.

If the app uses a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap the custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

```csharp
builder.Services.AddMsalAuthentication<RemoteAuthenticationState,
    RemoteUserAccount>(options =>
    {
        builder.Configuration.Bind("AzureAd", 
            options.ProviderOptions.Authentication);
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, RemoteUserAccount,
        CustomAccountFactory>();
```

You can use the following `UserClaims` component to study the user's claims after the user authenticates with ME-ID:

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li>@claim.Type: @claim.Value</li>
        }
    </ul>
}
else
{
    <p>No claims found.</p>
}

@code {
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthenticationStateProvider
            .GetAuthenticationStateAsync();
        var user = authState.User;

        claims = user.Claims;
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-claims">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Claims
    </NavLink>
</div>
```

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#cookies-and-site-data](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23cookies-and-site-data).



**Applies to: named-client-graph-api**


The following examples use a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for Graph API calls to obtain a user's mobile phone number to process a call or to customize a user's claims to include a mobile phone number claim and an office location claim.

**Applies to: \>= aspnetcore-8.0**

The examples require a package reference for [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http) for the standalone Blazor WebAssembly app.



**Applies to: < aspnetcore-8.0**

The examples require a package reference for [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http) for the standalone Blazor WebAssembly app or the **Client** app of a hosted Blazor WebAssembly solution.



> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the Azure portal, grant delegated permissions (scopes)&dagger; for Microsoft Graph data that the app should be able to access on behalf of a user. For the example in this article, the app's registration should include delegated permission to read user data (`Microsoft.Graph` > `User.Read` scope in **API permissions**, Type: Delegated). The `User.Read` scope allows users to sign in to the app and allows the app to read the profile and company information of signed-in users. For more information, see [Overview of permissions and consent in the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/permissions-consent-overview) and [Overview of Microsoft Graph permissions](https://learn.microsoft.com/graph/permissions-overview).

&dagger;*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

After adding the Microsoft Graph API scopes to the app's registration in the Azure portal, add the following app settings configuration to the `wwwroot/appsettings.json` file in the app, which includes the Graph base URL with the Microsoft Graph version and scopes. In the following example, the `User.Read` scope is specified for the examples in later sections of this article. Scopes aren't case sensitive.

```json
"MicrosoftGraph": {
  "BaseUrl": "https://graph.microsoft.com",
  "Version": "{VERSION}",
  "Scopes": [
    "user.read"
  ]
}
```

In the preceding example, the `{VERSION}` placeholder is the version of the Microsoft Graph API (for example: `v1.0`).

The following is an example of a complete `wwwroot/appsettings.json` configuration file for an app that uses ME-ID as its identity provider, where reading user data (`user.read` scope) is specified for Microsoft Graph:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT ID}",
    "ValidateAuthority": true
  },
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com",
    "Version": "v1.0",
    "Scopes": [
      "user.read"
    ]
  }
}
```

In the preceding example, the `{TENANT ID}` placeholder is the Directory (tenant) ID, and the `{CLIENT ID}` placeholder is the Application (client) ID. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id](standalone-with-microsoft-entra-id.md).

Create the following `GraphAuthorizationMessageHandler` class and project configuration in the `Program` file for working with Graph API. The base URL and scopes are provided to the handler from configuration.

`GraphAuthorizationMessageHandler.cs`:

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

namespace BlazorSample;

public class GraphAuthorizationMessageHandler : AuthorizationMessageHandler
{
    public GraphAuthorizationMessageHandler(IAccessTokenProvider provider,
        NavigationManager navigation, IConfiguration config)
        : base(provider, navigation)
    {
        ConfigureHandler(
            authorizedUrls: [ 
                string.Join("/",
                    config.GetSection("MicrosoftGraph")["BaseUrl"] ??
                        "https://graph.microsoft.com",
                    config.GetSection("MicrosoftGraph")["Version"] ??
                        "v1.0")
            ],
            scopes: config.GetSection("MicrosoftGraph:Scopes")
                        .Get<List<string>>() ?? [ "user.read" ]);
    }
}
```

The trailing slash (`/`) of the authorized URL is required. The preceding code builds the following authorized URL from app settings configuration or defaults to the following authorized URL if the app settings configuration is missing: `https://graph.microsoft.com/v1.0/`.

In the `Program` file, configure the named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for Graph API:

```csharp
builder.Services.AddTransient<GraphAuthorizationMessageHandler>();

builder.Services.AddHttpClient("GraphAPI",
        client => client.BaseAddress = new Uri(
            string.Join("/",
                builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
                    "https://graph.microsoft.com",
                builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
                    "v1.0",
                string.Empty)))
    .AddHttpMessageHandler<GraphAuthorizationMessageHandler>();
```

In the preceding example, the `GraphAuthorizationMessageHandler` [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) is registered as a transient service for [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%252A). Transient registration is recommended for [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory), which manages its own DI scopes. For more information, see the following resources:

* [Utility base component classes to manage a DI scope](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [Detect client-side transient disposables](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fdependency-injection%23detect-client-side-transient-disposables)
* [`DelegatingHandler` instances](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23outgoing-request-middleware)

A trailing slash (`/`) on the base address is required. In the preceding code, the third argument to `string.Join` is `string.Empty` to ensure the trailing slash is present: `https://graph.microsoft.com/v1.0/`.

## Call Graph API from a component using a named `HttpClient`

The `UserInfo.cs` class designates the required user profile properties with the [System.Text.Json.Serialization.JsonPropertyNameAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute and the JSON name used by ME-ID. The following example sets up properties for the user's mobile phone number and office location.

`UserInfo.cs`:

```csharp
using System.Text.Json.Serialization;

namespace BlazorSample;

public class UserInfo
{
    [JsonPropertyName("mobilePhone")]
    public string? MobilePhone { get; set; }

    [JsonPropertyName("officeLocation")]
    public string? OfficeLocation { get; set; }
}
```

In the following `UserData` component, an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is created for Graph API to issue a request for the user's profile data. The `me` resource (`me`) are added to the base URL with version for the Graph API request. JSON data returned by Graph is deserialized into the `UserInfo` class properties. In the following example, the mobile phone number is obtained. You can add similar code to include the user's ME-ID profile office location if you wish (`userInfo.OfficeLocation`). If the access token request fails, the user is redirected to sign into the app for a new access token.

`UserData.razor`:

```razor
@page "/user-data"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@attribute [Authorize]
@inject IConfiguration Config
@inject IHttpClientFactory ClientFactory

<PageTitle>User Data</PageTitle>

<h1>Microsoft Graph User Data</h1>

@if (!string.IsNullOrEmpty(userInfo?.MobilePhone))
{
    <p>Mobile Phone: @userInfo.MobilePhone</p>
}

@code {
    private UserInfo? userInfo;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            var client = ClientFactory.CreateClient("GraphAPI");

            userInfo = await client.GetFromJsonAsync<UserInfo>("me");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-data">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Data
    </NavLink>
</div>
```

> **Tip:**
> To add users to an app, see the [Assign users to an app registration with or without app roles](#assign-users-to-an-app-registration-with-or-without-app-roles) section.

The following sequence describes the new user flow for Graph API scopes:

1. The new user signs into the app for the first time.
1. The user consents to using the app in the Azure consent UI.
1. The user accesses a component page that requests Graph API data for the first time.
1. The user is redirected to the Azure consent UI to consent to Graph API scopes.
1. Graph API user data is returned.

If you prefer that scope provisioning (consent for Graph API scopes) take place on the initial sign in, supply the scopes to MSAL authentication as default access token scopes in the `Program` file:

```diff
+ var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
+     .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);

+   foreach (var scope in scopes)
+   {
+       options.ProviderOptions.DefaultAccessTokenScopes.Add(scope);
+   }
});
```

> **Important:**
> See the [`DefaultAccessTokenScopes` versus `AdditionalScopesToConsent`](#defaultaccesstokenscopes-versus-additionalscopestoconsent) section for an explanation on why the preceding code uses [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A) to add the scopes rather than [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A).

When the preceding changes are made to the app, the user flow adopts the following sequence:

1. The new user signs into the app for the first time.
1. The user consents to using the app and Graph API scopes in the Azure consent UI.
1. The user accesses a component page that requests Graph API data for the first time.
1. Graph API user data is returned.

When testing with the Graph API locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with testing. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#troubleshoot](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23troubleshoot).

## Customize user claims using a named `HttpClient`

In the following example, the app creates mobile phone number and office location claims for the user from their ME-ID user profile's data. The app must have the `User.Read` Graph API scope configured in ME-ID. Test user accounts in ME-ID require an entry for the mobile phone number and office location, which can be added via the Azure portal to their user profiles.

If you haven't already added the `UserInfo` class to the app by following the guidance earlier in this article, add the following class and designate the required user profile properties with the [System.Text.Json.Serialization.JsonPropertyNameAttribute](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute and the JSON name used by ME-ID. The following example sets up properties for the user's mobile phone number and office location.

`UserInfo.cs`:

```csharp
using System.Text.Json.Serialization;

namespace BlazorSample;

public class UserInfo
{
    [JsonPropertyName("mobilePhone")]
    public string? MobilePhone { get; set; }

    [JsonPropertyName("officeLocation")]
    public string? OfficeLocation { get; set; }
}
```

In the following custom user account factory:

* An [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) (`logger`) is included for convenience in case you wish to log information or errors in the `CreateUserAsync` method.
* In the event that an [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) is thrown, the user is redirected to the identity provider to sign into their account. Additional or different actions can be taken when requesting an access token fails. For example, the app can log the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException) and create a support ticket for further investigation.
* The framework's [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) represents the user's account. If the app requires a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap the custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

`CustomAccountFactory.cs`:

```csharp
using System.Net.Http.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;

public class CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IHttpClientFactory clientFactory,
        ILogger<CustomAccountFactory> logger)
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger = logger;
    private readonly IHttpClientFactory clientFactory = clientFactory;

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null && 
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null)
            {
                try
                {
                    var client = clientFactory.CreateClient("GraphAPI");

                    var userInfo = await client.GetFromJsonAsync<UserInfo>("me");

                    if (userInfo is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            userInfo.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            userInfo.OfficeLocation ?? "Not set"));
                    }
                }
                catch (AccessTokenNotAvailableException exception)
                {
                    exception.Redirect();
                }
            }
        }

        return initialUser;
    }
}
```

The MSAL authentication is configured to use the custom user account factory. Start by confirming that the `Program` file uses the [Microsoft.AspNetCore.Components.WebAssembly.Authentication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication) namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

In the `Program` file, find the call to the [Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication%252A) extension method. Update the code to the following, which includes a call to [Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory%252A) that adds an account claims principal factory with the `CustomAccountFactory`.

If the app uses a custom user account class that extends [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount), swap your app's custom user account class for [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount) in the following code.

```csharp
builder.Services.AddMsalAuthentication<RemoteAuthenticationState, 
    RemoteUserAccount>(options =>
    {
        builder.Configuration.Bind("AzureAd", 
            options.ProviderOptions.Authentication);
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, RemoteUserAccount, 
        CustomAccountFactory>();
```

The preceding example is for an app that uses ME-ID authentication with MSAL. Similar patterns exist for OIDC and API authentication. For more information, see the examples in the [Customize the user with a payload claim](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23customize-the-user-with-a-payload-claim) section of the [blazor/security/webassembly/additional-scenarios](additional-scenarios.md) article.

You can use the following `UserClaims` component to study the user's claims after the user authenticates with ME-ID:

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li>@claim.Type: @claim.Value</li>
        }
    </ul>
}
else
{
    <p>No claims found.</p>
}

@code {
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthenticationStateProvider
            .GetAuthenticationStateAsync();
        var user = authState.User;

        claims = user.Claims;
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-claims">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Claims
    </NavLink>
</div>
```

When testing with the Graph API locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with testing. For more information, see [blazor/security/webassembly/standalone-with-microsoft-entra-id#troubleshoot](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fstandalone-with-microsoft-entra-id%23troubleshoot).



## Assign users to an app registration with or without app roles

You can add users to an app registration and assign roles to users with the following steps in the Azure portal.

To add a user, select **Users** from the ME-ID area of the Azure portal:

1. Select **New user** > **Create new user**.
1. Use the **Create user** template.
1. Supply the user's information in the **Identity** area.
1. You can generate an initial password or assign an initial password that the user changes when they sign in for the first time. If you use the password generated by the portal, make a note of it now.
1. Select **Create** to create the user. When **Create new user** interface closes, select **Refresh** to update the user list and show the new user.
1. For the examples in this article, assign a mobile phone number to the new user by selecting their name from the users list, selecting **Properties**, and editing the contact information to provide a mobile phone number.

To assign users to the app *without app roles*:

1. In the ME-ID area of the Azure portal, open **Enterprise applications**.
1. Select the app from the list.
1. Select **Users and groups**.
1. Select **Add user/group**.
1. Select a user.
1. Select the **Assign** button.

To assign users to the app *with app roles*:

1. Add roles to the app's registration in the Azure portal following the guidance in [blazor/security/webassembly/meid-groups-roles#app-roles](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fmeid-groups-roles%23app-roles).
1. In the ME-ID area of the Azure portal, open **Enterprise applications**.
1. Select the app from the list.
1. Select **Users and groups**.
1. Select **Add user/group**.
1. Select a user and select their role for accessing the app. Multiple roles are assigned to a user by repeating the process of adding the user to the app until all of the roles for a user are assigned. Users with multiple roles are listed once for each assigned role in the **Users and groups** list of users for the app.
1. Select the **Assign** button.

## `DefaultAccessTokenScopes` versus `AdditionalScopesToConsent`

The examples in this article provision Graph API scopes with [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A), not [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A). 

[Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A) isn't used because it's unable to provision Graph API scopes for users when they sign in to the app for the first time with MSAL via the Azure consent UI. When the user attempts to access Graph API for the first time with the Graph SDK, they're confronted with an exception:

> Microsoft.Graph.Models.ODataErrors.ODataError: Access token is empty.

After a user provisions Graph API scopes provided via [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A), the app can use [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A) for a subsequent user sign in. However, changing app code makes no sense for a production app that requires the periodic addition of new users with delegated Graph scopes or adding new delegated Graph API scopes to the app.

The preceding discussion of how to provision scopes for Graph API access when the user first signs into the app only applies to:

* Apps that adopt the Graph SDK.
* Apps that use a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for Graph API access that asks users to consent to Graph scopes on their first sign in to the app.

When using a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) that doesn't ask users to consent to Graph scopes on their first sign in, users are redirected to the Azure consent UI for Graph API scopes consent *when they first request access to Graph API* via the [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) of the preconfigured, named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient). When Graph scopes aren't consented initially with the named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) approach, neither [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes%252A) nor [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%2A](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent%252A) are called by the app. For more information, see the [named `HttpClient` coverage in this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/security/webassembly/graph-api.md?pivots=named-client-graph-api).

**Applies to: < aspnetcore-8.0**

## Hosted Blazor WebAssembly solutions

The examples in this article pertain to using the Graph SDK or a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) with Graph API directly from a standalone Blazor WebAssembly app or directly from the **Client** app of a hosted Blazor WebAssembly [solution](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23visual-studio-solution-file-sln). An additional scenario that isn't covered by this article is for a **Client** app of a hosted solution to call the **Server** app of the solution via web API, and then the **Server** app uses the Graph SDK/API to call Microsoft Graph and return data to the **Client** app. Although this is a supported approach, it isn't covered by this article. If you wish to adopt this approach:

* Follow the guidance in [blazor/call-web-api](../../call-web-api.md) for the web API aspects on issuing requests to the **Server** app from the **Client** app and returning data to the **Client** app.
* Follow the guidance in the primary [Microsoft Graph documentation](https://learn.microsoft.com/graph/) to use the Graph SDK with a typical ASP.NET Core app, which in this scenario is the **Server** app of the solution. If you use the Blazor WebAssembly project template to the create the hosted Blazor WebAssembly solution (**ASP.NET Core Hosted**/`-h|--hosted`) with organizational authorization (single organization/`SingleOrg` or multiple organization/`MultiOrg`) and the Microsoft Graph option (**Microsoft identity platform** > **Connected Services** > **Add Microsoft Graph permissions** in Visual Studio or the `--calls-graph` option with the .NET CLI `dotnet new` command), the **Server** app of the solution is configured to use the Graph SDK when the solution is created from the project template.



## Additional resources

### General guidance

**Applies to: \>= aspnetcore-8.0**

* [Microsoft Graph documentation](https://learn.microsoft.com/graph/)
* [Microsoft Graph sample Blazor WebAssembly app](https://github.com/microsoftgraph/msgraph-sample-blazor-clientside): This sample demonstrates how to use the Microsoft Graph .NET SDK to access data in Office 365 from Blazor WebAssembly apps.
* [Build .NET apps with Microsoft Graph tutorial](https://learn.microsoft.com/graph/tutorials/dotnet?tabs=aad) and [Microsoft Graph sample ASP.NET Core app](https://github.com/microsoftgraph/msgraph-sample-aspnet-core/tree/main/): Although these resources don't directly apply to calling Graph from *client-side* Blazor WebAssembly apps, the ME-ID app configuration and Microsoft Graph coding practices in the linked resources are relevant for standalone Blazor WebAssembly apps and should be consulted for general best practices.



**Applies to: < aspnetcore-8.0**

* [Microsoft Graph documentation](https://learn.microsoft.com/graph/)
* [Microsoft Graph sample Blazor WebAssembly app](https://github.com/microsoftgraph/msgraph-sample-blazor-clientside): This sample demonstrates how to use the Microsoft Graph .NET SDK to access data in Office 365 from Blazor WebAssembly apps.
* [Build .NET apps with Microsoft Graph tutorial](https://learn.microsoft.com/graph/tutorials/dotnet?tabs=aad) and [Microsoft Graph sample ASP.NET Core app](https://github.com/microsoftgraph/msgraph-sample-aspnet-core/tree/main/): These resources are most appropriate for ***hosted*** Blazor WebAssembly solutions, where the **Server** app is configured to access Microsoft Graph as a typical ASP.NET Core app on behalf of the **Client** app. The **Client** app uses web API to make requests to the **Server** app for Graph data. Although these resources don't directly apply to calling Graph from *client-side* Blazor WebAssembly apps, the ME-ID app configuration and Microsoft Graph coding practices in the linked resources are relevant for standalone Blazor WebAssembly apps and should be consulted for general best practices.



### Security guidance

* [Microsoft Graph auth overview](https://learn.microsoft.com/graph/auth/)
* [Overview of Microsoft Graph permissions](https://learn.microsoft.com/graph/permissions-overview)
* [Microsoft Graph permissions reference](https://learn.microsoft.com/graph/permissions-reference)
* [Overview of permissions and consent in the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/permissions-consent-overview)
* [Enhance security with the principle of least privilege](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
* [Azure privilege escalation articles on the Internet (Google search result)](https://www.google.com/search?q=%22Azure+Privilege+Escalation%22)
* [Microsoft Security Best Practices: Securing privileged access](https://learn.microsoft.com/security/privileged-access-workstations/overview)
