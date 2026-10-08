---
title: Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity
author: guardrex
description: Learn how to secure Blazor WebAssembly apps with ASP.NET Core Identity.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/security/webassembly/standalone-with-identity/index
---
# Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity

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


Standalone Blazor WebAssembly apps can be secured with ASP.NET Core Identity by following the guidance in this article.

## Endpoints for registering, logging in, and logging out

Instead of using the default UI provided by ASP.NET Core Identity for SPA and Blazor apps, which is based on Razor Pages, call [Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi%252A) in a backend API to add JSON API endpoints for registering and logging in users with ASP.NET Core Identity. Identity API endpoints also support advanced features, such as two-factor authentication and email verification.

In the following examples, `httpClient` is an instance of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient). For more information, see [blazor/call-web-api](../../../call-web-api.md).

On the client, call the `/register` endpoint to register a user with their email address and password:

```csharp
using var result = await httpClient.PostAsJsonAsync(
    "register", new
    {
        email,
        password
    });
```

On the client, log in a user with cookie authentication using the `/login` endpoint with `useCookies` query string set to `true`:

```csharp
using var result = await httpClient.PostAsJsonAsync(
    "login?useCookies=true", new
    {
        email,
        password
    });
```

The backend server API establishes cookie authentication with a call to [Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%252A) on the authentication builder:

```csharp
builder.Services
    .AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();
```

## Token authentication

For native and mobile scenarios where some clients don't support cookies, the login API provides a parameter to request tokens.

> **Warning:**
> We recommend using cookies for browser-based apps instead of tokens because the browser handles cookies without exposing them to JavaScript. If you opt to use token-based security in web apps, you're responsible for ensuring the tokens are kept secure.

A custom token (one that is proprietary to the ASP.NET Core Identity platform) is issued that can be used to authenticate subsequent requests. The token should be passed in the `Authorization` header as a bearer token. A refresh token is also provided. This token allows the app to request a new token when the old one expires without forcing the user to log in again.

The tokens are not standard JSON Web Tokens (JWTs). The use of custom tokens is intentional, as the built-in Identity API is meant primarily for simple scenarios. The token option is not intended to be a fully-featured identity service provider or token server, but instead an alternative to the cookie option for clients that can't use cookies.

The following guidance begins the process of implementing token-based authentication with the login API. Custom code is required to complete the implementation. For more information, see [security/authentication/identity/spa](../../../../security/authentication/identity-api-authorization.md).

Instead of the backend server API establishing cookie authentication with a call to [Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%252A) on the authentication builder, the server API sets up bearer token auth with the [Microsoft.Extensions.DependencyInjection.BearerTokenExtensions.AddBearerToken%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.BearerTokenExtensions.AddBearerToken%252A) extension method. Specify the scheme for bearer authentication tokens with [Microsoft.AspNetCore.Identity.IdentityConstants.BearerScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityConstants.BearerScheme%252A).

In `Backend/Program.cs`, change the authentication services and configuration to the following: 

```csharp
builder.Services
    .AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);
```

In `BlazorWasmAuth/Identity/CookieAuthenticationStateProvider.cs`, remove the `useCookies` query string parameter in the `LoginAsync` method of the `CookieAuthenticationStateProvider`:

```diff
- login?useCookies=true
+ login
```

At this point, you must provide custom code to parse the [Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse) on the client and manage the access and refresh tokens. For more information, see [security/authentication/identity/spa](../../../../security/authentication/identity-api-authorization.md).

## Additional Identity scenarios

Scenarios covered by the Blazor documentation set:

* [Account confirmation, password management, and recovery codes](account-confirmation-and-password-recovery.md)
* [Two-factor authentication (2FA) with a TOTP authenticator app](qrcodes-for-authenticator-apps.md)

For information on additional Identity scenarios provided by the API, see [security/authentication/identity/spa](../../../../security/authentication/identity-api-authorization.md):

* Secure selected endpoints
* User info management

## Use secure authentication flows to maintain sensitive data and credentials

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


## Sample apps

In this article, sample apps serve as a reference for standalone Blazor WebAssembly apps that access ASP.NET Core Identity through a backend web API. The demonstration includes two apps:

* `Backend`: A backend web API app that maintains a user identity store for ASP.NET Core Identity.
* `BlazorWasmAuth`: A standalone Blazor WebAssembly frontend app with user authentication.

Access the sample apps through the latest version folder from the repository's root with the following link. The samples are provided for .NET 8 or later. See the `README` file in the `BlazorWebAssemblyStandaloneWithIdentity` folder for steps on how to run the sample apps.

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

## Backend web API app packages and code

The backend web API app maintains a user identity store for ASP.NET Core Identity.

### Packages

The app uses the following NuGet packages:

* [`Microsoft.AspNetCore.Identity.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.EntityFrameworkCore)
* [`Microsoft.EntityFrameworkCore.InMemory`](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.InMemory)
* [`NSwag.AspNetCore`](https://www.nuget.org/packages/NSwag.AspNetCore)

If your app is to use a different EF Core database provider than the in-memory provider, don't create a package reference in your app for `Microsoft.EntityFrameworkCore.InMemory`.

In the app's project file (`.csproj`), [invariant globalization](https://learn.microsoft.com/search/?terms=blazor%2Fglobalization-localization%23invariant-globalization) is configured.

### Sample app code

[App settings](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/Backend/appsettings.json) configure backend and frontend URLs:

* `Backend` app (`BackendUrl`): `https://localhost:7211`
* `BlazorWasmAuth` app (`FrontendUrl`): `https://localhost:7171`

The [`Backend.http` file](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/Backend/Backend.http) can be used for testing the weather data request. Note that the `BlazorWasmAuth` app must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see [test/http-files](../../../../test/http-files.md).

The following setup and configuration is found in the app's [`Program` file](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/Backend/Program.cs). 

User identity with cookie authentication is added by calling [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) and [Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies%252A). Services for authorization checks are added by a call to [Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorizationBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorizationBuilder%252A).

Only recommended for demonstrations, the app uses the [EF Core in-memory database provider](https://learn.microsoft.com/ef/core/providers/in-memory/) for the database context registration ([Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext%252A)). The in-memory database provider makes it easy to restart the app and test the registration and login user flows. Each run starts with a fresh database, but the app includes [test user seeding demonstration code](#test-user-seeding-demonstration), which is described later in this article. If the database is changed to SQLite, users are saved between sessions, but the database must be created through [migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/), as shown in the [EF Core getting started tutorial](https://learn.microsoft.com/ef/core/get-started/overview/first-app)&dagger;. You can use other relational providers such as SQL Server for your production code.

> **Note:**
> &dagger;The EF Core getting started tutorial uses PowerShell commands to execute database migrations when using Visual Studio. An alternative approach in Visual Studio is to use the Connected Services UI:
>
> In **Solution Explorer**, double-click **Connected Services**. In **Service Dependencies** > **SQL Server Express LocalDB**, select the ellipsis (`...`) followed by either **Add migration** to create a migration or **Update database** to update the database.

Configure Identity to use the EF Core database and expose the Identity endpoints via the calls to [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%252A), [Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores%252A), and [Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddApiEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddApiEndpoints%252A).

A [Cross-Origin Resource Sharing (CORS)](../../../../security/cors.md) policy is established to permit requests from the frontend and backend apps. Fallback URLs are configured for the CORS policy if app settings don't provide them:

* `Backend` app (`BackendUrl`): `https://localhost:5001`
* `BlazorWasmAuth` app (`FrontendUrl`): `https://localhost:5002`

**Applies to: \>= aspnetcore-9.0**

The project includes packages and configuration to produce [OpenAPI documents](../../../../fundamentals/openapi/overview.md).



**Applies to: < aspnetcore-9.0**

Services and endpoints for [Swagger/OpenAPI](../../../../tutorials/web-api-help-pages-using-swagger.md) are included for web API documentation and development testing. For more information on NSwag, see [tutorials/get-started-with-nswag](../../../../tutorials/getting-started-with-NSwag.md).



User role claims are sent from a [Minimal API](../../../../fundamentals/apis.md) at the `/roles` endpoint.

Routes are mapped for Identity endpoints by calling `MapIdentityApi<AppUser>()`.

A logout endpoint (`/Logout`) is configured in the middleware pipeline to sign users out.

To secure an endpoint, add the [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) extension method to the route definition. For a controller, add the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) to the controller or action.

For more information on basic patterns for initialization and configuration of a [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) instance, see
[DbContext Lifetime, Configuration, and Initialization](https://learn.microsoft.com/ef/core/dbcontext-configuration/) in the EF Core documentation.

## Frontend standalone Blazor WebAssembly app packages and code

A standalone Blazor WebAssembly frontend app demonstrates user authentication and authorization to access a private webpage.

### Packages

The app uses the following NuGet packages:

**Applies to: \>= aspnetcore-11.0**

* [`Microsoft.AspNetCore.Components.WebAssembly.Authentication`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication)
* [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http)
* [`Microsoft.AspNetCore.Components.WebAssembly`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly)
* [`Microsoft.AspNetCore.Components.Gateway`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.Gateway)



**Applies to: < aspnetcore-11.0**

* [`Microsoft.AspNetCore.Components.WebAssembly.Authentication`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.Authentication)
* [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http)
* [`Microsoft.AspNetCore.Components.WebAssembly`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly)
* [`Microsoft.AspNetCore.Components.WebAssembly.DevServer`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.DevServer)



### Sample app code

The `Models` folder contains the app's models:

* [`FormResult` (`Identity/Models/FormResult.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/Models/FormResult.cs): Response for login and registration.
* [`UserInfo` (`Identity/Models/UserInfo.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/Models/UserInfo.cs): User info from identity endpoint to establish claims.

The [`IAccountManagement` interface (`Identity/CookieHandler.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/IAccountManagement.cs) provides account management services.

The [`CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/CookieAuthenticationStateProvider.cs) handles state for cookie-based authentication and provides account management service implementations described by the `IAccountManagement` interface. The `LoginAsync` method explicitly enables cookie authentication via the `useCookies` query string value of `true`. The class also manages creating role claims for authenticated users.

The [`CookieHandler` class (`Identity/CookieHandler.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/CookieHandler.cs) ensures cookie credentials are sent with each request to the backend web API, which handles Identity and maintains the Identity data store.

The [`wwwroot/appsettings.file`](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/wwwroot/appsettings.json) provides backend and frontend URL endpoints.

The [`App` component](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/App.razor) exposes the authentication state as a cascading parameter. For more information, see [blazor/security/index#expose-the-authentication-state-as-a-cascading-parameter](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23expose-the-authentication-state-as-a-cascading-parameter).

The [`MainLayout` component](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Layout/MainLayout.razor) and [`NavMenu` component](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Layout/NavMenu.razor) use the [`AuthorizeView` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component) to selectively display content based on the user's authentication status.

The following components handle common user authentication tasks, making use of `IAccountManagement` services:

* [`Register` component (`Components/Identity/Register.razor`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Identity/Register.razor)
* [`Login` component (`Components/Identity/Login.razor`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Identity/Login.razor)
* [`Logout` component (`Components/Identity/Logout.razor`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Identity/Logout.razor)

The [`PrivatePage` component (`Components/Pages/PrivatePage.razor`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Components/Pages/PrivatePage.razor) requires authentication and shows the user's claims.

Services and configuration is provided in the [`Program` file (`Program.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Program.cs):

* The cookie handler is registered as a scoped service.
* Authorization services are registered.
* The custom authentication state provider is registered as a scoped service.
* The account management interface (`IAccountManagement`) is registered.
* The base host URL is configured for a registered HTTP client instance.
* The base backend URL is configured for a registered HTTP client instance that's used for auth interactions with the backend web API. The HTTP client uses the cookie handler to ensure that cookie credentials are sent with each request.

Call [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged%252A) when the user's authentication state changes. For an example, see the `LoginAsync` and `LogoutAsync` methods of the [`CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/CookieAuthenticationStateProvider.cs).

> **Warning:**
> The [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component selectively displays UI content depending on whether the user is authorized. All content within a Blazor WebAssembly app placed in an [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component is discoverable without authentication, so sensitive content should be obtained from a backend server-based web API after authentication succeeds. For more information, see the following resources:
>
> * [blazor/security/index#authorizeview-component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
> * [blazor/call-web-api](../../../call-web-api.md)
> * [blazor/security/webassembly/additional-scenarios](../additional-scenarios.md)

## Test user seeding demonstration

The `SeedData` class ([`SeedData.cs`](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/Backend/SeedData.cs)) demonstrates how to create test users for development. The test user, named Leela, signs into the app with the email address `leela@contoso.com`. The user's password is set to `Passw0rd!`. Leela is given `Administrator` and `Manager` roles for authorization, which enables the user to access the manager page at `/private-manager-page` but not the editor page at `/private-editor-page`.

> **Warning:**
> Never allow test user code to run in a production environment. `SeedData.InitializeAsync` is only called in the `Development` environment in the `Program` file:
>
> ```csharp
> if (builder.Environment.IsDevelopment())
> {
>     await using var scope = app.Services.CreateAsyncScope();
>     await SeedData.InitializeAsync(scope.ServiceProvider);
> }
> ```

## Roles

Role claims aren't sent back from the `manage/info` endpoint to create user claims for users of the `BlazorWasmAuth` app. Role claims are managed independently via a separate request in the `GetAuthenticationStateAsync` method of the [`CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`)](https://github.com/dotnet/blazor-samples/blob/main/8.0/BlazorWebAssemblyStandaloneWithIdentity/BlazorWasmAuth/Identity/CookieAuthenticationStateProvider.cs) after the user is authenticated in the `Backend` project. 

In the `CookieAuthenticationStateProvider`, a roles request is made to the `/roles` endpoint of the `Backend` server API project. The response is read into a string by calling [System.Net.Http.HttpContent.ReadAsStringAsync](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent.ReadAsStringAsync). [System.Text.Json.JsonSerializer.Deserialize%2A](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializer.Deserialize%252A) deserializes the string into a custom `RoleClaim` array. Finally, the claims are added to the user's claims collection.

In the `Backend` server API's `Program` file, a [Minimal API](../../../../fundamentals/apis.md) manages the `/roles` endpoint. Claims of [System.Security.Claims.ClaimsIdentity.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.RoleClaimType%252A) are [selected](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select%252A) into an [anonymous type](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/anonymous-types) and serialized for return to the `BlazorWasmAuth` project with [Microsoft.AspNetCore.Http.TypedResults.Json%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults.Json%252A).

The roles endpoint requires authorization by calling [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A). If you decide not to use Minimal APIs in favor of controllers for secure server API endpoints, be sure to set the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) on controllers or actions.

## Cross-domain hosting (same-site configuration)

The [sample apps](#sample-apps) are configured for hosting both apps at the same domain. If you host the `Backend` app at a different domain than the `BlazorWasmAuth` app, uncomment the code that configures the cookie ([Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie%252A)) in the `Backend` app's `Program` file. The default values are:

* Same-site mode: [Microsoft.AspNetCore.Http.SameSiteMode.Lax](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.SameSiteMode.Lax)
* Secure policy: [Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest)

Change the values to:

* Same-site mode: [Microsoft.AspNetCore.Http.SameSiteMode.None](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.SameSiteMode.None)
* Secure policy: [Microsoft.AspNetCore.Http.CookieSecurePolicy.Always](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.CookieSecurePolicy.Always)

```diff
- options.Cookie.SameSite = SameSiteMode.Lax;
- options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
+ options.Cookie.SameSite = SameSiteMode.None;
+ options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
```

For more information on same-site cookie settings, see the following resources:

* [Set-Cookie: `SameSite=<samesite-value>` (MDN documentation)](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
* [Cookies: HTTP State Management Mechanism (RFC Draft 6265, Section 4.1)](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1)

## Antiforgery support

Only the logout endpoint (`/logout`) in the `Backend` app requires attention to mitigate the threat of [Cross-Site Request Forgery (CSRF)](../../../../security/anti-request-forgery.md).

The logout endpoint checks for an empty body to prevent CSRF attacks. By requiring a body, the request must be made from JavaScript, which is the only way to access the authentication cookie. The logout endpoint can't be accessed by a form-based POST. This prevents a malicious site from logging the user out.

Furthermore, the endpoint is protected by authorization ([Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A)) to prevent anonymous access.

The `BlazorWasmAuth` client app is simply required to pass an empty object `{}` in the body of the request.

Outside of the logout endpoint, [antiforgery mitigation](../../../../security/anti-request-forgery.md) is only required when submitting form data to the server encoded as `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`. Blazor manages CSRF mitigation for forms in most cases. For more information, see [blazor/security/index#antiforgery-support](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23antiforgery-support) and [blazor/forms/index#antiforgery-support](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Findex%23antiforgery-support).

Requests to other server API endpoints (web API) with `application/json`-encoded content and [CORS](../../../../security/cors.md) enabled doesn't require CSRF protection. This is why no CSRF protection is required for the `Backend` app's data processing (`/data-processing`) endpoint. The roles (`/roles`) endpoint doesn't need CSRF protection because it's a GET endpoint that doesn't modify any state.

## Troubleshoot

### Logging

To enable debug or trace logging for Blazor WebAssembly authentication, see [blazor/fundamentals/logging](../../../fundamentals/logging.md).

### Common errors

Check each project's configuration. Confirm that the URLs are correct:

* `Backend` project
  * `appsettings.json`
    * `BackendUrl`
    * `FrontendUrl`
  * `Backend.http`: `Backend_HostAddress`
* `BlazorWasmAuth` project: `wwwroot/appsettings.json`
  * `BackendUrl`
  * `FrontendUrl`

If the configuration appears correct:

* Analyze application logs.
* Examine the network traffic between the `BlazorWasmAuth` app and `Backend` app with the browser's developer tools. Often, an exact error message or a message with a clue to what's causing the problem is returned to the client by the backend app after making a request. Developer tools guidance is found in the following articles:

* [Google Chrome](https://developers.google.com/web/tools/chrome-devtools/network) (Google documentation)
* [Microsoft Edge](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/network/)
* [Mozilla Firefox](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/index.html) (Mozilla documentation)

The documentation team responds to document feedback and bugs in articles. Open an issue using the **Open a documentation issue** link at the bottom of the article. The team isn't able to provide product support. Several public support forums are available to assist with troubleshooting an app. We recommend the following:

* [Stack Overflow (tag: `blazor`)](https://stackoverflow.com/questions/tagged/blazor)
* [ASP.NET Core Slack Team](https://join.slack.com/t/aspnetcore/shared_invite/zt-1mv5487zb-EOZxJ1iqb0A0ajowEbxByQ)
* [Blazor Gitter](https://gitter.im/aspnet/Blazor)

*The preceding forums are not owned or controlled by Microsoft.*

For non-security, non-sensitive, and non-confidential reproducible framework bug reports, [open an issue with the ASP.NET Core product unit](https://github.com/dotnet/aspnetcore/issues). Don't open an issue with the product unit until you've thoroughly investigated the cause of a problem and can't resolve it on your own and with the help of the community on a public support forum. The product unit isn't able to troubleshoot individual apps that are broken due to simple misconfiguration or use cases involving third-party services. If a report is sensitive or confidential in nature or describes a potential security flaw in the product that cyberattackers may exploit, see [Reporting security issues and bugs (`dotnet/aspnetcore` GitHub repository)](https://github.com/dotnet/aspnetcore/blob/main/CONTRIBUTING.md#reporting-security-issues-and-bugs).

### Cookies and site data

Cookies and site data can persist across app updates and interfere with testing and troubleshooting. Clear the following when making app code changes, user account changes, or app configuration changes:

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

### Inspect the user's claims

To troubleshoot problems with user claims, the following `UserClaims` component can be used directly in apps or serve as the basis for further customization.

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@attribute [Authorize]

<PageTitle>User Claims</PageTitle>

<h1>User Claims</h1>

**Name**: @AuthenticatedUser?.Identity?.Name

<h2>Claims</h2>

@foreach (var claim in AuthenticatedUser?.Claims ?? Array.Empty<Claim>())
{
    <p class="claim">@(claim.Type): @claim.Value</p>
}

@code {
    [CascadingParameter]
    private Task<AuthenticationState>? AuthenticationState { get; set; }

    public ClaimsPrincipal? AuthenticatedUser { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthenticationState is not null)
        {
            var state = await AuthenticationState;
            AuthenticatedUser = state.User;
        }
    }
}
```

## Additional resources

* [`AuthenticationStateProvider` service](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authenticationstateprovider-service)
* [Client-side SignalR cross-origin negotiation for authentication](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23client-side-signalr-cross-origin-negotiation-for-authentication)
