---
title: Breaking changes in ASP.NET Core 8
titleSuffix: ""
description: Navigate to the breaking changes in ASP.NET Core 8.
ms.date: 04/10/2025
no-loc: [Blazor, Razor, Kestrel]
---
# Breaking changes in ASP.NET Core 8

If you're migrating an app to ASP.NET Core 8, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.


| Title | Type of change |
| --- | --- |
| [ConcurrencyLimiterMiddleware is obsolete](concurrencylimitermiddleware-obsolete.md) | Source incompatible |
| [Custom converters for serialization removed](problemdetails-custom-converters.md) | Behavioral change |
| [Forwarded headers middleware ignores X-Forwarded-* headers from unknown proxies](forwarded-headers-unknown-proxies.md) | Behavioral change |
| [HTTP logging middleware requires AddHttpLogging()](httplogging-addhttplogging-requirement.md) | Behavioral change |
| [ISystemClock is obsolete](isystemclock-obsolete.md) | Source incompatible |
| [Minimal APIs: IFormFile parameters require anti-forgery checks](antiforgery-checks.md) | Behavioral change |
| [Rate-limiting middleware requires AddRateLimiter](addratelimiter-requirement.md) | Behavioral change |
| [Security token events return a JsonWebToken](securitytoken-events.md) | Behavioral change |
| [TrimMode defaults to full for Web SDK projects](trimmode-full.md) | Source incompatible |
