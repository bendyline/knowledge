---
title: Use cookie authentication without ASP.NET Core Identity
ai-usage: ai-assisted
author: wadepickett
description: Learn how to use cookie authentication without ASP.NET Core Identity.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/12/2025
uid: security/authentication/cookie
---
# Use cookie authentication without ASP.NET Core Identity

By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-6.0**

[ASP.NET Core Identity](identity.md) is a complete, full-featured authentication provider for creating and maintaining logins. However, a cookie-based authentication provider without ASP.NET Core Identity can be used. For more information, see [security/authentication/identity](identity.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/cookie/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

For demonstration purposes in the sample app, the user account for the hypothetical user, Maria Rodriguez, is hardcoded into the app. Use the **Email** address `maria.rodriguez@contoso.com` and any password to sign in the user. The user is authenticated in the `AuthenticateUser` method in the `Pages/Account/Login.cshtml.cs` file. In a real-world example, the user would be authenticated against a datastore.


**Applies to: \>= aspnetcore-10.0**
> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see [security/authentication/api-endpoint-auth](api-endpoint-auth.md).

**Applies to: \>= aspnetcore-6.0**
## Add cookie authentication

* Add the authentication middleware services with the [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) and [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A) methods.
* Call [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) to set the `HttpContext.User` property and run the authorization middleware for requests. `UseAuthentication` and `UseAuthorization` must be called before `Map` methods such as [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A) and [Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapDefaultControllerRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapDefaultControllerRoute%252A)

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/Program.cs?name=snippet1\&highlight=8-9,24-28)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Program.cs.md)

[Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) passed to `AddAuthentication` sets the default authentication scheme for the app. `AuthenticationScheme` is useful when there are multiple instances of cookie authentication and the app needs to [authorize with a specific scheme](../authorization/authorize-with-a-specific-scheme.md). Setting the `AuthenticationScheme` to [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) provides a value of `"Cookies"` for the scheme. Any string value can be used that distinguishes the scheme.

If [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) (default value: "`Cookies`") isn't used as the scheme, supply the scheme used when configuring the authentication provider. Otherwise, the default scheme is used. For example, if "`ContosoCookie`" is used as the scheme, supply the scheme used when configuring the authentication provider.

The authentication cookie's [Microsoft.AspNetCore.Http.CookieBuilder.IsEssential](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.CookieBuilder.IsEssential) property is set to `true` by default. Authentication cookies are allowed when a site visitor hasn't consented to data collection. For more information, see [security/gdpr#essential-cookies](https://learn.microsoft.com/search/?terms=security%2Fgdpr%23essential-cookies).

The [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions) class is used to configure the authentication provider options.

Configure [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions) in the [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A) method:

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/Program.cs?name=snippet2\&highlight=8-14)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Program.cs.md)

## Cookie policy middleware

The 
[Cookie policy middleware (GitHub Source)](https://github.com/dotnet/aspnetcore/blob/main/src/Security/CookiePolicy/src/CookiePolicyMiddleware.cs) [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) enables cookie policy capabilities. Middleware is processed in the order it's added, and cookie policy middleware should be added before cookie authentication middleware.

Use [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) provided to the cookie policy middleware to control global characteristics of cookie processing and hook into cookie processing handlers when cookies are appended or deleted.

The default [Microsoft.AspNetCore.Builder.CookiePolicyOptions.MinimumSameSitePolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions.MinimumSameSitePolicy) value is `SameSiteMode.Lax` to permit OAuth2 authentication. To strictly enforce a same-site policy of `SameSiteMode.Strict`, set the `MinimumSameSitePolicy`. Although this setting breaks OAuth2 and other cross-origin authentication schemes, it elevates the level of cookie security for other types of apps that don't rely on cross-origin request processing.

The following example shows how to configure cookie authentication with cookie policy middleware:

[language="csharp" source="cookie/snippets/6.0/Program.cs" id="snippet_policy" highlight="3-5,9"::: (complete source file; reference: cookie/snippets/6.0/Program.cs)](../../../_code/aspnetcore/security/authentication/cookie/snippets/6.0/Program.cs.md)

The cookie policy middleware setting for `MinimumSameSitePolicy` can affect the setting of `Cookie.SameSite` in `CookieAuthenticationOptions` settings according to the matrix below.

| MinimumSameSitePolicy | Cookie.SameSite | Resultant Cookie.SameSite setting |
| --- | --- | --- |
| SameSiteMode.None | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict |
| SameSiteMode.Lax | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.Lax<br>SameSiteMode.Lax<br>SameSiteMode.Strict |
| SameSiteMode.Strict | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.Strict<br>SameSiteMode.Strict<br>SameSiteMode.Strict |

## Create an authentication cookie

To create a cookie holding user information, construct a [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal). The user information is serialized and stored in the cookie. 

Create a [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) with any required [System.Security.Claims.Claim](https://learn.microsoft.com/search/?terms=System.Security.Claims.Claim)s and call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%252A) to sign in the user. `Login.cshtml.cs` in the sample app contains the following code:

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/Pages/Account/Login.cshtml.cs?name=snippet1\&highlight=22-59)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Pages/Account/Login.cshtml.cs.md)

