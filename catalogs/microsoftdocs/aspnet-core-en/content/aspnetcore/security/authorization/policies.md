---
title: Policy-based authorization in ASP.NET Core
ai-usage: ai-assisted
author: wadepickett
description: Learn how to require authenticated users by default and create, select, and use authorization policies in an ASP.NET Core app.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/18/2026
uid: security/authorization/policies
---
# Policy-based authorization in ASP.NET Core

An ASP.NET Core authorization policy is a set of one or more authorization requirements that the framework evaluates to decide whether a user is allowed to access a resource. A policy can be registered with a name and applied to resources that require it.

This article explains:

* How to require authenticated users by default.
* How to create requirements.
* How to register and apply policies.
* How named, default, and fallback policies are selected.
* Authorization handlers for single and multiple requirement evaluation.
* How multiple requirements in a single policy are evaluated.

A named policy is applied with `[Authorize(Policy = "...")]` (Razor components, pages, and controllers) or `RequireAuthorization(...)` (endpoints), and the framework uses handlers to evaluate the requirements behind a policy. [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider) ([security/authorization/custom-authorization-policy-providers](custom-authorization-policy-providers.md) documentation) generates policies dynamically instead of registering them at app startup.

[Role-based authorization](roles.md) and [claims-based authorization](claims.md) use a requirement, a requirement handler, and a preconfigured authorization policy. These building blocks support the expression of authorization evaluations in code.

This article uses Razor component examples and focuses on [Blazor](../../blazor/index.md) authorization scenarios for ASP.NET Core 3.1 or later. For Razor Pages and MVC guidance that applies to all releases of ASP.NET Core, see the following resources after reading this article:

* [razor-pages/security/authorization/policies](../../razor-pages/security/authorization/policies.md)
* [mvc/security/authorization/policies](../../mvc/security/authorization/policies.md)

Some examples in this article (ASP.NET Core 8.0 or later) use *primary constructors*, available in C# 12 (.NET 8) or later. For more information, see [Declare primary constructors for classes and structs (C# documentation tutorial)](https://learn.microsoft.com/dotnet/csharp/whats-new/tutorials/primary-constructors) and [Primary constructors (C# Guide)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/instance-constructors#primary-constructors).

## Require global user authentication

For a server-side app where most or all endpoints require authentication, set a fallback policy that requires an authenticated user. This secure-by-default approach protects newly added endpoints that don't specify authorization metadata.

The fallback policy, not the default policy, applies to endpoints that don't specify authorization metadata. The default policy applies when an endpoint selects it with `[Authorize]` or `RequireAuthorization()` without a policy name. For complete policy selection rules, see the [Default and fallback policies](#default-and-fallback-policies) section.

**Applies to: \>= aspnetcore-7.0**

```csharp
var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(requireAuthPolicy);
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices`:

```csharp
services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
```



Apply `[AllowAnonymous]` or call `AllowAnonymous()` for endpoints that are intentionally public.

The fallback policy applies to requests processed by the authorization middleware. For example:

* A request that doesn't match an endpoint uses the fallback policy if the authorization middleware runs for the request.
* Static files served by static file middleware before the authorization middleware aren't protected by the fallback policy.
* Public endpoints can depend on static assets that must also allow anonymous access.

