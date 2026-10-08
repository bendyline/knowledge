---
title: Managed assembly loading algorithm - .NET Core
description: Description of the details of the managed assembly loading algorithm in .NET Core
ms.date: 03/11/2026
author: sdmaclea
ai-usage: ai-assisted
---
# Managed assembly loading algorithm

Managed assemblies are located and loaded with an algorithm that has various stages.

All managed assemblies except satellite assemblies and `WinRT` assemblies use the same algorithm.

## When are managed assemblies loaded?

The most common mechanism to trigger a managed assembly load is a static assembly reference. These references are inserted by the compiler whenever code uses a type defined in another assembly. These assemblies are loaded (`load-by-name`) as needed by the runtime. The exact timing of when the static assembly references are loaded is unspecified. It can vary between runtime versions and is influenced by optimizations like inlining.

The direct use of the following APIs will also trigger loads:

| API | Description | `Active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) |
| --- | --- | --- |
| [System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyName*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyName*) | `Load-by-name` | The [this](../../csharp/language-reference/keywords/this.md) instance. |
| [System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyPath*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyPath*)<br/>[System.Runtime.Loader.AssemblyLoadContext.LoadFromNativeImagePath*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromNativeImagePath*) | Load from path. | The [this](../../csharp/language-reference/keywords/this.md) instance. |
| [System.Runtime.Loader.AssemblyLoadContext.LoadFromStream*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromStream*) | Load from object. | The [this](../../csharp/language-reference/keywords/this.md) instance. |
| [System.Reflection.Assembly.LoadFile*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFile*) | Load from path in a new [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance | The new [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance. |
| [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) | Load from path in the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance.<br/>Adds an [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) handler. The handler will load the assembly's dependencies from its directory. | The [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance. |
| [System.Reflection.Assembly.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load(System.Reflection.AssemblyName))<br/>[System.Reflection.Assembly.Load(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load(System.String))<br/>[System.Reflection.Assembly.LoadWithPartialName*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadWithPartialName*) | `Load-by-name`. | Inferred from caller.<br/>Prefer [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) methods. |
| [System.Reflection.Assembly.Load(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load(System.Byte%5B%5D))<br/>[System.Reflection.Assembly.Load(System.Byte\[\],System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load(System.Byte%5B%5D%2CSystem.Byte%5B%5D)) | Load from object in a new [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance. | The new [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance. |
| [System.Type.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String))<br/>[System.Type.GetType(System.String,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Boolean))<br/>[System.Type.GetType(System.String,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.GetType(System.String%2CSystem.Boolean%2CSystem.Boolean)) | `Load-by-name`. | Inferred from caller.<br/>Prefer [System.Type.GetType*](https://learn.microsoft.com/search/?terms=System.Type.GetType*) methods with an `assemblyResolver` argument. |
| [System.Reflection.Assembly.GetType*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetType*) | If type `name` describes an assembly qualified generic type, trigger a `Load-by-name`. | Inferred from caller.<br/>Prefer [System.Type.GetType*](https://learn.microsoft.com/search/?terms=System.Type.GetType*) when using assembly qualified type names. |
| [System.Activator.CreateInstance(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance(System.String%2CSystem.String))<br/>[System.Activator.CreateInstance(System.String,System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance(System.String%2CSystem.String%2CSystem.Object%5B%5D))<br/>[System.Activator.CreateInstance(System.String,System.String,System.Boolean,System.Reflection.BindingFlags,System.Reflection.Binder,System.Object\[\],System.Globalization.CultureInfo,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance(System.String%2CSystem.String%2CSystem.Boolean%2CSystem.Reflection.BindingFlags%2CSystem.Reflection.Binder%2CSystem.Object%5B%5D%2CSystem.Globalization.CultureInfo%2CSystem.Object%5B%5D)) | `Load-by-name`. | Inferred from caller.<br/>Prefer [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*) methods taking a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) argument. |

> **Important:**
> Unlike .NET Framework, the `assemblyFile` parameter of [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) is treated as a file path in .NET, not a URI. In .NET Framework, you can pass a file URI (for example, `file:///C:/path/to/assembly.dll`)—such as one constructed from [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase)—and the assembly loads successfully. In .NET, the `assemblyFile` value is passed to [System.IO.Path.GetFullPath*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetFullPath*), which doesn't properly handle URIs, so the load fails. If you already have a file URI string, first create a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) instance and use its [System.Uri.LocalPath](https://learn.microsoft.com/search/?terms=System.Uri.LocalPath) property to get the file path before calling [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*). To get the file path of an already-loaded assembly, use [System.Reflection.Assembly.Location](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Location) instead of `CodeBase`.

## Algorithm

The following algorithm describes how the runtime loads a managed assembly.

1. Determine the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext).

    - For a static assembly reference, the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) is the instance that loaded the referring assembly.
    - Preferred APIs make the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) explicit.
    - Other APIs infer the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext). For these APIs, the [System.Runtime.Loader.AssemblyLoadContext.CurrentContextualReflectionContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.CurrentContextualReflectionContext) property is used. If its value is `null`, then the inferred [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance is used.
    - See the table in the [When are managed assemblies loaded?](#when-are-managed-assemblies-loaded) section.

2. For the `Load-by-name` methods, the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) loads the assembly in the following priority order:

    - Check its `cache-by-name`.
    - Call the [System.Runtime.Loader.AssemblyLoadContext.Load*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load*) function.
    - Check the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance's cache and run [managed assembly default probing](default-probing.md#managed-assembly-default-probing) logic. If an assembly is newly loaded, a reference is added to the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance's `cache-by-name`.
    - Raise the [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event for the active AssemblyLoadContext. Handlers are invoked in registration order. The first handler that returns a non-null assembly ends the resolution.
    - Raise the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event. Handlers are invoked in registration order. The first handler that returns a non-null assembly ends the resolution.

3. For the other types of loads, the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) loads the assembly in the following priority order:

    - Check its `cache-by-name`.
    - If the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) is [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default), run the [default probing logic for managed assemblies](default-probing.md#managed-assembly-default-probing).
    - Load from the specified path or raw assembly object. If an assembly is newly loaded, a reference is added to the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance's `cache-by-name`.

4. In either case, if an assembly is newly loaded, then the [System.AppDomain.AssemblyLoad](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyLoad) event is raised.
