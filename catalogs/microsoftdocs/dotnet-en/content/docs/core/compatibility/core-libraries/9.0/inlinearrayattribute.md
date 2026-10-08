---
title: "Breaking change: Default `Equals()` and `GetHashCode()` throw for types marked with `InlineArrayAttribute`"
description: Learn about the .NET 9 breaking change in core .NET libraries where the default implementations of `Equals()` and `GetHashCode()` throw an exception for types marked with `InlineArrayAttribute`.
ms.date: 07/10/2024
---
# Default `Equals()` and `GetHashCode()` throw for types marked with `InlineArrayAttribute`

The default behavior for [System.ValueType.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ValueType.Equals(System.Object)) and [System.ValueType.GetHashCode](https://learn.microsoft.com/search/?terms=System.ValueType.GetHashCode) on types marked with [System.Runtime.CompilerServices.InlineArrayAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.InlineArrayAttribute) is now to throw a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException). Library authors should override these two methods if they're expected to not throw.

## Previous behavior

Previously, the default implementations only used the placeholder `ref` field when computing equality or the hash code.

## New behavior

Starting in .NET 9, a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) is always thrown from the default implementations for [System.ValueType.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ValueType.Equals(System.Object)) and [System.ValueType.GetHashCode](https://learn.microsoft.com/search/?terms=System.ValueType.GetHashCode) when [System.Runtime.CompilerServices.InlineArrayAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.InlineArrayAttribute) is applied to a type.

## Version introduced

.NET 9 Preview 6

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The current behavior is incorrect for both determining equality and computing the hash code, and users are led into a false sense of correctness when calling these functions.

## Recommended action

Library authors should implement both [System.ValueType.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ValueType.Equals(System.Object)) and [System.ValueType.GetHashCode](https://learn.microsoft.com/search/?terms=System.ValueType.GetHashCode) on all types marked with [System.Runtime.CompilerServices.InlineArrayAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.InlineArrayAttribute).

## Affected APIs

- [System.ValueType.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ValueType.Equals(System.Object))
- [System.ValueType.GetHashCode](https://learn.microsoft.com/search/?terms=System.ValueType.GetHashCode)
