---
title: Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server
author: guardrex
description: Learn how to secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server.
monikerRange: '>= aspnetcore-3.1 < aspnetcore-8.0'
ms.author: wpickett
ms.custom: linux-related-content
ms.date: 11/11/2025
uid: blazor/security/webassembly/hosted-with-identity-server
---
# Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server

> **Important:**
> The Hosted Blazor WebAssembly project template was removed from the framework with the release of .NET 8 (November, 2023). The guidance in this article is only supported for .NET 7 or earlier. Hosted Blazor WebAssembly apps that are upgraded each release continue to receive product support. Alternatively, refactor the app into either a standalone Blazor WebAssembly app or a Blazor Web App.


This article explains how to create a [hosted Blazor WebAssembly solution](https://learn.microsoft.com/search/?terms=blazor%2Fhosting-models%23blazor-webassembly) that uses [Duende Identity Server](https://docs.duendesoftware.com) to authenticate users and API calls.

**Applies to: \>= aspnetcore-6.0**

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).



> **Note:**
> To configure a standalone or hosted Blazor WebAssembly app to use an existing, external Identity Server instance, follow the guidance in [blazor/security/webassembly/standalone-with-authentication-library](standalone-with-authentication-library.md).

For additional security scenario coverage after reading this article, see [blazor/security/webassembly/additional-scenarios](additional-scenarios.md).

## Walkthrough

The subsections of the walkthrough explain how to:

* Create the Blazor app
* Run the app

### Create a Blazor app

# [Visual Studio](#tab/visual-studio)

To create a new Blazor WebAssembly project with an authentication mechanism:

1. Create a new project.

1. Choose the **Blazor WebAssembly App** template. Select **Next**.

1. Provide a **Project name** without using dashes. Confirm that the **Location** is correct. Select **Next**.

   Avoid using dashes (`-`) in the project name that break the formation of the OIDC app identifier. Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration, and dashes aren't permitted in an OIDC app identifier. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives.

1. In the **Additional information** dialog, select **Individual Accounts** as the **Authentication type** to store users within the app using ASP.NET Core's [Identity](../../../security/authentication/identity.md) system.

1. Select the **ASP.NET Core Hosted** checkbox.

1. Select the **Create** button to create the app.

# [Visual Studio Code / .NET CLI](#tab/visual-studio-code+net-cli)

To create a new Blazor WebAssembly project with an authentication mechanism in an empty folder, specify the `Individual` authentication mechanism with the `-au|--auth` option to store users within the app using ASP.NET Core's [Identity](../../../security/authentication/identity.md) system:

```dotnetcli
dotnet new blazorwasm -au Individual -ho -o {PROJECT NAME}
```

| Placeholder | Example |
| --- | --- |
| `{PROJECT NAME}` | `BlazorSample` |

