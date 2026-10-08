---
title: "Breaking change: ISystemClock is obsolete"
description: Learn about the breaking change in ASP.NET Core 8.0 where ISystemClock and constructors that use it have been marked obsolete.
ms.date: 05/30/2023
ms.custom: https://github.com/aspnet/Announcements/issues/505
---
# ISystemClock is obsolete

[Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) has been used by ASP.NET Core's authentication and identity components since version 1.0 to enable unit testing of time-related functionality, like expiration checking. .NET 8 includes a suitable abstraction, [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider), that provides the same functionality and much more. We're taking this opportunity to obsolete [Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) and replace it with [System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) throughout the ASP.NET Core libraries.

## Version introduced

ASP.NET Core 8.0 Preview 5

## Previous behavior

[Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) was injected into the constructors of the authentication and identity components by dependency injection (DI) and could be overridden for testing.

The default [Microsoft.AspNetCore.Authentication.SystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.SystemClock) implementation truncated to the nearest second for easier formatting.

## New behavior

[Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock), [Microsoft.AspNetCore.Authentication.SystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.SystemClock), and the authentication handler constructors that have an [Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) parameter have been marked obsolete. Using these APIs in code will generate a warning at compile time.

[Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) remains in the dependency injection container but is no longer used. It may be removed from the container in a future version.

[System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) is now a settable property on the `Options` classes for the authentication and identity components. It can be set directly or by registering a provider in the dependency injection container.

[System.TimeProvider](https://learn.microsoft.com/search/?terms=System.TimeProvider) does not truncate to the nearest second. Consumers are expected to correctly format the time as needed.

## Type of breaking change

This change affects [source compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#source-compatibility).

## Reason for change

This change was made to unify time abstraction across the stack for easier testing.

## Recommended action

If you have components that derive from [Microsoft.AspNetCore.Authentication.AuthenticationHandler%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHandler%25601) or [Microsoft.AspNetCore.Identity.SecurityStampValidator%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SecurityStampValidator%25601), remove the [Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock) constructor parameter and call the new base constructor accordingly.

```diff
- public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
-     : base(options, logger, encoder, clock)
+ public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder)
+     : base(options, logger, encoder)
```

Similarly, derived implementations that reference the `Clock` property on these types should reference the new `TimeProvider` property instead.

```diff
- var currentUtc = Clock.UtcNow;
+ var currentUtc = TimeProvider.GetUtcNow();
```

You can set `TimeProvider` for testing on the options or via DI.

## Affected APIs

- [Microsoft.AspNetCore.Authentication.ISystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ISystemClock)
- [Microsoft.AspNetCore.Authentication.SystemClock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.SystemClock)
- [Microsoft.AspNetCore.Authentication.AuthenticationHandler%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHandler%25601)
- [Microsoft.AspNetCore.Authentication.AuthenticationHandler%601.Clock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHandler%25601.Clock)
- [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.Facebook.FacebookHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Facebook.FacebookOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Facebook.FacebookHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.Facebook.FacebookOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.Google.GoogleHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Google.GoogleOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Google.GoogleHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.Google.GoogleOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.Negotiate.NegotiateHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Negotiate.NegotiateOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Negotiate.NegotiateHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.Negotiate.NegotiateOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%601.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{%600},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%25601.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7B%25600%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.HtmlEncoder,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.HtmlEncoder%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.PolicySchemeHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.PolicySchemeOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.PolicySchemeHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.PolicySchemeOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.RemoteAuthenticationHandler%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationHandler%25601)
- [Microsoft.AspNetCore.Authentication.SignInAuthenticationHandler%601.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{%600},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.SignInAuthenticationHandler%25601.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7B%25600%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.SignOutAuthenticationHandler%601.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{%600},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.SignOutAuthenticationHandler%25601.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7B%25600%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.Twitter.TwitterHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Twitter.TwitterOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Twitter.TwitterHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.Twitter.TwitterOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Authentication.WsFederation.WsFederationHandler.%23ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.WsFederation.WsFederationHandler.%2523ctor(Microsoft.Extensions.Options.IOptionsMonitor%7BMicrosoft.AspNetCore.Authentication.WsFederation.WsFederationOptions%7D%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Text.Encodings.Web.UrlEncoder%2CMicrosoft.AspNetCore.Authentication.ISystemClock))
- [Microsoft.AspNetCore.Identity.SecurityStampValidator%601.%23ctor(Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions},Microsoft.AspNetCore.Identity.SignInManager{%600},Microsoft.AspNetCore.Authentication.ISystemClock,Microsoft.Extensions.Logging.ILoggerFactory)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SecurityStampValidator%25601.%2523ctor(Microsoft.Extensions.Options.IOptions%7BMicrosoft.AspNetCore.Identity.SecurityStampValidatorOptions%7D%2CMicrosoft.AspNetCore.Identity.SignInManager%7B%25600%7D%2CMicrosoft.AspNetCore.Authentication.ISystemClock%2CMicrosoft.Extensions.Logging.ILoggerFactory))
- [Microsoft.AspNetCore.Identity.SecurityStampValidator%601.Clock](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SecurityStampValidator%25601.Clock)
- [Microsoft.AspNetCore.Identity.TwoFactorSecurityStampValidator%601.%23ctor(Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions},Microsoft.AspNetCore.Identity.SignInManager{%600},Microsoft.AspNetCore.Authentication.ISystemClock,Microsoft.Extensions.Logging.ILoggerFactory)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TwoFactorSecurityStampValidator%25601.%2523ctor(Microsoft.Extensions.Options.IOptions%7BMicrosoft.AspNetCore.Identity.SecurityStampValidatorOptions%7D%2CMicrosoft.AspNetCore.Identity.SignInManager%7B%25600%7D%2CMicrosoft.AspNetCore.Authentication.ISystemClock%2CMicrosoft.Extensions.Logging.ILoggerFactory))
