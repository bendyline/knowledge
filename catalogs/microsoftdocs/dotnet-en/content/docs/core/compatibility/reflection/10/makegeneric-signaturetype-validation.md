---
title: "Breaking change: Type.MakeGenericSignatureType argument validation"
description: Learn about the .NET 10 breaking change in core .NET libraries where Type.MakeGenericSignatureType validates that the genericTypeDefinition argument is a generic type definition.
ms.date: 10/13/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/48902
---
# Type.MakeGenericSignatureType argument validation

Starting in .NET 10, the [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D)) API validates that the `genericTypeDefinition` argument is a generic type definition.

## Version introduced

.NET 10

## Previous behavior

Previously, [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D)) accepted any type for the `genericTypeDefinition` argument, including non-generic types.

## New behavior

Starting in .NET 10, [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D)) requires the `genericTypeDefinition` argument to be a generic type definition. If the argument is not a generic type definition, the method throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException).

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The type created by [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D)) had non-sensical behavior when the `genericTypeDefinition` argument was not a generic type definition.

## Recommended action

Avoid calling [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D)) for types that are not generic type definitions. For example:

```csharp
// Before
Type instantiatedType = Type.MakeGenericSignatureType(originalType, instantiation);

// After
Type instantiatedType = originalType.IsGenericTypeDefinition ? Type.MakeGenericSignatureType(originalType, instantiation) : originalType;
```

## Affected APIs

- [System.Type.MakeGenericSignatureType(System.Type,System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericSignatureType(System.Type%2CSystem.Type%5B%5D))