The output location specified with the optional `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name.

Avoid using dashes (`-`) in the project name that break the formation of the OIDC app identifier. Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration, and dashes aren't permitted in an OIDC app identifier. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives.

For more information, see the [`dotnet new`](https://learn.microsoft.com/dotnet/core/tools/dotnet-new) command in the .NET Guide.

---

### Run the app

Run the app from the **`Server`** project. When using Visual Studio, either:

* Select the dropdown arrow next to the **Run** button. Open **Configure Startup Projects** from the dropdown list. Select the **Single startup project** option. Confirm or change the project for the startup project to the **`Server`** project.

* Confirm that the **`Server`** project is highlighted in **Solution Explorer** before you start the app with any of the following approaches:

  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press <kbd>F5</kbd>.

* In a command shell, navigate to the **`Server`** project folder of the solution. Execute the `dotnet watch` (or `dotnet run`) command.


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

### **Server** app services

*This section pertains to the solution's **Server** app.*

The following services are registered.

**Applies to: \>= aspnetcore-6.0**

* In the `Program` file:

  * Entity Framework Core and ASP.NET Core Identity:

    ```csharp
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite( ... ));
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();

    builder.Services.AddDefaultIdentity<ApplicationUser>(options => 
            options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    ```

  * Identity Server with an additional [Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%252A) helper method that sets up default ASP.NET Core conventions on top of Identity Server:

    ```csharp
    builder.Services.AddIdentityServer()
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
    ```

  * Authentication with an additional [Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%252A) helper method that configures the app to validate JWT tokens produced by Identity Server:

    ```csharp
    builder.Services.AddAuthentication()
        .AddIdentityServerJwt();
    ```



**Applies to: < aspnetcore-6.0**

* In `Startup.ConfigureServices` of `Startup.cs`:

  * Entity Framework Core and ASP.NET Core Identity:

    ```csharp
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(
            Configuration.GetConnectionString("DefaultConnection")));

    services.AddDefaultIdentity<ApplicationUser>(options => 
            options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    ```

    > **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


  * Identity Server with an additional [Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%252A) helper method that sets up default ASP.NET Core conventions on top of Identity Server:

    ```csharp
    services.AddIdentityServer()
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
    ```

  * Authentication with an additional [Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%252A) helper method that configures the app to validate JWT tokens produced by Identity Server:

    ```csharp
    services.AddAuthentication()
        .AddIdentityServerJwt();
    ```



**Applies to: \>= aspnetcore-7.0**

> **Note:**
> When a single authentication scheme is registered, the authentication scheme is automatically used as the app's default scheme, and it isn't necessary to state the scheme to [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) or via [Microsoft.AspNetCore.Authentication.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions). For more information, see [security/authentication/index#defaultscheme](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Findex%23defaultscheme) and the [ASP.NET Core announcement (aspnet/Announcements #490)](https://github.com/aspnet/Announcements/issues/490).




**Applies to: \>= aspnetcore-6.0**

* In the `Program` file:



**Applies to: < aspnetcore-6.0**

* In `Startup.Configure` of `Startup.cs`:



  * The Identity Server middleware exposes the OpenID Connect (OIDC) endpoints:

    ```csharp
    app.UseIdentityServer();
    ```

**Applies to: < aspnetcore-7.0**

  * The authentication middleware is responsible for validating request credentials and setting the user on the request context:

    ```csharp
    app.UseAuthentication();
    ```



  * Authorization middleware enables authorization capabilities:

    ```csharp
    app.UseAuthorization();
    ```

### API authorization

*This section pertains to the solution's **Server** app.*

The [Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%252A) helper method configures [Identity Server](https://docs.duendesoftware.com) for ASP.NET Core scenarios. Identity Server is a powerful and extensible framework for handling app security concerns. Identity Server exposes unnecessary complexity for the most common scenarios. Consequently, a set of conventions and configuration options is provided that we consider a good starting point. Once your authentication needs change, the full power of Identity Server is available to customize authentication to suit an app's requirements.

### Add an authentication handler for an API that coexists with Identity Server

*This section pertains to the solution's **Server** app.*

The [Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%252A) helper method configures a policy scheme for the app as the default authentication handler. The policy is configured to allow Identity to handle all requests routed to any subpath in the Identity URL space under `/Identity`. The [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler) handles all other requests. Additionally, this method:

* Registers an API resource with Identity Server with a default scope of `{PROJECT NAME}API`, where the `{PROJECT NAME}` placeholder is the project's name at app creation.
* Configures the JWT bearer token middleware to validate tokens issued by Identity Server for the app.

### Weather forecast controller

*This section pertains to the solution's **Server** app.*

In the `WeatherForecastController` (`Controllers/WeatherForecastController.cs`), the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) is applied to the class. The attribute indicates that the user must be authorized based on the default policy to access the resource. The default authorization policy is configured to use the default authentication scheme, which is set up by [Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt%252A). The helper method configures [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler) as the default handler for requests to the app.

### Application database context

*This section pertains to the solution's **Server** app.*

In the `ApplicationDbContext` (`Data/ApplicationDbContext.cs`), [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) extends [Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext%25601) to include the schema for Identity Server. [Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext%25601) is derived from [Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext).

To gain full control of the database schema, inherit from one of the available Identity [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) classes and configure the context to include the Identity schema by calling `builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value)` in the [Microsoft.EntityFrameworkCore.DbContext.OnModelCreating%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.OnModelCreating%252A) method.

### OIDC configuration controller

*This section pertains to the solution's **Server** app.*

In the `OidcConfigurationController` (`Controllers/OidcConfigurationController.cs`), the client endpoint is provisioned to serve OIDC parameters.

### App settings

*This section pertains to the solution's **Server** app.*

In the app settings file (`appsettings.json`) at the project root, the `IdentityServer` section describes the list of configured clients. In the following example, there's a single client. The client name corresponds to the **Client** app's assembly name and is mapped by convention to the OAuth `ClientId` parameter. The profile indicates the app type being configured. The profile is used internally to drive conventions that simplify the configuration process for the server.

```json
"IdentityServer": {
  "Clients": {
    "{ASSEMBLY NAME}": {
      "Profile": "IdentityServerSPA"
    }
  }
}
```

The `{ASSEMBLY NAME}` placeholder is the **Client** app's assembly name (for example, `BlazorSample.Client`).

### Authentication package

*This section pertains to the solution's **Client** app.*

When an app is created to use Individual Accounts (`Individual`), the app automatically receives a package reference for the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication). The package provides a set of primitives that help the app authenticate users and obtain tokens to call protected APIs.

If adding authentication to an app, manually add the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### `HttpClient` configuration

*This section pertains to the solution's **Client** app.*

In the `Program` file, a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is configured to supply [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances that include access tokens when making requests to the server API. At solution creation, the named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is `{PROJECT NAME}.ServerAPI`, where the `{PROJECT NAME}` placeholder is the project's name.

```csharp
builder.Services.AddHttpClient("{PROJECT NAME}.ServerAPI", 
        client => client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("{PROJECT NAME}.ServerAPI"));
