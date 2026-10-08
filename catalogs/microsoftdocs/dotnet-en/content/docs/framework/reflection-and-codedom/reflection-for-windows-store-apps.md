---
title: "Reflection in the .NET Framework for Windows Store Apps"
description: Use reflection in .NET for Windows Store apps. There's a set of reflection types and members to use in Windows Store apps, which are available to the full .NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "reflection, Windows Store apps"
  - ".NET for Windows Store apps, TypeInfo class"
ms.assetid: 0d07090c-9b47-4ecc-81d1-29d539603c9b
---
# Reflection in .NET Framework for Windows Store Apps

.NET Framework includes a set of reflection types and members for use in Windows 8.x Store apps. These types and members are available in the full .NET Framework and in .NET for Windows Store apps. This article explains the major differences between these and their counterparts in .NET Framework 4 and earlier versions.

If you are creating a Windows 8.x Store app, you must use the reflection types and members in .NET for Windows 8.x Store apps. These types and members are also available, but not required, for use in desktop apps, so you can use the same code for both types of apps.

## TypeInfo and Assembly Loading

In .NET for Windows 8.x Store apps, the [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) class contains some of the functionality of the .NET Framework 4 [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class. A [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object represents a reference to a type definition, whereas a [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) object represents the type definition itself. This enables you to manipulate [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects without necessarily requiring the runtime to load the assembly they reference. Getting the associated [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) object forces the assembly to load.

[System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) contains many of the members available on [System.Type](https://learn.microsoft.com/search/?terms=System.Type), and many of the reflection properties in .NET for Windows 8.x Store apps return collections of [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) objects. To get a [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo) object from a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object, use the [System.Reflection.IReflectableType.GetTypeInfo*](https://learn.microsoft.com/search/?terms=System.Reflection.IReflectableType.GetTypeInfo*) method.

## Query Methods

In .NET for Windows 8.x Store apps, you use the reflection properties that return [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) collections instead of methods that return arrays. Reflection contexts can implement lazy traversal of these collections for large assemblies or types.

The reflection properties return only the declared methods on a particular object instead of traversing the inheritance tree. Moreover, they do not use [System.Reflection.BindingFlags](https://learn.microsoft.com/search/?terms=System.Reflection.BindingFlags) parameters for filtering. Instead, filtering takes place in user code, by using LINQ queries on the returned collections. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), traversing the inheritance tree is best accomplished by using the helper methods of the [System.Reflection.RuntimeReflectionExtensions](https://learn.microsoft.com/search/?terms=System.Reflection.RuntimeReflectionExtensions) class. Consumers of objects from customized reflection contexts cannot use these methods, and must traverse the inheritance tree themselves.

## Restrictions

In a Windows 8.x Store app, access to some .NET Framework types and members is restricted. For example, you can't call .NET Framework methods that aren't included in .NET for Windows 8.x Store apps, by using a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) object. In addition, certain types and members that aren't considered safe within the context of a Windows 8.x Store app are blocked, as are [System.Runtime.InteropServices.Marshal](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal) and [System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal) members. This restriction affects only .NET Framework types and members; you can call your code or third-party code as you normally would.

## See also

- [Reflection](../../fundamentals/reflection/overview.md)