`SignInAsync` creates an encrypted cookie and adds it to the current response. If `AuthenticationScheme` isn't specified, the default scheme is used.

[Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri) is only used on a few specific paths by default, for example, the login path and logout paths. For more information see the [CookieAuthenticationHandler source](https://github.com/dotnet/aspnetcore/blob/f2e6e6ff334176540ef0b3291122e359c2106d1a/src/Security/Authentication/Cookies/src/CookieAuthenticationHandler.cs#L334).

ASP.NET Core's [Data Protection](../data-protection/using-data-protection.md) system is used for encryption. For an app hosted on multiple machines, load balancing across apps, or using a web farm, [configure data protection](../data-protection/configuration/overview.md) to use the same key ring and app identifier.

## Sign out

To sign out the current user and delete their cookie, call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A):

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/Pages/Account/Login.cshtml.cs?name=snippet2)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Pages/Account/Login.cshtml.cs.md)

If [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) (default value: "`Cookies`") isn't used as the scheme, supply the scheme used when configuring the authentication provider. Otherwise, the default scheme is used. For example, if "`ContosoCookie`" is used as the scheme, supply the scheme used when configuring the authentication provider.

When the browser closes it automatically deletes session based cookies (non-persistent cookies), but no cookies are cleared when an individual tab is closed. The server is not notified of tab or browser close events.

## React to back-end changes

Once a cookie is created, the cookie is the single source of identity. If a user account is disabled in back-end systems:

* The app's cookie authentication system continues to process requests based on the authentication cookie.
* The user remains signed into the app as long as the authentication cookie is valid.

The [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.ValidatePrincipal%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.ValidatePrincipal%252A) event can be used to intercept and override validation of the cookie identity. Validating the cookie on every request mitigates the risk of revoked users accessing the app.

One approach to cookie validation is based on keeping track of when the user database changes. If the database hasn't been changed since the user's cookie was issued, there's no need to re-authenticate the user if their cookie is still valid. In the sample app, the database is implemented in `IUserRepository` and stores a `LastChanged` value. When a user is updated in the database, the `LastChanged` value is set to the current time.

In order to invalidate a cookie when the database changes based on the `LastChanged` value, create the cookie with a `LastChanged` claim containing the current `LastChanged` value from the database:

```csharp
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Email),
    new Claim("LastChanged", {Database Value})
};

var claimsIdentity = new ClaimsIdentity(
    claims,
    CookieAuthenticationDefaults.AuthenticationScheme);

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme, 
    new ClaimsPrincipal(claimsIdentity));
```

To implement an override for the `ValidatePrincipal` event, write a method with the following signature in a class that derives from [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents):

```csharp
ValidatePrincipal(CookieValidatePrincipalContext)
```

The following is an example implementation of `CookieAuthenticationEvents`:

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/CookieAuthenticationEvents.cs?name=snippet)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/CookieAuthenticationEvents.cs.md)

Register the events instance during cookie service registration. Provide a [scoped service registration](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) for your `CustomCookieAuthenticationEvents` class:

[Code example (complete source file; reference: cookie/samples/6.x/CookieSample/Program.cs?name=snippet_cc\&highlight=8-14)](../../../_code/aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Program.cs.md)