```

The `{PROJECT NAME}` placeholder is the project name at solution creation. For example, providing a project name of `BlazorSample` produces a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) of `BlazorSample.ServerAPI`.

> **Note:**
> If you're configuring a Blazor WebAssembly app to use an existing Identity Server instance that isn't part of a hosted Blazor solution, change the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) base address registration from [Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress) (`builder.HostEnvironment.BaseAddress`) to the server app's API authorization endpoint URL.

### API authorization support

*This section pertains to the solution's **Client** app.*

The support for authenticating users is plugged into the service container by the extension method provided inside the [`Microsoft.AspNetCore.Components.WebAssembly.Authentication` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication). This method sets up the services required by the app to interact with the existing authorization system.

```csharp
builder.Services.AddApiAuthorization();
```

Configuration for the app is loaded by convention from `_configuration/{client-id}`. By convention, the client ID is set to the app's assembly name. This URL can be changed to point to a separate endpoint by calling the overload with options.

### `Imports` file

*This section pertains to the solution's **Client** app.*

The [Microsoft.AspNetCore.Components.Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization) namespace is made available throughout the app via the imports file (`_Imports.razor`):

```razor
...
@using Microsoft.AspNetCore.Components.Authorization
...
```

### `Index` page

*This section pertains to the solution's **Client** app.*

The Index page (`wwwroot/index.html`) page includes a script that defines the `AuthenticationService` in JavaScript. `AuthenticationService` handles the low-level details of the OIDC protocol. The app internally calls methods defined in the script to perform the authentication operations.

```html
<script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
```


### `App` component

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


### `RedirectToLogin` component

*This section pertains to the solution's **Client** app.*

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * [Navigation history state](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navigation-history-state) in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in [reference source](https://github.com/dotnet/aspnetcore/tree/main/src/ProjectTemplates/Web.ProjectTemplates/content/ComponentsWebAssembly-CSharp). The location of the component changed over time, so use GitHub search tools to locate the component.


### `LoginDisplay` component

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



### `Authentication` component

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


### `FetchData` component

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


## Azure App Service on Linux

Specify the issuer explicitly when deploying to Azure App Service on Linux. For more information, see [security/authentication/identity/spa#azure-app-service-on-linux](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fidentity%2Fspa%23azure-app-service-on-linux).

## Name and role claim with API authorization

### Custom user factory

In the **Client** app, create a custom user factory. Identity Server sends multiple roles as a JSON array in a single `role` claim. A single role is sent as a string value in the claim. The factory creates an individual `role` claim for each of the user's roles.

`CustomUserFactory.cs`:

```csharp
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;

