---
title: "Breaking change: ActivatorUtilities.CreateInstance requires non-null provider"
description: Learn about the .NET 8 breaking change in .NET extensions where ActivatorUtilities.CreateInstance throws an ArgumentNullException if the provider is null.
ms.date: 02/28/2023
---
# ActivatorUtilities.CreateInstance requires non-null provider

The two [Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*) methods now throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) exception if the `provider` parameter is `null`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

A `null` value was allowed for the `provider` parameter. In some cases, the specified type was still created correctly.

## New behavior

When `provider` is `null`, an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) exception is thrown.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

We fixed the parameter validation along with [constructor-matching issues](activatorutilities-createinstance-behavior.md) to align with the intended purpose of [Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*). The `CreateInstance()` methods have a non-nullable `provider` parameter, so it was generally expected that a `null` provider wasn't allowed.

## Recommended action

Pass a non-null [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) for the `provider` argument. If the provider also implements [Microsoft.Extensions.DependencyInjection.IServiceProviderIsService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceProviderIsService), constructor arguments can be obtained through that.

Alternatively, if your scenario doesn't require dependency injection, since [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) is `null`, use [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*) instead.

## Affected APIs

- [Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance``1(System.IServiceProvider,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance%60%601(System.IServiceProvider%2CSystem.Object%5B%5D))
- [Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance(System.IServiceProvider,System.Type,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance(System.IServiceProvider%2CSystem.Type%2CSystem.Object%5B%5D))

## See also

- [ActivatorUtilities.CreateInstance behaves consistently](activatorutilities-createinstance-behavior.md)
