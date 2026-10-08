---
title: Dependency injection in requirement handlers in ASP.NET Core
author: tdykstra
description: Learn how to inject authorization requirement handlers into an ASP.NET Core app using dependency injection.
monikerRange: ">= aspnetcore-2.1"
ms.author: tdykstra
ms.date: 07/21/2026
uid: security/authorization/dependencyinjection
---
# Dependency injection in requirement handlers in ASP.NET Core

**Applies to: \>= aspnetcore-6.0**

[Authorization handlers must be registered](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23handler-registration) in the service collection during configuration using [dependency injection](../../fundamentals/dependency-injection.md).

Suppose you had a repository of rules you wanted to evaluate inside an authorization handler and that repository was registered in the service collection. Authorization resolves and injects that into the constructor.

For example, to use the .NET logging infrastructure, inject [Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory) into the handler, as shown in the following example:

```csharp
public class SampleAuthorizationHandler : AuthorizationHandler<SampleRequirement>
{
    private readonly ILogger _logger;

    public SampleAuthorizationHandler(ILoggerFactory loggerFactory)
        => _logger = loggerFactory.CreateLogger(GetType().FullName);

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, SampleRequirement requirement)
    {
        _logger.LogInformation("Inside my handler");
        
        // ...

        return Task.CompletedTask;
    }
}
```

The preceding handler can be registered with any [service lifetime](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes). The following code uses [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%252A) to register the preceding handler:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, SampleAuthorizationHandler>();
```

An instance of the handler is created when the app starts, and DI injects the registered `ILoggerFactory` into its constructor.

> **Note:**
> Don't register authorization handlers that use Entity Framework (EF) as singletons.



**Applies to: < aspnetcore-6.0**

[Authorization handlers must be registered](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23handler-registration) in the service collection during configuration using [dependency injection](../../fundamentals/dependency-injection.md).

Suppose you had a repository of rules you wanted to evaluate inside an authorization handler and that repository was registered in the service collection. Authorization resolves and injects that into the constructor.

For example, to use the .NET logging infrastructure, inject [Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory) into the handler, as shown in the following example:

```csharp
public class SampleAuthorizationHandler : AuthorizationHandler<SampleRequirement>
{
    private readonly ILogger _logger;

    public SampleAuthorizationHandler(ILoggerFactory loggerFactory)
        => _logger = loggerFactory.CreateLogger(GetType().FullName);

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, SampleRequirement requirement)
    {
        _logger.LogInformation("Inside my handler");
        
        // ...

        return Task.CompletedTask;
    }
}
```

The preceding handler can be registered with any [service lifetime](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes). The following code uses [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton%252A) to register the preceding handler:

```csharp
services.AddSingleton<IAuthorizationHandler, SampleAuthorizationHandler>();
```

An instance of the handler is created when the app starts, and DI injects the registered `ILoggerFactory` into its constructor.

> **Note:**
> Don't register authorization handlers that use Entity Framework (EF) as singletons.