public class CustomUserFactory(IAccessTokenProviderAccessor accessor)
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var user = await base.CreateUserAsync(account, options);

        if (user.Identity is not null && user.Identity.IsAuthenticated)
        {
            var identity = (ClaimsIdentity)user.Identity;
            var roleClaims = identity.FindAll(identity.RoleClaimType).ToArray();

            if (roleClaims.Any())
            {
                foreach (var existingClaim in roleClaims)
                {
                    identity.RemoveClaim(existingClaim);
                }

                var rolesElem = 
                    account.AdditionalProperties[identity.RoleClaimType];

                if (options.RoleClaim is not null && rolesElem is JsonElement roles)
                {
                    if (roles.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var role in roles.EnumerateArray())
                        {
                            var roleValue = role.GetString();

                            if (!string.IsNullOrEmpty(roleValue))
                            {
                                identity.AddClaim(
                                  new Claim(options.RoleClaim, roleValue));
                            }
        
                        }
                    }
                    else
                    {
                        var roleValue = roles.GetString();

                        if (!string.IsNullOrEmpty(roleValue))
                        {
                            identity.AddClaim(
                              new Claim(options.RoleClaim, roleValue));
                        }
                    }
                }
            }
        }

        return user;
    }
}
```

In the **Client** app, register the factory in the `Program` file:

```csharp
builder.Services.AddApiAuthorization()
    .AddAccountClaimsPrincipalFactory<CustomUserFactory>();
```

In the **Server** app, call [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) on the Identity builder, which adds role-related services.

**Applies to: \>= aspnetcore-6.0**

In the `Program` file:

```csharp
using Microsoft.AspNetCore.Identity;

...

builder.Services.AddDefaultIdentity<ApplicationUser>(options => 
    options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```



**Applies to: < aspnetcore-6.0**

In `Startup.cs`:

```csharp
using Microsoft.AspNetCore.Identity;

...

services.AddDefaultIdentity<ApplicationUser>(options => 
    options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```



### Configure Identity Server

Use **one** of the following approaches:

* [API authorization options](#api-authorization-options)
* [Profile Service](#profile-service)

#### API authorization options

In the **Server** app:

* Configure Identity Server to put the `name` and `role` claims into the ID token and access token.
* Prevent the default mapping for roles in the JWT token handler.

**Applies to: \>= aspnetcore-6.0**

In the `Program` file:

```csharp
using System.IdentityModel.Tokens.Jwt;

...

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options => {
        options.IdentityResources["openid"].UserClaims.Add("name");
        options.ApiResources.Single().UserClaims.Add("name");
        options.IdentityResources["openid"].UserClaims.Add("role");
        options.ApiResources.Single().UserClaims.Add("role");
    });

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");
```



**Applies to: < aspnetcore-6.0**

In `Startup.cs`:

```csharp
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

...

services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options => {
        options.IdentityResources["openid"].UserClaims.Add("name");
        options.ApiResources.Single().UserClaims.Add("name");
        options.IdentityResources["openid"].UserClaims.Add("role");
        options.ApiResources.Single().UserClaims.Add("role");
    });

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");
```



#### Profile Service

In the **Server** app, create a `ProfileService` implementation.

`ProfileService.cs`:

```csharp
using IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;

public class ProfileService : IProfileService
{
    public ProfileService()
    {
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var nameClaim = context.Subject.FindAll(JwtClaimTypes.Name);
        context.IssuedClaims.AddRange(nameClaim);

        var roleClaims = context.Subject.FindAll(JwtClaimTypes.Role);
        context.IssuedClaims.AddRange(roleClaims);

        await Task.CompletedTask;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        await Task.CompletedTask;
    }
}
```

**Applies to: \>= aspnetcore-6.0**

In the **Server** app, register the Profile Service in the `Program` file:

```csharp
using Duende.IdentityServer.Services;

...

builder.Services.AddTransient<IProfileService, ProfileService>();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");
```



**Applies to: < aspnetcore-6.0**

In the **Server** app, register the Profile Service in `Startup.ConfigureServices` of `Startup.cs`:

```csharp
using IdentityServer4.Services;

...

