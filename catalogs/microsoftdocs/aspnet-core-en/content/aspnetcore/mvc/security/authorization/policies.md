---
title: Policy-based authorization in ASP.NET Core MVC
ai-usage: ai-assisted
author: wadepickett
description: Learn how to create and use authorization policy handlers for enforcing authorization requirements in an ASP.NET Core MVC app.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/21/2026
uid: mvc/security/authorization/policies
---
# Policy-based authorization in ASP.NET Core MVC

This article provides additional MVC policy-based authorization scenarios following [security/authorization/policies](../../../security/authorization/policies.md), which should be read before this article when learning about policy-based authorization.

## Apply policies to MVC controllers

Apply policies to controllers using the `[Authorize]` attribute with the policy name:

**Applies to: \>= aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Controllers/AtLeast21Controller.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/security/authorization/policies.md)

If multiple policies are applied at the controller and action levels, ***all*** policies must pass before access is granted:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Controllers/AtLeast21Controller2.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Controllers/AlcoholPurchaseController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/security/authorization/policies.md)



## Access MVC request context in handlers

The [Microsoft.AspNetCore.Authorization.AuthorizationHandler%601.HandleRequirementAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandler%25601.HandleRequirementAsync%252A) method has two parameters: an [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext) and the `TRequirement` being handled. Frameworks such as MVC or SignalR are free to add any object to the [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%252A) property to pass extra information.

When using endpoint routing, authorization is typically handled by the Authorization Middleware, and the [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%252A) property is an instance of [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext). The context is used to access the current endpoint, which can be used to probe the underlying resource to which you're routing:

```csharp
if (context.Resource is HttpContext httpContext)
{
    var endpoint = httpContext.GetEndpoint();
    var actionDescriptor = 
        endpoint?.Metadata.GetMetadata<ControllerActionDescriptor>();
    ...
}
```

With traditional routing, or when authorization happens as part of MVC's authorization filter, the value of [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%252A) is an [Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext) instance. This property provides access to [Microsoft.AspNetCore.Http.HttpContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext), [Microsoft.AspNetCore.Routing.RouteData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.RouteData), and everything else provided by MVC and Razor Pages.

The use of the [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource%252A) property is framework-specific. Using information in the property limits your authorization policies to particular frameworks. Cast the property using the `is` keyword, and then confirm the cast has succeeded to ensure your code doesn't crash with an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) when run on other frameworks. When the cast succeeds, examine MVC-specific data, such as routing data:

```csharp
using Microsoft.AspNetCore.Mvc.Filters;

...

if (context.Resource is AuthorizationFilterContext mvcContext)
{
    var routeValues = mvcContext.RouteData.Values;
    ...
}
```

> **Note:**
> Endpoint routing passes [Microsoft.AspNetCore.Routing.RouteEndpoint](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.RouteEndpoint) to authorization handlers, unlike traditional routing in MVC apps, which use an authorization handler context resource of type [Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext). If the app uses MVC authorization filters along with endpoint routing authorization, it may be necessary to handle both types of resources.
