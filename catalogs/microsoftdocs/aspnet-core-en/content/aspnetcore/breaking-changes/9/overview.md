---
title: Breaking changes in ASP.NET Core 9
titleSuffix: ""
description: Navigate to the breaking changes in ASP.NET Core 9.
ms.date: 03/26/2025
no-loc: [Blazor, Razor, Kestrel]
---
# Breaking changes in ASP.NET Core 9

If you're migrating an app to ASP.NET Core 9, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.


| Title | Type of change |
| --- | --- |
| [DefaultKeyResolution.ShouldGenerateNewKey altered meaning](key-resolution.md) | Behavioral change |
| [Dev cert export no longer creates folder](certificate-export.md) | Behavioral change |
| [Forwarded headers middleware ignores X-Forwarded-* headers from unknown proxies](../8/forwarded-headers-unknown-proxies.md) | Behavioral change |
| [HostBuilder enables ValidateOnBuild/ValidateScopes in development environment](hostbuilder-validation.md) | Behavioral change |
| [Legacy Mono and Emscripten APIs not exported to global namespace](legacy-apis.md) | Source incompatible |
| [Middleware types with multiple constructors](middleware-constructors.md) | Behavioral change |