services.AddTransient<IProfileService, ProfileService>();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");
```



### Use authorization mechanisms

In the **Client** app, component authorization approaches are functional at this point. Any of the authorization mechanisms in components can use a role to authorize the user:

* [`AuthorizeView` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component) (Example: `<AuthorizeView Roles="Admin">`)
* [`[Authorize]` attribute directive](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorize-attribute) ([Microsoft.AspNetCore.Authorization.AuthorizeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute)) (Example: `@attribute [Authorize(Roles = "Admin")]`)
* [Procedural logic](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23procedural-logic) (Example: `if (user.IsInRole("Admin")) { ... }`)

  Multiple role tests are supported:

  ```csharp
  if (user.IsInRole("Admin") && user.IsInRole("Developer"))
  {
      ...
  }
  ```

`User.Identity.Name` is populated in the **Client** app with the user's user name, which is usually their sign-in email address.

## `UserManager` and `SignInManager`

Set the user identifier claim type when a Server app requires:

* [Microsoft.AspNetCore.Identity.UserManager%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserManager%25601) or [Microsoft.AspNetCore.Identity.SignInManager%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601) in an API endpoint.
* [Microsoft.AspNetCore.Identity.IdentityUser](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityUser) details, such as the user's name, email address, or lockout end time.

In `Program.cs` for ASP.NET Core in .NET 6 or later:

```csharp
using System.Security.Claims;

...

builder.Services.Configure<IdentityOptions>(options => 
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier);
```

In `Startup.ConfigureServices` for .NET 5 or earlier:

```csharp
using System.Security.Claims;

...

services.Configure<IdentityOptions>(options => 
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier);
```

The following `WeatherForecastController` logs the [Microsoft.AspNetCore.Identity.IdentityUser%601.UserName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityUser%25601.UserName) when the `Get` method is called.

> **Note:**
> The following example uses:
>
> * A [file-scoped namespace](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/namespace), which is a C# 10 or later (.NET 6 or later) feature.
> * A [primary constructor](https://learn.microsoft.com/dotnet/csharp/whats-new/tutorials/primary-constructors), which is a C# 12 or later (.NET 8 or later) feature.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using BlazorSample.Server.Models;
using BlazorSample.Shared;

namespace BlazorSample.Server.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class WeatherForecastController(ILogger<WeatherForecastController> logger, 
        UserManager<ApplicationUser> userManager) : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", 
        "Balmy", "Hot", "Sweltering", "Scorching"
    };

    [HttpGet]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        var rng = new Random();

        var user = await userManager.GetUserAsync(User);

        if (user != null)
        {
            logger.LogInformation("User.Identity.Name: {UserIdentityName}", user.UserName);
        }

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = rng.Next(-20, 55),
            Summary = Summaries[rng.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
```

In the preceding example:

* The **`Server`** project's namespace is `BlazorSample.Server`.
* The **`Shared`** project's namespace is `BlazorSample.Shared`.


## Host in Azure App Service with a custom domain and certificate

The following guidance explains:

* How to deploy a hosted Blazor WebAssembly app with Identity Server to [Azure App Service](https://azure.microsoft.com/services/app-service/) with a custom domain.
* How to create and use a TLS certificate for HTTPS protocol communication with browsers. Although the guidance focuses on using the certificate with a custom domain, the guidance is equally applicable to using a default Azure Apps domain, for example `contoso.azurewebsites.net`.

For this hosting scenario, do **not** use the same certificate for [Duende Identity Server's](https://docs.duendesoftware.com) token signing key and the site's HTTPS secure communication with browsers:

* Using different certificates for these two requirements is a good security practice because it isolates private keys for each purpose.
* TLS certificates for communication with browsers is managed independently without affecting Identity Server's token signing.
* When [Azure Key Vault](https://azure.microsoft.com/services/key-vault/) supplies a certificate to an App Service app for custom domain binding, Identity Server can't obtain the same certificate from Azure Key Vault for token signing. Although configuring Identity Server to use the same TLS certificate from a physical path is possible, placing security certificates into source control is a **poor practice and should be avoided in most scenarios**.

In the following guidance, a self-signed certificate is created in Azure Key Vault solely for Identity Server token signing. The Identity Server configuration uses the key vault certificate via the app's `CurrentUser` > `My` certificate store. Other certificates used for HTTPS traffic with custom domains are created and configured separately from the Identity Server signing certificate.

To configure an app, Azure App Service, and Azure Key Vault to host with a custom domain and HTTPS:

1. Create an [App Service plan](https://learn.microsoft.com/azure/app-service/overview-hosting-plans) with an plan level of `Basic B1` or higher. App Service requires a `Basic B1` or higher service tier to use custom domains.
1. Create a PFX certificate for the site's secure browser communication (HTTPS protocol) with a common name of the site's fully qualified domain name (FQDN) that your organization controls (for example, `www.contoso.com`). Create the certificate with:
   * Key uses
     * Digital signature validation (`digitalSignature`)
     * Key encipherment (`keyEncipherment`)
   * Enhanced/extended key uses
     * Client Authentication (1.3.6.1.5.5.7.3.2)
     * Server Authentication (1.3.6.1.5.5.7.3.1)

   To create the certificate, use one of the following approaches or any other suitable tool or online service:

   * [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/certificates/quick-create-portal#add-a-certificate-to-key-vault)
   * [MakeCert on Windows](https://learn.microsoft.com/windows/desktop/seccrypto/makecert)
   * [OpenSSL](https://www.openssl.org)

   Make note of the password, which is used later to import the certificate into Azure Key Vault.

   For more information on Azure Key Vault certificates, see [Azure Key Vault: Certificates](https://learn.microsoft.com/azure/key-vault/certificates/).
1. Create a new Azure Key Vault or use an existing key vault in your Azure subscription.
1. In the key vault's **Certificates** area, import the PFX site certificate. Record the certificate's thumbprint, which is used in the app's configuration later.
1. In Azure Key Vault, generate a new self-signed certificate for Identity Server token signing. Give the certificate a **Certificate Name** and **Subject**. The **Subject** is specified as `CN={COMMON NAME}`, where the `{COMMON NAME}` placeholder is the certificate's common name. The common name can be any alphanumeric string. For example, `CN=IdentityServerSigning` is a valid certificate **Subject**. In **Issuance Policy** > **Advanced Policy Configuration**, use the default settings. Record the certificate's thumbprint, which is used in the app's configuration later.
1. Navigate to Azure App Service in the Azure portal and create a new App Service with the following configuration:
   * **Publish** set to `Code`.
   * **Runtime stack** set to the app's runtime.
   * For **Sku and size**, confirm that the App Service tier is `Basic B1` or higher.  App Service requires a `Basic B1` or higher service tier to use custom domains.
1. After Azure creates the App Service, open the app's **Configuration** and add a new application setting specifying the certificate thumbprints recorded earlier. The app setting key is `WEBSITE_LOAD_CERTIFICATES`. Separate the certificate thumbprints in the app setting value with a comma, as the following example shows:
   * Key: `WEBSITE_LOAD_CERTIFICATES`
   * Value: `57443A552A46DB...D55E28D412B943565,29F43A772CB6AF...1D04F0C67F85FB0B1`

   In the Azure portal, saving app settings is a two-step process: Save the `WEBSITE_LOAD_CERTIFICATES` key-value setting, then select the **Save** button at the top of the blade.
1. Select the app's **TLS/SSL settings**. Select **Private Key Certificates (.pfx)**. Use the **Import Key Vault Certificate** process. **Use the process _twice_ to import both the site's certificate for HTTPS communication and the site's self-signed Identity Server token signing certificate.**
1. Navigate to the **Custom domains** blade. At your domain registrar's website, use the **IP address** and **Custom Domain Verification ID** to configure the domain. A typical domain configuration includes:
   * An **A Record** with a **Host** of `@` and a value of the IP address from the Azure portal.
   * A **TXT Record** with a **Host** of `asuid` and the value of the verification ID generated by Azure and provided by the Azure portal.

   Make sure that you save the changes at your domain registrar's website correctly. Some registrar websites require a two-step process to save domain records: One or more records are saved individually followed by updating the domain's registration with a separate button.
1. Return to the **Custom domains** blade in the Azure portal. Select **Add custom domain**. Select the **A Record** option. Provide the domain and select **Validate**. If the domain records are correct and propagated across the Internet, the portal allows you to select the **Add custom domain** button.

   It can take a few days for domain registration changes to propagate across Internet domain name servers (DNS) after they're processed by your domain registrar. If domain records aren't updated within three business days, confirm the records are correctly set with the domain registrar and contact their customer support.
1. In the **Custom domains** blade, the **SSL STATE** for the domain is marked `Not Secure`. Select the **Add binding** link. Select the site HTTPS certificate from the key vault for the custom domain binding.
1. In Visual Studio, open the *Server* project's app settings file (`appsettings.json` or `appsettings.Production.json`). In the Identity Server configuration, add the following `Key` section. Specify the self-signed certificate **Subject** for the `Name` key. In the following example, the certificate's common name assigned in the key vault is `IdentityServerSigning`, which yields a **Subject** of `CN=IdentityServerSigning`:

   ```json
   "IdentityServer": {

     ...

     "Key": {
       "Type": "Store",
       "StoreName": "My",
       "StoreLocation": "CurrentUser",
       "Name": "CN=IdentityServerSigning"
     }
   },
   ```

1. In Visual Studio, create an Azure App Service [publish profile](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fvisual-studio-publish-profiles%23publish-profiles) for the *Server* project. From the menu bar, select: **Build** > **Publish** > **New** > **Azure** > **Azure App Service** (Windows or Linux). When Visual Studio is connected to an Azure subscription, you can set the **View** of Azure resources by **Resource type**. Navigate within the **Web App** list to find the App Service for the app and select it. Select **Finish**.
1. When Visual Studio returns to the **Publish** window, the key vault and SQL Server database service dependencies are automatically detected.

   No configuration changes to the default settings are required for the key vault service.

   For testing purposes, an app's local [SQLite](https://www.sqlite.org/index.html) database, which is configured by the Blazor template, can be deployed with the app without additional configuration. Configuring a different database for Identity Server in production is beyond the scope of this article. For more information, see the database resources in the following documentation sets:

   * [App Service](https://learn.microsoft.com/azure/app-service/)
   * [Duende Identity Server](https://docs.duendesoftware.com)

1. Select the **Edit** link under the deployment profile name at the top of the window. Change the destination URL to the site's custom domain URL (for example, `https://www.contoso.com`). Save the settings.
1. Publish the app. Visual Studio opens a browser window and requests the site at its custom domain.

The Azure documentation contains additional detail on using Azure services and custom domains with TLS binding in App Service, including information on using CNAME records instead of A records. For more information, see the following resources:

* [App Service documentation](https://learn.microsoft.com/azure/app-service/)
* [Tutorial: Map an existing custom DNS name to Azure App Service](https://learn.microsoft.com/azure/app-service/app-service-web-tutorial-custom-domain)
* [Secure a custom DNS name with a TLS/SSL binding in Azure App Service](https://learn.microsoft.com/azure/app-service/configure-ssl-bindings)
* [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

We recommend using a new private mode browser window (for example, Microsoft Edge InPrivate mode or Google Chrome Incognito mode) for each app test run after a change to the app, app configuration, or Azure services in the Azure portal. Lingering cookies from a previous test run can result in failed authentication or authorization when testing the site even when the site's configuration is correct. For more information on how to configure Visual Studio to open a new private browser window for each test run, see the [Cookies and site data](#cookies-and-site-data) section.

When App Service configuration is changed in the Azure portal, the updates generally take effect quickly but aren't instant. Sometimes, you must wait a short period for an App Service to restart in order for a configuration change to take effect.

If troubleshooting an Identity Server key-signing certificate loading problem, execute the following command in an Azure portal [Kudu](https://github.com/projectkudu/kudu/wiki/Accessing-the-kudu-service) PowerShell command shell. The command provides a list of certificates that the app can access from the `CurrentUser` > `My` certificate store. The output includes certificate subjects and thumbprints useful when debugging an app:

```powershell
Get-ChildItem -path Cert:\CurrentUser\My -Recurse | Format-List DnsNameList, Subject, Thumbprint, EnhancedKeyUsageList
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

* [Deployment to Azure App Service](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fidentity%2Fspa%23deploy-to-production)
* [Import a certificate from Key Vault (Azure documentation)](https://learn.microsoft.com/azure/app-service/configure-ssl-certificate#import-a-certificate-from-key-vault)
* [blazor/security/webassembly/additional-scenarios](additional-scenarios.md)
* [Unauthenticated or unauthorized web API requests in an app with a secure default client](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23unauthenticated-or-unauthorized-web-api-requests-in-an-app-with-a-secure-default-client)
* [host-and-deploy/proxy-load-balancer](../../../host-and-deploy/proxy-load-balancer.md): Includes guidance on:
  * Using forwarded headers middleware to preserve HTTPS scheme information across proxy servers and internal networks.
  * Additional scenarios and use cases, including manual scheme configuration, request path changes for correct request routing, and forwarding the request scheme for Linux and non-IIS reverse proxies.
* [Duende Identity Server](https://docs.duendesoftware.com)