For more information, see [Static files in ASP.NET Core](https://learn.microsoft.com/search/?terms=fundamentals%2Fstatic-files%23static-file-authorization) and [Server-side Blazor app authorization patterns](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23server-side-blazor-app-authorization-patterns). Blazor WebAssembly apps don't support a server-side fallback authorization policy. For Blazor WebAssembly authorization patterns, see [blazor/security/webassembly/index#blazor-webassembly-authorization-patterns](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Findex%23blazor-webassembly-authorization-patterns).

## Default and fallback policies

The authorization middleware combines the authorization metadata for an endpoint into a policy. The following table describes how the metadata determines which policy is used:

| Authorization metadata | Policy or behavior |
| --- | --- |
| None | The [Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy%252A) is used, if it's configured. By default, the fallback policy is `null`, so authorization isn't required. |
| `[Authorize]` or `RequireAuthorization()` without a policy name | The [Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy%252A) is used unless the endpoint also has an explicit `AuthorizationPolicy` instance. By default, the default policy requires an authenticated user. |
| `[Authorize(Policy = "{POLICY NAME}")]` or `RequireAuthorization("{POLICY NAME}")` | The named policy is used. |
| `[Authorize(Roles = "{ROLES}")]` | A policy is built with the specified roles. The default policy isn't added for this authorization declaration. |
| `RequireAuthorization(policy)` with an `AuthorizationPolicy` instance | The explicit policy is used. If explicit policy metadata is present, bare authorization data and authentication-scheme-only authorization data don't add the default policy. |
| `[Authorize(AuthenticationSchemes = "{SCHEME}")]` without a policy name or roles | The specified authentication scheme is used. The default policy is also used unless the endpoint has an explicit `AuthorizationPolicy` instance. |
| Multiple `[Authorize]` attributes or policy-selecting `RequireAuthorization(...)` calls | The selected named policies, roles, authentication schemes, and explicit policies are combined. Bare authorization data adds the default policy only when no explicit `AuthorizationPolicy` instance is present. All requirements in the combined policy must succeed. The fallback policy isn't used. |
| `[AllowAnonymous]` or `AllowAnonymous()` | The authorization middleware doesn't enforce an authorization failure for the endpoint. Authentication can still run and populate [Microsoft.AspNetCore.Http.HttpContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.User). |

The fallback policy isn't combined with a named or default policy. For the declarations shown in the preceding table, it's selected only when no authorization policy is produced from the endpoint's authorization metadata. For example, `[Authorize]` uses the default policy instead of the fallback policy, and `[Authorize(Policy = "{POLICY NAME}")]` uses the named policy instead of the fallback policy.

**Applies to: \>= aspnetcore-8.0**

Requirements supplied as endpoint metadata through [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) are added after policy selection. If no other authorization metadata produces a policy, these requirements are combined with the fallback policy when a fallback policy is configured.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

In ASP.NET Core 8.0 through 10.0, attributes that implement [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) are only enforced on Minimal API and routed endpoints. For version and hosting model support, see [security/authorization/iard](custom-authorization-policies-with-iauthorizationrequirementdata.md).



## Requirements and policy registration

An authorization policy consists of one or more *requirements*, which are used by a policy to evaluate authorization for the current user principal. A requirement implements [Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement), which is an empty marker interface.

When a requirement doesn't contain data or have properties (parameters), it acts as an empty marker to trigger an associated *authorization handler* ([Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler)) for processing authorization (described in detail later in this article). Because the handler in this case relies entirely on the HTTP context, user claims, or backend data to make a decision about the user meeting the requirement, the requirement class itself doesn't require internal data or parameters. The requirement only instructs the framework which rule to evaluate.

For example, consider the following minimum age requirement (`MinimumAgeRequirement`), which is implemented merely as a marker class:

```csharp
public class MinimumAgeRequirement : IAuthorizationRequirement { }
```

The preceding requirement is used to create a policy that confirms the user is over a specific age that the handler checks. An `AuthorizationHandler<MinimumAgeRequirement>` inspects the `AuthorizationHandlerContext.User`. If the user has a birth date claim that indicates they're over a certain age, the requirement succeeds. The requirement object doesn't require any properties (parameters) in this case. The next example demonstrates the complete implementation of a minimum age requirement that has a parameter to set the minimum age.

Consider the following `MinimumAgeRequirement` requirement, which describes a single parameter, a minimum age, to evaluate for user authorization:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Requirements/MinimumAgeRequirement.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Policies/Requirements/MinimumAgeRequirement.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Requirements/MinimumAgeRequirement.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: \>= aspnetcore-7.0**

A policy is registered as part of the authorization service configuration in the app's `Program` file by calling [Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%252A). The following example creates an `AtLeast21` policy with a single requirement of a minimum age, and it sets the minimum age to 21 years old.

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AtLeast21", policy => 
        policy.Requirements.Add(new MinimumAgeRequirement(21)));
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

A policy is registered as part of the authorization service configuration in the app's `Program` file by calling [Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%252A). The following example creates an `AtLeast21` policy with a single requirement of a minimum age, and it sets the minimum age to 21 years old:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AtLeast21", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(21)));
});
```



**Applies to: < aspnetcore-6.0**

A policy is registered as part of the authorization service configuration in `Startup.ConfigureServices` (`Startup.cs`) by calling [Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy%252A). The following example creates an `AtLeast21` policy with a single requirement of a minimum age, and it sets the minimum age to 21 years old:

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("AtLeast21", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(21)));
});
```