Consider a situation in which the user's name is updated&mdash;a decision that doesn't affect security in any way. If you want to non-destructively update the user principal, call `context.ReplacePrincipal` and set the `context.ShouldRenew` property to `true`.

> **Warning:**
> The approach described here is triggered on every request. Validating authentication cookies for all users on every request can result in a large performance penalty for the app.

## Persistent cookies

You may want the cookie to persist across browser sessions. This persistence should only be enabled with explicit user consent with a "Remember Me" checkbox on sign in or a similar mechanism. 

The following code snippet creates an identity and corresponding cookie that survives through browser closures. Any sliding expiration settings previously configured are honored. If the cookie expires while the browser is closed, the browser clears the cookie once it's restarted.

Set [Microsoft.AspNetCore.Authentication.AuthenticationProperties.IsPersistent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.IsPersistent) to `true` in [Microsoft.AspNetCore.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties):

```csharp
// using Microsoft.AspNetCore.Authentication;

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity),
    new AuthenticationProperties
    {
        IsPersistent = true
    });
```

## Absolute cookie expiration

An absolute expiration time can be set with [Microsoft.AspNetCore.Authentication.AuthenticationProperties.ExpiresUtc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.ExpiresUtc). To create a persistent cookie, `IsPersistent` must also be set. Otherwise, the cookie is created with a session-based lifetime and could expire either before or after the authentication ticket that it holds. When `ExpiresUtc` is set, it overrides the value of the [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.ExpireTimeSpan](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.ExpireTimeSpan) option of [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions), if set.

The following code snippet creates an identity and corresponding cookie that lasts for 20 minutes. This ignores any sliding expiration settings previously configured.

```csharp
// using Microsoft.AspNetCore.Authentication;

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity),
    new AuthenticationProperties
    {
        IsPersistent = true,
        ExpiresUtc = DateTime.UtcNow.AddMinutes(20)
    });
```


**Applies to: < aspnetcore-6.0**

