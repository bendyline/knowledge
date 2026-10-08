---
title: Breaking changes in ASP.NET Core 10
titleSuffix: ""
description: Navigate to the breaking changes in ASP.NET Core 10.
ms.date: 09/09/2025
ai-usage: ai-assisted
no-loc: [Razor]
---
# Breaking changes in ASP.NET Core 10

If you're migrating an app to ASP.NET Core 10, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.


| Title | Type of change |
| --- | --- |
| [Cookie login redirects disabled for known API endpoints](cookie-authentication-api-endpoints.md) | Behavioral change |
| [Deprecation of WithOpenApi extension method](withopenapi-deprecated.md) | Source incompatible |
| [Exception diagnostics suppressed when TryHandleAsync returns true](exception-handler-diagnostics-suppressed.md) | Behavioral change |
| [IActionContextAccessor and ActionContextAccessor are obsolete](iactioncontextaccessor-obsolete.md) | Source incompatible/behavioral change |
| [IncludeOpenAPIAnalyzers property and MVC API analyzers are deprecated](openapi-analyzers-deprecated.md) | Source incompatible |
| [IPNetwork and ForwardedHeadersOptions.KnownNetworks are obsolete](ipnetwork-knownnetworks-obsolete.md) | Source incompatible |
| [Microsoft.Extensions.ApiDescription.Client package deprecated](apidescription-client-deprecated.md) | Source incompatible |
| [Razor runtime compilation is obsolete](razor-runtime-compilation-obsolete.md) | Source incompatible |
| [WebHostBuilder, IWebHost, and WebHost are obsolete](webhostbuilder-deprecated.md) | Source incompatible |