If an authorization policy contains multiple authorization requirements, all of the requirements must pass in order for the policy evaluation to succeed. In other words, multiple authorization requirements added to a single authorization policy are treated on an **AND** basis.

## Apply policies to Razor components

Apply policies to Razor components using the `[Authorize]` attribute with the policy name:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "CustomerServiceMember")]
```

If multiple policies are applied, ***all*** policies must pass before access is granted:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "CustomerServiceMember")]
@attribute [Authorize(Policy = "HumanResourcesMember")]
```

## Apply policies to endpoints

Apply policies to endpoints by using [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) with the policy name. For example:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

## Apply policies in MVC and Razor Pages apps

For guidance on applying policies in Razor Pages and MVC apps, see the following resources:

* [razor-pages/security/authorization/policies](../../razor-pages/security/authorization/policies.md)
* [mvc/security/authorization/policies](../../mvc/security/authorization/policies.md)

## Authorization service interface (`IAuthorizationService`)

[Microsoft.AspNetCore.Authorization.IAuthorizationService](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationService) is primarily responsible for determining if authorization is successful when an [Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync%252A) overload is called:

* `AuthorizeAsync(ClaimsPrincipal user, object resource, IEnumerable<IAuthorizationRequirement> requirements)`: Checks if a user meets a specific set of authorization requirements for a specified resource.
* `AuthorizeAsync(ClaimsPrincipal user, object resource, string policyName)`: Checks if a user meets a specific authorization policy for a specified resource.

If a resource isn't required for policy evaluation, `null` is passed for the resource.

The preceding methods return an [Microsoft.AspNetCore.Authorization.AuthorizationResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationResult) wrapped in a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

Each [Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler) is responsible for checking if requirements are met via [Microsoft.AspNetCore.Authorization.IAuthorizationHandler.HandleAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler.HandleAsync%252A). The [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext) class contains the authorization information used by the [Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler) implementation. [Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement) is a marker interface with no methods that serves as the mechanism for tracking whether authorization is successful. When [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed%252A) is called with the [Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement), the policy is met:

```csharp
context.Succeed(requirement);
```

## Authorization handlers

An authorization handler is responsible for the evaluation of a requirement's properties. The authorization handler evaluates the requirements against a provided [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext) to determine if access is allowed.