[ASP.NET Core Identity](identity.md) is a complete, full-featured authentication provider for creating and maintaining logins. However, a cookie-based authentication provider without ASP.NET Core Identity can be used. For more information, see [security/authentication/identity](identity.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/cookie/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

For demonstration purposes in the sample app, the user account for the hypothetical user, Maria Rodriguez, is hardcoded into the app. Use the **Email** address `maria.rodriguez@contoso.com` and any password to sign in the user. The user is authenticated in the `AuthenticateUser` method in the `Pages/Account/Login.cshtml.cs` file. In a real-world example, the user would be authenticated against a database.

## Configuration

In the `Startup.ConfigureServices` method, create the authentication middleware services with the [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) and [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A) methods:

[Code example (complete source file; reference: cookie/samples/3.x/CookieSample/Startup.cs?name=snippet1)](../../../_code/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample/Startup.cs.md)

[Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) passed to `AddAuthentication` sets the default authentication scheme for the app. `AuthenticationScheme` is useful when there are multiple instances of cookie authentication and you want to [authorize with a specific scheme](../authorization/authorize-with-a-specific-scheme.md). Setting the `AuthenticationScheme` to [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) provides a value of "Cookies" for the scheme. You can supply any string value that distinguishes the scheme.

The app's authentication scheme is different from the app's cookie authentication scheme. When a cookie authentication scheme isn't provided to [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A), it uses `CookieAuthenticationDefaults.AuthenticationScheme` ("Cookies").

The authentication cookie's [Microsoft.AspNetCore.Http.CookieBuilder.IsEssential](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.CookieBuilder.IsEssential) property is set to `true` by default. Authentication cookies are allowed when a site visitor hasn't consented to data collection. For more information, see [security/gdpr#essential-cookies](https://learn.microsoft.com/search/?terms=security%2Fgdpr%23essential-cookies).

In `Startup.Configure`, call `UseAuthentication` and `UseAuthorization` to set the `HttpContext.User` property and run authorization middleware for requests. Call the `UseAuthentication` and `UseAuthorization` methods before calling `UseEndpoints`:

[Code example (complete source file; reference: cookie/samples/3.x/CookieSample/Startup.cs?name=snippet2)](../../../_code/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample/Startup.cs.md)

The [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions) class is used to configure the authentication provider options.

Set `CookieAuthenticationOptions` in the service configuration for authentication in the `Startup.ConfigureServices` method:

```csharp
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        ...
    });
```

## Cookie policy middleware

[Cookie policy middleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.CookiePolicy.CookiePolicyMiddleware) enables cookie policy capabilities. Adding the middleware to the app processing pipeline is order sensitive&mdash;it only affects downstream components registered in the pipeline, and cookie policy middleware should be added before cookie authentication middleware.

Use [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) provided to the cookie policy middleware to control global characteristics of cookie processing and hook into cookie processing handlers when cookies are appended or deleted.

The default [Microsoft.AspNetCore.Builder.CookiePolicyOptions.MinimumSameSitePolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions.MinimumSameSitePolicy) value is `SameSiteMode.Lax` to permit OAuth2 authentication. To strictly enforce a same-site policy of `SameSiteMode.Strict`, set the `MinimumSameSitePolicy`. Although this setting breaks OAuth2 and other cross-origin authentication schemes, it elevates the level of cookie security for other types of apps that don't rely on cross-origin request processing.

The following example shows how to configure cookie authentication with cookie policy middleware:

[language="csharp" source="cookie/snippets/3.x/Startup.cs" id="snippet_policy" highlight="3-5,9"::: (complete source file; reference: cookie/snippets/3.x/Startup.cs)](../../../_code/aspnetcore/security/authentication/cookie/snippets/3.x/Startup.cs.md)

The cookie policy middleware setting for `MinimumSameSitePolicy` can affect the setting of `Cookie.SameSite` in `CookieAuthenticationOptions` settings according to the matrix below.

| MinimumSameSitePolicy | Cookie.SameSite | Resultant Cookie.SameSite setting |
| --- | --- | --- |
| SameSiteMode.None | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict |
| SameSiteMode.Lax | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.Lax<br>SameSiteMode.Lax<br>SameSiteMode.Strict |
| SameSiteMode.Strict | SameSiteMode.None<br>SameSiteMode.Lax<br>SameSiteMode.Strict | SameSiteMode.Strict<br>SameSiteMode.Strict<br>SameSiteMode.Strict |

## Create an authentication cookie

To create a cookie holding user information, construct a [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal). The user information is serialized and stored in the cookie. 

Create a [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) with any required [System.Security.Claims.Claim](https://learn.microsoft.com/search/?terms=System.Security.Claims.Claim)s and call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%252A) to sign in the user:

[Code example (complete source file; reference: cookie/samples/3.x/CookieSample/Pages/Account/Login.cshtml.cs?name=snippet1)](../../../_code/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample/Pages/Account/Login.cshtml.cs.md)

`SignInAsync` creates an encrypted cookie and adds it to the current response. If `AuthenticationScheme` isn't specified, the default scheme is used.

[Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri) is only used on a few specific paths by default, for example, the login path and logout paths. For more information see the [CookieAuthenticationHandler source](https://github.com/dotnet/aspnetcore/blob/f2e6e6ff334176540ef0b3291122e359c2106d1a/src/Security/Authentication/Cookies/src/CookieAuthenticationHandler.cs#L334).

ASP.NET Core's [Data Protection](../data-protection/using-data-protection.md) system is used for encryption. For an app hosted on multiple machines, load balancing across apps, or using a web farm, [configure data protection](../data-protection/configuration/overview.md) to use the same key ring and app identifier.

## Sign out

To sign out the current user and delete their cookie, call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A):

[Code example (complete source file; reference: cookie/samples/3.x/CookieSample/Pages/Account/Login.cshtml.cs?name=snippet2)](../../../_code/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample/Pages/Account/Login.cshtml.cs.md)

If [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) (default value: "`Cookies`") isn't used as the scheme, supply the scheme used when configuring the authentication provider. Otherwise, the default scheme is used. For example, if "`ContosoCookie`" is used as the scheme, supply the scheme used when configuring the authentication provider.

When the browser closes it automatically deletes session based cookies (non-persistent cookies), but no cookies are cleared when an individual tab is closed. The server is not notified of tab or browser close events.

## React to back-end changes

Once a cookie is created, the cookie is the single source of identity. If a user account is disabled in back-end systems:

* The app's cookie authentication system continues to process requests based on the authentication cookie.
* The user remains signed into the app as long as the authentication cookie is valid.

The [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.ValidatePrincipal%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.ValidatePrincipal%252A) event can be used to intercept and override validation of the cookie identity. Validating the cookie on every request mitigates the risk of revoked users accessing the app.

One approach to cookie validation is based on keeping track of when the user database changes. If the database hasn't been changed since the user's cookie was issued, there's no need to re-authenticate the user if their cookie is still valid. In the sample app, the database is implemented in `IUserRepository` and stores a `LastChanged` value. When a user is updated in the database, the `LastChanged` value is set to the current time.

In order to invalidate a cookie when the database changes based on the `LastChanged` value, create the cookie with a `LastChanged` claim containing the current `LastChanged` value from the database:

```csharp
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Email),
    new Claim("LastChanged", {Database Value})
};

var claimsIdentity = new ClaimsIdentity(
    claims, 
    CookieAuthenticationDefaults.AuthenticationScheme);

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme, 
    new ClaimsPrincipal(claimsIdentity));
```

To implement an override for the `ValidatePrincipal` event, write a method with the following signature in a class that derives from [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents):

```csharp
ValidatePrincipal(CookieValidatePrincipalContext)
```

The following is an example implementation of `CookieAuthenticationEvents`:

```csharp
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

public class CustomCookieAuthenticationEvents : CookieAuthenticationEvents
{
    private readonly IUserRepository _userRepository;

    public CustomCookieAuthenticationEvents(IUserRepository userRepository)
    {
        // Get the database from registered DI services.
        _userRepository = userRepository;
    }

    public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
    {
        var userPrincipal = context.Principal;

        // Look for the LastChanged claim.
        var lastChanged = (from c in userPrincipal.Claims
                           where c.Type == "LastChanged"
                           select c.Value).FirstOrDefault();

        if (string.IsNullOrEmpty(lastChanged) ||
            !_userRepository.ValidateLastChanged(lastChanged))
        {
            context.RejectPrincipal();

            await context.HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
```

Register the events instance during cookie service registration in the `Startup.ConfigureServices` method. Provide a [scoped service registration](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes) for your `CustomCookieAuthenticationEvents` class:

```csharp
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.EventsType = typeof(CustomCookieAuthenticationEvents);
    });

services.AddScoped<CustomCookieAuthenticationEvents>();
```

Consider a situation in which the user's name is updated&mdash;a decision that doesn't affect security in any way. If you want to non-destructively update the user principal, call `context.ReplacePrincipal` and set the `context.ShouldRenew` property to `true`.

> **Warning:**
> The approach described here is triggered on every request. Validating authentication cookies for all users on every request can result in a large performance penalty for the app.

## Persistent cookies

You may want the cookie to persist across browser sessions. This persistence should only be enabled with explicit user consent with a "Remember Me" checkbox on sign in or a similar mechanism. 

The following code snippet creates an identity and corresponding cookie that survives through browser closures. Any sliding expiration settings previously configured are honored. If the cookie expires while the browser is closed, the browser clears the cookie once it's restarted.

Set [Microsoft.AspNetCore.Authentication.AuthenticationProperties.IsPersistent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.IsPersistent) to `true` in [Microsoft.AspNetCore.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties):

```csharp
// using Microsoft.AspNetCore.Authentication;

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity),
    new AuthenticationProperties
    {
        IsPersistent = true
    });
```

## Absolute cookie expiration

An absolute expiration time can be set with [Microsoft.AspNetCore.Authentication.AuthenticationProperties.ExpiresUtc](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationProperties.ExpiresUtc). To create a persistent cookie, `IsPersistent` must also be set. Otherwise, the cookie is created with a session-based lifetime and could expire either before or after the authentication ticket that it holds. When `ExpiresUtc` is set, it overrides the value of the [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.ExpireTimeSpan](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.ExpireTimeSpan) option of [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions), if set.

The following code snippet creates an identity and corresponding cookie that lasts for 20 minutes. This ignores any sliding expiration settings previously configured.

```csharp
// using Microsoft.AspNetCore.Authentication;

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity),
    new AuthenticationProperties
    {
        IsPersistent = true,
        ExpiresUtc = DateTime.UtcNow.AddMinutes(20)
    });
```
