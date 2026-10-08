---
title: ".NET 8 breaking change: 'Type.GetType' throws exception for all invalid element types"
description: Learn about the .NET 8 breaking change in core .NET libraries where 'Type.GetType' throws a TypeLoadException for all invalid element types.
ms.date: 03/12/2024
---
# `Type.GetType` throws exception for all invalid element types

[System.Type.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String)) now throws a [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException) for *all* types with an invalid element type, including byref-of-byref. Previously, this method returned `null` for some corner cases.

## Previous behavior

[System.Type.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String)) threw a [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException) for most types with an invalid element type, except a few corner cases such as byref-of-byref. For example, the following code returned `null` in .NET 7:

```csharp
Type.GetType("System.Object&&")
```

## New behavior

[System.Type.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String)) throws a [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException) for all types with an invalid element type, including byref-of-byref. For example, the following code (which returned `null` in .NET 7) throws an exception in .NET 8:

```csharp
Type.GetType("System.Object&&")
```

## Version introduced

.NET 8

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

.NET had multiple type-name parsers, and it was not unusual for them to have different behavior in corner cases like this one. The behavior was unified on:

- If the type with the given name is not found, return `null`.
- If the type is invalid, throw [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException). "Invalid" types include types with generic constraint violations or invalid composition of parameter types.

## Recommended action

If your code relied on a `null` return value for these corner cases, change it to catch a [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException) instead.

## Affected APIs

- [System.Type.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String))
- [System.Type.GetType(System.String,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Boolean))
- [System.Type.GetType(System.String,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Boolean%2CSystem.Boolean))
- [System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type})](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Func%7BSystem.Reflection.AssemblyName%2CSystem.Reflection.Assembly%7D%2CSystem.Func%7BSystem.Reflection.Assembly%2CSystem.String%2CSystem.Boolean%2CSystem.Type%7D))
- [System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type},System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Func%7BSystem.Reflection.AssemblyName%2CSystem.Reflection.Assembly%7D%2CSystem.Func%7BSystem.Reflection.Assembly%2CSystem.String%2CSystem.Boolean%2CSystem.Type%7D%2CSystem.Boolean))
- [System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type},System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Func%7BSystem.Reflection.AssemblyName%2CSystem.Reflection.Assembly%7D%2CSystem.Func%7BSystem.Reflection.Assembly%2CSystem.String%2CSystem.Boolean%2CSystem.Type%7D%2CSystem.Boolean%2CSystem.Boolean))