A requirement can have [multiple handlers](#why-would-i-want-multiple-handlers-for-a-requirement). A handler may inherit [Microsoft.AspNetCore.Authorization.AuthorizationHandler%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandler%25601), where `TRequirement` is the requirement to handle. Alternatively, a handler may implement [Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler) directly to handle more than one type of requirement.

### Use a handler for one requirement

The following example shows a one-to-one relationship in which a minimum age handler handles a single requirement:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/MinimumAgeHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Policies/Handlers/MinimumAgeHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Handlers/MinimumAgeHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



The preceding code determines if the current user principal has a date of birth claim. Authorization can't occur when the claim is missing, in which case a completed task is returned. When a claim is present, the user's age is calculated. If the user meets the minimum age defined by the requirement, authorization is considered successful. When authorization is successful, [`context.Succeed`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed%252A) is invoked with the satisfied requirement as its sole parameter.

### Use a handler for multiple requirements

The following example shows a one-to-many relationship in which a permission handler can handle three different types of requirements:

**Applies to: \>= aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/PermissionHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Handlers/PermissionHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



The preceding code traverses [Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.PendingRequirements%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.PendingRequirements%252A)&mdash;a property containing requirements not marked as successful. For a `ReadPermission` requirement, the user must be either an owner or a sponsor to access the requested resource. For an `EditPermission` or `DeletePermission` requirement, they must be an owner to access the requested resource.

### Handler registration

Register handlers in the services collection during configuration. The following example registers a minimum age handler (`MinimumAgeHandler`) as a singleton service, but a handler can be registered using any of the built-in [service lifetimes](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes):

**Applies to: \>= aspnetcore-6.0**

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```



**Applies to: < aspnetcore-6.0**

```csharp
services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```



It's possible to bundle both a requirement and a handler into a single class implementing both [Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement) and [Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler). This bundling creates a tight coupling between the handler and requirement and is only recommended for simple requirements and handlers. Creating a class that implements both interfaces removes the need to register the handler in the service container due to the built-in [Microsoft.AspNetCore.Authorization.Infrastructure.PassThroughAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.Infrastructure.PassThroughAuthorizationHandler) that allows requirements to handle themselves.

See the [implementation of the ASP.NET Core `AssertionRequirement` class](https://github.com/dotnet/aspnetcore/blob/main/src/Security/Authorization/Core/src/AssertionRequirement.cs) for an example where the [Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement) is both a requirement and the handler in a fully self-contained class. The [Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement) framework's API allows you to validate access using inline lambda expressions instead of writing separate, boilerplate requirement and handler classes.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


### What should a handler return?

The `Handle` method in the [handler example](#use-a-handler-for-one-requirement) returns no value. How is a status of either success or failure indicated?

* A handler indicates success by calling [`context.Succeed`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed%252A), passing the successfully validated requirement ([Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement)).

* A handler isn't required to handle failures generally, as other handlers for the same requirement may succeed.

* To guarantee failure, even if other requirement handlers succeed, call [`context.Fail`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Fail%252A).

If a handler calls [`context.Succeed`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed%252A) or [`context.Fail`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Fail%252A), all other handlers are still called. This allows requirements to produce side effects, such as logging, which takes place even if another handler successfully validates or fails on a requirement. When set to `false`, the [Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure%252A) property short-circuits the execution of handlers when [`context.Fail`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Fail%252A) is called. [Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure%252A) defaults to `true`, in which case all handlers are called.

> **Note:**
> Authorization handlers are called even if authentication fails. Also handlers can execute in any order, so do ***not*** depend on the order of calling handlers.

### Why would I want multiple handlers for a requirement?

In cases where you want evaluation to be on an **OR** basis, implement multiple handlers for a single requirement. For example, assume that the Contoso Corporation has doors that only open with key cards. If you leave your key card at home, the receptionist prints a temporary sticker and opens the door for you. In this scenario, the app has a single requirement but multiple handlers, each one examining a single requirement.

In the following example implementations:

* `BuildingEntryRequirement` is the building entry requirement.
* `BadgeEntryHandler` (the individual has a badge) and `TemporaryStickerHandler` (the individual has a temporary sticker) are separate handlers, each examining a single requirement.

**Applies to: \>= aspnetcore-6.0**

`BuildingEntryRequirement.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Requirements/BuildingEntryRequirement.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

`BadgeEntryHandler.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/BadgeEntryHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

`TemporaryStickerHandler.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/TemporaryStickerHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

`BuildingEntryRequirement.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Requirements/BuildingEntryRequirement.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

`BadgeEntryHandler.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Handlers/BadgeEntryHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

`TemporaryStickerHandler.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp1/Services/Handlers/TemporaryStickerHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



Ensure that both handlers are [registered](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23handler-registration). If either of the handlers succeed when a policy evaluates the `BuildingEntryRequirement`, the policy evaluation succeeds.

## Use a `Func` to fulfill a policy

There are situations where fulfilling a policy is simple to express in code with a `Func<AuthorizationHandlerContext, bool>` delegate when configuring a policy with the `RequireAssertion` policy builder. For example, the preceding `BadgeEntryHandler` can be rewritten as follows:

**Applies to: \>= aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/3.0PoliciesAuthApp1/Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)



**Applies to: \>= aspnetcore-6.0**

## Authorization via an external service sample

The [Authorization via an external service sample (`dotnet/AspNetCore.Docs.Samples` GitHub repository)](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/AuthorizationExternalService) shows how to implement additional authorization requirements with an external authorization service. The solution's `Contoso.API` project is secured with [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/what-is-entra). An additional authorization check from the `Contoso.Security.API` project returns a payload describing whether the `Contoso.API` client app can invoke the `GetWeather` API.

### Configure the sample

The following demonstration relies on using [NSwag (Swagger/OpenAPI)](https://github.com/RicoSuter/NSwag) or [cURL](https://curl.se/) in a command shell.

In the `Contoso.Security.API` project, set the `AllowedClients` placeholder (`{CLIENT ID}`) to any test GUID value (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`):

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/AuthorizationExternalService/Contoso.Security.API/appsettings.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/policies.md)

In a command shell opened to the `Contoso.API` project, use [`dotnet user-jwts`](../authentication/jwt-authn.md) to generate an access token with an `appid` claim for the client app's ID, which was created in the preceding step (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`).

