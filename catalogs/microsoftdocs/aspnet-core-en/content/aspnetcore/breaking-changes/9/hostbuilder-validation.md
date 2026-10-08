---
title: "Breaking change: HostBuilder enables ValidateOnBuild/ValidateScopes in development environment"
description: Learn about the breaking change in .NET 9 where HostBuilder now enables ValidateOnBuild and ValidateScopes in the development environment.
ms.date: 08/05/2024
---
# HostBuilder enables ValidateOnBuild/ValidateScopes in development environment

Previously, no validation was enabled by default. Now, in the [development environment](https://learn.microsoft.com/aspnet/core/fundamentals/environments), [Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild) and [Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes) are enabled.

## Version introduced

.NET 9 Preview 7

## Previous behavior

[Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild) and [Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes) defaulted to `false` and were only enabled when they were explicitly set by calling [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%252A).

## New behavior

In the [development environment](https://learn.microsoft.com/aspnet/core/fundamentals/environments) when options haven't been set with [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%252A), [Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild) and [Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes) are set to `true`.

## Type of breaking change

This change is a [behavioral change](https://learn.microsoft.com/dotnet/core/compatibility/categories#behavioral-change).

## Reason for change

Validation helps to catch problems early in application startup rather than later (or not at all) when the application interacts with its service provider.

## Recommended action

No action necessary if your application validates successfully. If you do see a validation error when testing in development, first try to fix it. If you can't fix it, you can disable validation by calling [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider%252A).

## Affected APIs

- [Microsoft.Extensions.Hosting.HostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder)
- [Microsoft.Extensions.Hosting.HostBuilder.Build](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder.Build)
