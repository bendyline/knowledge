---
title: Introduction to authorization in ASP.NET Core
ai-usage: ai-assisted
author: wadepickett
description: Learn the basics of authorization and how authorization works in ASP.NET Core apps.
ms.author: wpickett
ms.date: 09/18/2026
uid: security/authorization/introduction
---
# Introduction to authorization in ASP.NET Core

Authorization refers to the process that determines what a user is able to do. For example, an administrative user is allowed to create a document library, add documents, edit documents, and delete them. A nonadministrative user working with the library is only authorized to read the documents.

Authorization is separate and distinct from authentication. However, authorization relies on an authentication mechanism. Authentication is the process of verifying a user's identity, which might result in the creation of one or more identity objects for the user.

Configuring authentication doesn't automatically restrict access to endpoints. To [require authenticated users by default](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication) in a server-side app, configure a fallback authorization policy. For information about how authorization metadata selects named, default, and fallback policies, see [security/authorization/policies#default-and-fallback-policies](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies).

For more information about authentication in ASP.NET Core, see [security/authentication/index](../authentication/index.md).

## Authorization types

ASP.NET Core authorization provides a simple declarative [role](roles.md) and a rich [policy-based](policies.md) model. Authorization is expressed in requirements, and handlers evaluate a user's claims against requirements. Imperative checks can be based on simple policies or policies that evaluate both the user identity and properties of the resource that the user is attempting to access.

## Namespaces

Authorization components, including the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) and [`[AllowAnonymous]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute), are defined in the [Microsoft.AspNetCore.Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization) namespace.

For more information, see [security/authorization/simple](simple.md).

## Additional resources

* [fundamentals/minimal-apis/security](../../fundamentals/minimal-apis/security.md)
* [blazor/security/index](../../blazor/security/index.md)
* [razor-pages/security/authorization/conventions](../../razor-pages/security/authorization/conventions.md)
* Blazor app authorization patterns
  * [Server-side Blazor (Blazor Web Apps, Blazor Server apps)](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23server-side-blazor-app-authorization-patterns)
  * [Blazor WebAssembly](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Findex%23blazor-webassembly-authorization-patterns)
