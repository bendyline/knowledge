---
title: Facebook, Google, and external provider authentication without ASP.NET Core Identity
author: serpent5
description: Use Facebook, Google, Twitter, etc. account user authentication without ASP.NET Core Identity.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 04/09/2026
uid: security/authentication/social/social-without-identity
---
# Use social sign-in provider authentication without ASP.NET Core Identity

By [Kirk Larkin](https://twitter.com/serpent5) and [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-6.0**

[security/authentication/social/index](index.md) describes how to enable users to sign in using OAuth 2.0 with credentials from external authentication providers. The approach described in that article includes ASP.NET Core Identity as an authentication provider.

This sample demonstrates how to use an external authentication provider **without** ASP.NET Core Identity. This approach is useful for apps that don't require all of the features of ASP.NET Core Identity, but still require integration with a trusted external authentication provider.

This sample uses [Google authentication](google-logins.md) for authenticating users. Using Google authentication shifts many of the complexities of managing the sign-in process to Google. To integrate with a different external authentication provider, see the following articles:

* [Facebook authentication](facebook-logins.md)
* [Microsoft authentication](microsoft-logins.md)
* [Twitter authentication](twitter-logins.md)
* [Other providers](other-logins.md)

## Configuration

In `Program.cs`, configure the app's authentication schemes with the [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A), [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A), and [Microsoft.Extensions.DependencyInjection.GoogleExtensions.AddGoogle%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.GoogleExtensions.AddGoogle%252A) methods:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs" id="snippet_AddAuthentication"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs.md)

The call to [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) sets the app's [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme). The `DefaultScheme` is the default scheme used by the following `HttpContext` authentication extension methods:

* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ChallengeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ChallengeAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ForbidAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ForbidAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A)

Setting the app's `DefaultScheme` to [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) ("Cookies") configures the app to use Cookies as the default scheme for these extension methods. Setting the app's [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultChallengeScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultChallengeScheme) to `Google.Apis.Auth.AspNetCore3.GoogleOpenIdConnectDefaults.AuthenticationScheme` ("`GoogleOpenIdConnect`") configures the app to use Google as the default scheme for calls to `ChallengeAsync`. `DefaultChallengeScheme` overrides `DefaultScheme`. See [Microsoft.AspNetCore.Authentication.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions) for more properties that override `DefaultScheme` when set.

In `Program.cs`, call [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). This middleware combination sets the [Microsoft.AspNetCore.Http.HttpContext.User%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User%252A) property and runs the authorization middleware for requests:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs" id="snippet_UseAuthentication" highlight="4-5"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Program.cs.md)

To learn more about authentication schemes, see [Authentication Concepts](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Findex%23authentication-concepts). To learn more about cookie authentication, see [security/authentication/cookie](../cookie.md).

## Apply authorization

Test the app's authentication configuration by applying the [\[Authorize\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) attribute to a controller, action, or page. The following code limits access to the *Privacy* page to users that have been authenticated:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Privacy.cshtml.cs" id="snippet_Class" highlight="1"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Privacy.cshtml.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Privacy.cshtml.cs.md)

## Save the access token

[Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens%252A) defines whether access and refresh tokens should be stored in the [Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties) after a successful authorization. `SaveTokens` is set to `false` by default to reduce the size of the final authentication cookie.

To save access and refresh tokens after a successful authorization, set `SaveTokens` to `true` in `Program.cs`:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Program.cs" id="snippet_SaveTokens" highlight="12"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Program.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Program.cs.md)

To retrieve a saved token, use [Microsoft.AspNetCore.Authentication.AuthenticationTokenExtensions.GetTokenAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationTokenExtensions.GetTokenAsync%252A). The following example retrieves the token named `access_token`:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Pages/Privacy.cshtml.cs" id="snippet_OnGetAsync" highlight="3-4"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Pages/Privacy.cshtml.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Pages/Privacy.cshtml.cs.md)

## Sign out

To sign out the current user and delete their cookie, call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A). The following code adds a `Logout` page handler to the *Index* page:

[language="csharp" source="social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Index.cshtml.cs" id="snippet_Class"::: (complete source file; reference: social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Index.cshtml.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Pages/Index.cshtml.cs.md)

Notice that the call to `SignOutAsync` doesn't specify an authentication scheme. The app uses the `DefaultScheme`, `CookieAuthenticationDefaults.AuthenticationScheme`, as a fallback.

## Additional resources

* [security/authorization/simple](../../authorization/simple.md)
* [security/authentication/social/additional-claims](additional-claims.md)



**Applies to: < aspnetcore-6.0**

[security/authentication/social/index](index.md) describes how to enable users to sign in using OAuth 2.0 with credentials from external authentication providers. The approach described in that article includes ASP.NET Core Identity as an authentication provider.

This sample demonstrates how to use an external authentication provider **without** ASP.NET Core Identity. This approach is useful for apps that don't require all of the features of ASP.NET Core Identity, but still require integration with a trusted external authentication provider.

This sample uses [Google authentication](google-logins.md) for authenticating users. Using Google authentication shifts many of the complexities of managing the sign-in process to Google. To integrate with a different external authentication provider, see the following articles:

* [Facebook authentication](facebook-logins.md)
* [Microsoft authentication](microsoft-logins.md)
* [Twitter authentication](twitter-logins.md)
* [Other providers](other-logins.md)

## Configuration

In the `ConfigureServices` method, configure the app's authentication schemes with the [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A), [Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie%252A), and [Microsoft.Extensions.DependencyInjection.GoogleExtensions.AddGoogle%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.GoogleExtensions.AddGoogle%252A) methods:

[language="csharp" source="social-without-identity/samples_snapshot/3.x/Startup.cs" id="snippet_ConfigureServices"::: (complete source file; reference: social-without-identity/samples_snapshot/3.x/Startup.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples_snapshot/3.x/Startup.cs.md)

The call to [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) sets the app's [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme). The `DefaultScheme` is the default scheme used by the following `HttpContext` authentication extension methods:

* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ChallengeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ChallengeAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ForbidAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ForbidAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync%252A)
* [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A)

Setting the app's `DefaultScheme` to [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme) ("Cookies") configures the app to use Cookies as the default scheme for these extension methods. Setting the app's [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultChallengeScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultChallengeScheme) to [Microsoft.AspNetCore.Authentication.Google.GoogleDefaults.AuthenticationScheme](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Google.GoogleDefaults.AuthenticationScheme) ("Google") configures the app to use Google as the default scheme for calls to `ChallengeAsync`. `DefaultChallengeScheme` overrides `DefaultScheme`. See [Microsoft.AspNetCore.Authentication.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions) for more properties that override `DefaultScheme` when set.

In `Startup.Configure`, call [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) between calling [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) and [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A). This middleware combination sets the [Microsoft.AspNetCore.Http.HttpContext.User%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User%252A) property and runs the authorization middleware for requests:

[language="csharp" source="social-without-identity/samples_snapshot/3.x/Startup.cs" id="snippet_UseAuthentication" highlight="3-4"::: (complete source file; reference: social-without-identity/samples_snapshot/3.x/Startup.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples_snapshot/3.x/Startup.cs.md)

To learn more about authentication schemes, see [Authentication Concepts](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Findex%23authentication-concepts). To learn more about cookie authentication, see [security/authentication/cookie](../cookie.md).

## Apply authorization

Test the app's authentication configuration by applying the [\[Authorize\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) attribute to a controller, action, or page. The following code limits access to the *Privacy* page to users that have been authenticated:

[language="csharp" source="social-without-identity/samples_snapshot/3.x/Pages/Privacy.cshtml.cs" id="snippet_Class" highlight="1"::: (complete source file; reference: social-without-identity/samples_snapshot/3.x/Pages/Privacy.cshtml.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples_snapshot/3.x/Pages/Privacy.cshtml.cs.md)

## Sign out

To sign out the current user and delete their cookie, call [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync%252A). The following code adds a `Logout` page handler to the *Index* page:

[language="csharp" source="social-without-identity/samples_snapshot/3.x/Pages/Index.cshtml.cs" id="snippet_Class" highlight="3-7"::: (complete source file; reference: social-without-identity/samples_snapshot/3.x/Pages/Index.cshtml.cs)](../../../../_code/aspnetcore/security/authentication/social/social-without-identity/samples_snapshot/3.x/Pages/Index.cshtml.cs.md)

Notice that the call to `SignOutAsync` doesn't specify an authentication scheme. The app's `DefaultScheme` of `CookieAuthenticationDefaults.AuthenticationScheme` is used as a fallback.

## Additional resources

* [security/authorization/simple](../../authorization/simple.md)
* [security/authentication/social/additional-claims](additional-claims.md)
