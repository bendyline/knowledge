---
title: "Breaking change: FromKeyedServicesAttribute.Key can be null"
description: "Learn about the breaking change in .NET 8 where FromKeyedServicesAttribute.Key is now nullable to support unkeyed services and inheritance."
ms.date: 09/29/2025
ai-usage: ai-assisted
---

# FromKeyedServicesAttribute.Key can be null

[Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key) has been changed from a non-nullable `object` to a nullable `object?` to support null values for unkeyed services and inheritance scenarios.

## Version introduced

.NET 8

## Previous behavior

Previously, [Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key) was declared as a non-nullable `object`:

```csharp
public object Key { get; }
```

## New behavior

Starting in .NET 8, [Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key) is now declared as a nullable `object?`:

```csharp
public object? Key { get; }
```

A `null` value indicates there is no key and only the parameter type is used to resolve the service. This is useful for dependency injection implementations that require an explicit way to declare that the parameter should be resolved for unkeyed services. A `null` value is also used with inheritance scenarios to indicate that the key should be inherited from the parent scope.

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

Support was added for keyed services to annotate parameters as unkeyed. This change allows developers to explicitly indicate when a parameter should be resolved without a key, which is particularly useful in scenarios where both keyed and unkeyed services are registered for the same type.

## Recommended action

Adjust any code that uses [Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key) to handle `null` values.

## Affected APIs

- [Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute.Key)
