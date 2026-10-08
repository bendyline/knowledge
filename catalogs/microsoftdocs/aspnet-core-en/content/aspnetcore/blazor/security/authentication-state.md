---
title: ASP.NET Core Blazor authentication state
author: guardrex
description: Learn how to create a custom authentication state provider and receive notifications of user authentication state changes.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/security/authentication-state
zone_pivot_groups: blazor-app-models
---
# ASP.NET Core Blazor authentication state

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


This article explains how to create a custom [authentication state provider](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authenticationstateprovider-service) and receive user authentication state change notifications in code.

The general approaches taken for server-side and client-side Blazor apps are similar but differ in their exact implementations, so this article pivots between server-side Blazor apps and client-side Blazor apps. Use the pivot selector at the top of the article to change the article's pivot to match the type of Blazor project that you're working with:

* Server-side Blazor apps (**Server** pivot): Blazor Server for .NET 7 or earlier and the server project of a Blazor Web App for .NET 8 or later.
* Client-side Blazor apps (**Blazor WebAssembly** pivot): Blazor WebAssembly for all versions of .NET or the `.Client` project of a Blazor Web App for .NET 8 or later.

## Abstract `AuthenticationStateProvider` class

The Blazor framework includes an abstract [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) class to provide information about the authentication state of the current user with the following members:

* [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.GetAuthenticationStateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.GetAuthenticationStateAsync%252A): Asynchronously gets the authentication state of the current user.
* [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.AuthenticationStateChanged](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.AuthenticationStateChanged): An event that provides notification when the authentication state has changed. For example, this event may be raised if a user signs in or out of the app.
* [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%252A): Raises an authentication state changed event.

## Implement a custom `AuthenticationStateProvider`

The app must reference the [`Microsoft.AspNetCore.Components.Authorization` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.Authorization), which provides authentication and authorization support for Blazor apps.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


**Applies to: server**


**Applies to: \>= aspnetcore-8.0**

Configure the following authentication, authorization, and cascading authentication state services in the `Program` file.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app is preconfigured with the following service registrations, which includes exposing the authentication state as a cascading parameter. For more information, see [blazor/security/index#expose-the-authentication-state-as-a-cascading-parameter](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23expose-the-authentication-state-as-a-cascading-parameter) with additional information presented in the article's [Customize unauthorized content with the `Router` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23customize-unauthorized-content-with-the-router-component) section.

```csharp
using Microsoft.AspNetCore.Components.Authorization;

...

builder.Services.AddAuthorization();
builder.Services.AddCascadingAuthenticationState();
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Configure authentication and authorization services in the `Program` file.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the following service registration.

```csharp
using Microsoft.AspNetCore.Components.Authorization;

...

builder.Services.AddAuthorization();
```



**Applies to: < aspnetcore-6.0**

Configure authentication and authorization services in `Startup.ConfigureServices` of `Startup.cs`.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the following service registration.

```csharp
using Microsoft.AspNetCore.Components.Authorization;

...

services.AddAuthorization();
```





**Applies to: webassembly**


In Blazor WebAssembly apps (all .NET versions) or the `.Client` project of a Blazor Web App (.NET 8 or later), configure authentication, authorization, and cascading authentication state services in the `Program` file.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app is preconfigured with the following service registrations, which includes exposing the authentication state as a cascading parameter. For more information, see [blazor/security/index#expose-the-authentication-state-as-a-cascading-parameter](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23expose-the-authentication-state-as-a-cascading-parameter) with additional information presented in the article's [Customize unauthorized content with the `Router` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23customize-unauthorized-content-with-the-router-component) section.

**Applies to: \>= aspnetcore-8.0**

```csharp
using Microsoft.AspNetCore.Components.Authorization;

...

builder.Services.AddAuthorizationCore();
builder.Services.AddCascadingAuthenticationState();
```



**Applies to: < aspnetcore-8.0**

Configure authentication and authorization services in the `Program` file.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the following service registration.

```csharp
using Microsoft.AspNetCore.Components.Authorization;

...

builder.Services.AddAuthorizationCore();
```





Subclass [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) and override [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.GetAuthenticationStateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.GetAuthenticationStateAsync%252A) to create the user's authentication state. In the following example, all users are authenticated with the username `mrfibuli`. 

`CustomAuthStateProvider.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;

public class CustomAuthStateProvider : AuthenticationStateProvider
{
    public override Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        var identity = new ClaimsIdentity(
        [
            new Claim(ClaimTypes.Name, "mrfibuli"),
        ], "Custom Authentication");

        var user = new ClaimsPrincipal(identity);

        return Task.FromResult(new AuthenticationState(user));
    }
}
```

> **Note:**
> The preceding code that creates a new [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) uses simplified collection initialization introduced with C# 12 (.NET 8). For more information, see [Collection expressions - C# language reference](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions).

**Applies to: server**


**Applies to: \>= aspnetcore-8.0**

The `CustomAuthStateProvider` service is registered in the `Program` file. Register the service *scoped* with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%252A):

```csharp
builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthStateProvider>();
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

