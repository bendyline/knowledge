---
title: "Breaking change: IntPtr no longer used for function pointer types"
description: Learn about a breaking change in .NET 8 SDK where System.Reflection uses a System.Type instance to represent a function pointer.
ms.date: 03/17/2023
---
# IntPtr no longer used for function pointer types

As a new reflection feature, a function pointer type is now a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance with new capabilities such as [System.Type.IsFunctionPointer](https://learn.microsoft.com/search/?terms=System.Type.IsFunctionPointer). Previously, the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instance returned was the [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) type.

Using [System.Type](https://learn.microsoft.com/search/?terms=System.Type) in this manner is similar to how other types are exposed, such as pointers ([System.Type.IsPointer](https://learn.microsoft.com/search/?terms=System.Type.IsPointer)) and arrays ([System.Type.IsArray](https://learn.microsoft.com/search/?terms=System.Type.IsArray)).

This new functionality is currently implemented in the CoreCLR runtime and in [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext). Support for the Mono and NativeAOT runtimes is expected later.

A function pointer instance, which is a physical address to a function, continues to be represented as an [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr); only the reflection type has changed.

## Previous behavior

Previously, `typeof(delegate*<void>())` returned the [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) type for a function pointer type. Similarly, reflection also returned this type for a function pointer type, such as with [System.Reflection.FieldInfo.FieldType](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.FieldType). The [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) type didn't allow any access to the parameter types, return type, or calling conventions.

## New behavior

`typeof` and reflection now use [System.Type](https://learn.microsoft.com/search/?terms=System.Type) for a function pointer type, which provides access to the parameter types, return type, and calling conventions.

## Version introduced

.NET 8 Preview 2

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change adds the capability to obtain function pointer metadata including parameter types, the return type, and the calling conventions. Function pointer support was added with C# 9 and .NET 5, but reflection support wasn't added at that time.

## Recommended action

If you want your code to support function pointers and to treat them specially, use the new [System.Type.IsFunctionPointer](https://learn.microsoft.com/search/?terms=System.Type.IsFunctionPointer) API.

## Affected APIs

- `typeof` keyword
- [System.Reflection.FieldInfo.FieldType](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.FieldType)
- [System.Reflection.PropertyInfo.PropertyType](https://learn.microsoft.com/search/?terms=System.Reflection.PropertyInfo.PropertyType)
- [System.Reflection.ParameterInfo.ParameterType](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo.ParameterType)
