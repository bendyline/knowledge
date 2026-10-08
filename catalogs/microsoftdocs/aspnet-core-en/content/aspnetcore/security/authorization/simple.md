---
title: Simple authorization in ASP.NET Core
ai-usage: ai-assisted
author: tdykstra
description: Learn how to use the [Authorize] attribute to restrict access in ASP.NET Core apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 09/18/2026
uid: security/authorization/simple
---
# Simple authorization in ASP.NET Core

Authorization in ASP.NET Core is controlled with the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) and its various parameters. In its most basic form, applying the `[Authorize]` attribute to a Razor component, controller, action, or Razor Page, limits access to that component to authenticated users.

This article uses Blazor Razor component examples and focuses on Blazor authorization scenarios. For Razor Pages and MVC guidance, see the following resources after reading this article:

* [razor-pages/security/authorization/simple](../../razor-pages/security/authorization/simple.md)
* [mvc/security/authorization/simple](../../mvc/security/authorization/simple.md)

## `[Authorize]` attribute

In Blazor apps, specify the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) at the top of a Razor component file (`.razor`). In the following example, only authenticated users can access the page:

```razor
@page "/"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]

You can only see this if you're signed in.
```

> **Important:**
> Only use the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) on `@page` components reached via the Blazor router. Authorization is only performed as an aspect of routing and *not* for child components rendered within a page. To authorize the display of specific parts within a page, use an [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component instead, which is described in [blazor/security/index#authorizeview-component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component).

The [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) can also be applied to all of the Razor components in a Blazor app or a subset of Razor components in a folder using an imports file (`_Imports.razor`). Add an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive for the [Microsoft.AspNetCore.Authorization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization) namespace with an [`@attribute`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attribute) directive for the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorize-attribute):

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
```

The [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) also supports role-based or policy-based authorization. For role-based authorization, use the [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles) parameter. In the following example, the user can only access the page if they're in the `Admin` or `Superuser` role:

```razor
@page "/"
@attribute [Authorize(Roles = "Admin, Superuser")]

<p>You can only see this if you're in the 'Admin' or 'Superuser' role.</p>
```

For policy-based authorization, use the [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy) parameter. In the following example, the user can only access the page if they satisfy the requirements of the `Over21` [authorization policy](policies.md):

```razor
@page "/"
@attribute [Authorize(Policy = "Over21")]

<p>You can only see this if you satisfy the 'Over21' policy.</p>
```

If neither [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles) nor [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy) is specified, [`[Authorize]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

Endpoints without authorization metadata don't use the default policy. Such endpoints don't require authorization unless the app configures a fallback policy. For a comparison of named, default, and fallback policies, see [security/authorization/policies#default-and-fallback-policies](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies).

When the user isn't authorized and if the app doesn't [customize unauthorized content with the `Router` component](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23customize-unauthorized-content-with-the-router-component), the framework automatically displays the following fallback message:

```html
Not authorized.
```

For more information on Blazor authentication and authorization, see [blazor/security/index](../../blazor/security/index.md).

Use the [`[AllowAnonymous]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute) to allow access by non-authenticated users to individual actions:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [AllowAnonymous]
```

For server-side apps where most endpoints require authentication, see [Require global user authentication](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication).

## Additional resources

* [razor-pages/security/authorization/simple](../../razor-pages/security/authorization/simple.md)
* [mvc/security/authorization/simple](../../mvc/security/authorization/simple.md)