In a Blazor Server app, register the service *scoped* with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%252A) ***after*** the call to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A):

```csharp
builder.Services.AddServerSideBlazor();

builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthStateProvider>();
```



**Applies to: < aspnetcore-6.0**

In a Blazor Server app, register the service *scoped* with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%252A) ***after*** the call to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A):

```csharp
services.AddServerSideBlazor();

services.AddScoped<AuthenticationStateProvider, CustomAuthStateProvider>();
```





**Applies to: webassembly**


The `CustomAuthStateProvider` service is registered in the `Program` file. Register the service *singleton* with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%252A):

```csharp
builder.Services.AddSingleton<AuthenticationStateProvider, CustomAuthStateProvider>();
```



If it isn't present, add an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) statement to the imports file (`_Imports.razor`) to make the [Microsoft.AspNetCore.Components.Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization) namespace available across components:

```razor
@using Microsoft.AspNetCore.Components.Authorization;
```

**Applies to: \>= aspnetcore-8.0**

Confirm or change the route view component to an [Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView) in the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component definition. The location of the `Router` component differs depending on the type of app. Use search to locate the component if you're unaware of its location in the project.

```razor
<Router ...>
    <Found ...>
        <AuthorizeRouteView RouteData="routeData" 
            DefaultLayout="typeof(Layout.MainLayout)" />
        ...
    </Found>
</Router>
```