```dotnetcli
dotnet user-jwts create --claim appid={GUID}
```

Example:

```dotnetcli
dotnet user-jwts create --claim appid=00001111-aaaa-2222-bbbb-3333cccc4444
```

The output produces a token after "`Token:`" in the command shell:

```dotnetcli
New JWT saved with ID '{JWT ID}'.
Name: {USER}
Custom Claims: [appid=00001111-aaaa-2222-bbbb-3333cccc4444]

Token: {TOKEN}
```

Set the value of the token (where the `{TOKEN}` placeholder appears in the preceding output) aside for use later.

You can decode the token in an online JWT decoder, such as [`jwt.ms`](https://jwt.ms/) to see its contents, revealing that it contains an `appid` claim with the client app's ID:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}.{
  "unique_name": "{USER}",
  "sub": "{USER}",
  "jti": "14ed7729",
  "appid": "{CLIENT ID}",
  "aud": [
    "https://localhost:7250",
    "http://localhost:7251"
  ],
  "nbf": 1780660887,
  "exp": 1788609687,
  "iat": 1780660888,
  "iss": "dotnet-user-jwts"
}.[Signature]
```

Execute the command again with an incorrect client ID (`appid`) value:

```dotnetcli
dotnet user-jwts create --claim appid=aaaabbbb-0000-cccc-1111-dddd2222eeee
```

Set the value of the second token aside.

Start both the `Contoso.API` and `Contoso.Security.API` projects in Visual Studio or with the `dotnet watch` command in a command shell:

```dotnetcli
dotnet watch
```

# [Swagger UI](#tab/swagger-ui)

In the Swagger UI of the `Contoso.API` project (`https://localhost:7250/swagger/index.html`), select the **Authorize** button.

In the **Available authorizations: Bearer** window, enter the access token. Select the **Authorize** button. Close the **Available authorizations** window.

Under **default**, select the **Get** button for the `/WeatherForecast` endpoint. Select the **Try it out** button. Select the **Execute** button.

The output under **Responses** > **Server response** > **Response body** shows the weather forecast JSON returned by the `Contoso.API` project.

Perform the same steps with the access token that was generated with an invalid client app ID. The response is *403 - Forbidden*.

# [cURL in a command shell](#tab/curl-command-shell)

In a command shell, use the .NET CLI to execute the following `curl.exe` command to request the `WeatherForecast` endpoint. Replace the `{TOKEN}` placeholder with the first JWT bearer token that you saved earlier:

```dotnetcli
curl.exe -i -H "Authorization: Bearer {TOKEN}" https://localhost:7250/WeatherForecast
```

The output indicates success because the user's birth date claim indicates that they're at least 21 years old:

```dotnetcli
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 05 Jun 2026 12:48:58 GMT
Server: Kestrel
Transfer-Encoding: chunked

[{ ... WEATHER DATA ... }]
```

Execute the command again using the second token with the invalid client ID (`appid`). The result indicates a policy failure:

```dotnetcli
HTTP/1.1 403 Forbidden
Content-Length: 0
Date: Fri, 05 Jun 2026 13:09:56 GMT
Server: Kestrel
```

You can add breakpoints in the `Contoso.Security.API.SecurityPolicyController` and see that the passed client ID (`appid`) is used to assert whether it is allowed to obtain weather data.

You can also send the client ID directly to the `Contoso.Security.API` either via the Swagger UI or cURL in a command shell (for example: `https://localhost:7123/SecurityPolicy/{CLIENT ID}`) to see it return either `true` or `false` for `canGetWeather`.

```dotnetcli
curl.exe -i -H "Authorization: Bearer {TOKEN}" https://localhost:7123/SecurityPolicy/{CLIENT ID}
```

With the correct client ID (`appid`), `canGetWeather` is `true`:

```dotnetcli
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 05 Jun 2026 13:19:49 GMT
Server: Kestrel
Transfer-Encoding: chunked

{"canGetWeather":true}
```

---

## Additional resources

* [Quickstart: Configure an application to expose a web API](https://learn.microsoft.com/entra/identity-platform/quickstart-configure-app-expose-web-apis)
* [Authorization via an external service sample (`dotnet/AspNetCore.Docs.Samples` GitHub repository)](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/AuthorizationExternalService)
