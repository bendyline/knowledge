---
title: View-based authorization in ASP.NET Core MVC
ai-usage: ai-assisted
author: wadepickett
description: This document demonstrates how to inject and utilize the authorization service inside of an ASP.NET Core Razor view.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/22/2026
uid: mvc/security/authorization/views
---
# View-based authorization in ASP.NET Core MVC

A developer often wants to show, hide, or otherwise modify a UI based on the current user identity. Access the authorization service within MVC views via [dependency injection](../../../fundamentals/dependency-injection.md). To inject the authorization service ([Microsoft.AspNetCore.Authorization.IAuthorizationService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationService)) into a Razor view, use the `@inject` directive:

```razor
@using Microsoft.AspNetCore.Authorization
@inject IAuthorizationService AuthService
```

To inject the authorization service into every view, place the `@inject` directive in the `Views/_ViewImports.cshtml` file. For more information, see [mvc/views/dependency-injection](../../views/dependency-injection.md).

Use the injected authorization service to invoke [Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%252A) in exactly the same way an app would check authorization during [resource-based authorization](https://learn.microsoft.com/search/?terms=mvc%2Fsecurity%2Fauthorization%2Fresource-based%23use-imperative-authorization):

```razor
@if ((await AuthService.AuthorizeAsync(User, "PolicyName")).Succeeded)
{
    <p>This paragraph is displayed because you fulfilled PolicyName.</p>
}
```

In some cases, the resource is the view model. Invoke [Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%252A) in exactly the same way the app would check authorization during [resource-based authorization](https://learn.microsoft.com/search/?terms=mvc%2Fsecurity%2Fauthorization%2Fresource-based%23use-imperative-authorization). The model is passed as a resource for the policy's evaluation:

```razor
@if ((await AuthService.AuthorizeAsync(User, Model, Operations.Edit)).Succeeded)
{
    <p><a class="btn btn-default" role="button"
        href="@Url.Action("Edit", "Document", new { id = Model.Id })">Edit</a></p>
}
```

> **Warning:**
> Don't rely on toggling the visibility of the app's UI elements as the sole authorization check. Hiding a UI element may not completely prevent access to its associated controller action. For example, consider the button in the preceding code snippet. A user can invoke the `Edit` action method if they know the relative resource URL is `/Document/Edit/1`. For this reason, the `Edit` action method should perform its own authorization check.