> **Note:**
> When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the [Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView) component. For more information, see [blazor/security/index#expose-the-authentication-state-as-a-cascading-parameter](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23expose-the-authentication-state-as-a-cascading-parameter) with additional information presented in the article's [Customize unauthorized content with the `Router` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23customize-unauthorized-content-with-the-router-component) section.



**Applies to: < aspnetcore-8.0**

Where the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component is located:

* Confirm or change the route view component to an [Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView).
* Confirm or add a [Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState) component around the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component.

The location of the `Router` component differs depending on the type of app. Use search to locate the component if you're unaware of its location in the project.

```razor
<CascadingAuthenticationState>
    <Router ...>
        <Found ...>
            <AuthorizeRouteView RouteData="routeData" 
                DefaultLayout="typeof(MainLayout)" />
            ...
        </Found>
    </Router>
</CascadingAuthenticationState>
```

> **Note:**
> When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the [Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView) and [Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState) components. For more information, see [blazor/security/index#expose-the-authentication-state-as-a-cascading-parameter](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23expose-the-authentication-state-as-a-cascading-parameter) with additional information presented in the article's [Customize unauthorized content with the `Router` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23customize-unauthorized-content-with-the-router-component) section.



The following example [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component demonstrates the authenticated user's name:

```razor
<AuthorizeView>
    <Authorized>
        <p>Hello, @context.User.Identity?.Name!</p>
    </Authorized>
    <NotAuthorized>
        <p>You're not authorized.</p>
    </NotAuthorized>
</AuthorizeView>
```

For guidance on the use of [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView), see [blazor/security/index#authorizeview-component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component).

## Authentication state change notifications

A [custom `AuthenticationStateProvider`](#implement-a-custom-authenticationstateprovider) can invoke [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%252A) on the [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) base class to notify consumers of the authentication state change to rerender.

The following example is based on implementing a custom [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) by following the guidance in the [Implement a custom `AuthenticationStateProvider`](#implement-a-custom-authenticationstateprovider) section earlier in this article. If you already followed the guidance in that section, the following `CustomAuthStateProvider` replaces the one shown in the section.

The following `CustomAuthStateProvider` implementation exposes a custom method, `AuthenticateUser`, to sign in a user and notify consumers of the authentication state change.

`CustomAuthStateProvider.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;

public class CustomAuthStateProvider : AuthenticationStateProvider
{
    public override Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        var identity = new ClaimsIdentity();
        var user = new ClaimsPrincipal(identity);

        return Task.FromResult(new AuthenticationState(user));
    }

    public void AuthenticateUser(string userIdentifier)
    {
        var identity = new ClaimsIdentity(
        [
            new Claim(ClaimTypes.Name, userIdentifier),
        ], "Custom Authentication");

        var user = new ClaimsPrincipal(identity);

        NotifyAuthenticationStateChanged(
            Task.FromResult(new AuthenticationState(user)));
    }
}
```

> **Note:**
> The preceding code that creates a new [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) uses simplified collection initialization introduced with C# 12 (.NET 8). For more information, see [Collection expressions - C# language reference](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions).

In a component:

* Inject [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider).
* Add a field to hold the user's identifier.
* Add a button and a method to cast the [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) to `CustomAuthStateProvider` and call `AuthenticateUser` with the user's identifier.

```razor
@inject AuthenticationStateProvider AuthenticationStateProvider

<input @bind="userIdentifier" />
<button @onclick="SignIn">Sign in</button>

<AuthorizeView>
    <Authorized>
        <p>Hello, @context.User.Identity?.Name!</p>
    </Authorized>
    <NotAuthorized>
        <p>You're not authorized.</p>
    </NotAuthorized>
</AuthorizeView>

@code {
    public string userIdentifier = string.Empty;

    private void SignIn()
    {
        ((CustomAuthStateProvider)AuthenticationStateProvider)
            .AuthenticateUser(userIdentifier);
    }
}
```

The preceding approach can be enhanced to trigger notifications of authentication state changes via a custom service. The following `CustomAuthenticationService` class maintains the current user's claims principal in a backing field (`currentUser`) with an event (`UserChanged`) that the authentication state provider can subscribe to, where the event invokes [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%252A). With the additional configuration later in this section, the `CustomAuthenticationService` can be injected into a component with logic that sets the `CurrentUser` to trigger the `UserChanged` event.

`CustomAuthenticationService.cs`:

```csharp
using System.Security.Claims;

public class CustomAuthenticationService
{
    public event Action<ClaimsPrincipal>? UserChanged;
    private ClaimsPrincipal? currentUser;

    public ClaimsPrincipal CurrentUser
    {
        get { return currentUser ?? new(); }
        set
        {
            currentUser = value;

            if (UserChanged is not null)
            {
                UserChanged(currentUser);
            }
        }
    }
}
```

**Applies to: server**


**Applies to: \>= aspnetcore-6.0**

In the `Program` file, register the `CustomAuthenticationService` in the dependency injection container:

```csharp
builder.Services.AddScoped<CustomAuthenticationService>();
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices` of `Startup.cs`, register the `CustomAuthenticationService` in the dependency injection container:

```csharp
services.AddScoped<CustomAuthenticationService>();
```





**Applies to: webassembly**


In the `Program` file, register the `CustomAuthenticationService` in the dependency injection container:

```csharp
builder.Services.AddSingleton<CustomAuthenticationService>();
```



The following `CustomAuthStateProvider` subscribes to the `CustomAuthenticationService.UserChanged` event. The `GetAuthenticationStateAsync` method returns the user's authentication state. Initially, the authentication state is based on the value of the `CustomAuthenticationService.CurrentUser`. When the user changes, a new authentication state is created for the new user (`new AuthenticationState(newUser)`) for calls to `GetAuthenticationStateAsync`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;

public class CustomAuthStateProvider : AuthenticationStateProvider
{
    private AuthenticationState authenticationState;

    public CustomAuthStateProvider(CustomAuthenticationService service)
    {
        authenticationState = new AuthenticationState(service.CurrentUser);

        service.UserChanged += (newUser) =>
        {
            authenticationState = new AuthenticationState(newUser);
            NotifyAuthenticationStateChanged(Task.FromResult(authenticationState));
        };
    }

    public override Task<AuthenticationState> GetAuthenticationStateAsync() =>
        Task.FromResult(authenticationState);
}
```

The following component's `SignIn` method creates a claims principal for the user's identifier to set on `CustomAuthenticationService.CurrentUser`:

```razor
@using System.Security.Claims
@inject CustomAuthenticationService AuthService

<input @bind="userIdentifier" />
<button @onclick="SignIn">Sign in</button>

<AuthorizeView>
    <Authorized>
        <p>Hello, @context.User.Identity?.Name!</p>
    </Authorized>
    <NotAuthorized>
        <p>You're not authorized.</p>
    </NotAuthorized>
</AuthorizeView>

@code {
    public string userIdentifier = string.Empty;

    private void SignIn()
    {
        var currentUser = AuthService.CurrentUser;

        var identity = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Name, userIdentifier),
            ],
            "Custom Authentication");

        var newUser = new ClaimsPrincipal(identity);

        AuthService.CurrentUser = newUser;
    }
}
```

> **Note:**
> The preceding code that creates a new [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) uses simplified collection initialization introduced with C# 12 (.NET 8). For more information, see [Collection expressions - C# language reference](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions).

## Additional resources

**Applies to: \>= aspnetcore-8.0**

* [Server-side unauthorized content display while prerendering with a custom `AuthenticationStateProvider`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23unauthorized-content-display-while-prerendering-with-a-custom-authenticationstateprovider)
* [How to access an `AuthenticationStateProvider` from a `DelegatingHandler` set up using an `IHttpClientFactory`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware)
* [blazor/security/blazor-web-app-oidc](blazor-web-app-with-oidc.md)
* [blazor/security/webassembly/standalone-with-identity/index](webassembly/standalone-with-identity/index.md)



**Applies to: < aspnetcore-8.0**

* [Server-side unauthorized content display while prerendering with a custom `AuthenticationStateProvider`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23unauthorized-content-display-while-prerendering-with-a-custom-authenticationstateprovider)
* [How to access an `AuthenticationStateProvider` from a `DelegatingHandler` set up using an `IHttpClientFactory`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware)
* [blazor/security/blazor-web-app-oidc](blazor-web-app-with-oidc.md)
* [blazor/security/webassembly/standalone-with-identity/index](webassembly/standalone-with-identity/index.md)
[Prerendering with authentication in hosted Blazor WebAssembly apps](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23prerendering-with-authentication)
