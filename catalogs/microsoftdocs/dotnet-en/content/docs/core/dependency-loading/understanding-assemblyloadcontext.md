---
title: About AssemblyLoadContext - .NET
description: Key concepts to understand the purpose and behavior of AssemblyLoadContext in .NET.
ms.date: 03/05/2026
author: sdmaclea
ai-usage: ai-assisted
---
# About System.Runtime.Loader.AssemblyLoadContext

The [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) class was introduced in .NET Core and is not available in .NET Framework. This article supplements the [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) API documentation with conceptual information.

This article is relevant to developers implementing dynamic loading, especially dynamic-loading framework developers.

## What is the AssemblyLoadContext?

Every .NET 5+ and .NET Core application implicitly uses [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext).
It's the runtime's provider for locating and loading dependencies. Whenever a dependency is loaded, an [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance is invoked to locate it.

- AssemblyLoadContext provides a service of locating, loading, and caching managed assemblies and other dependencies.
- To support dynamic code loading and unloading, it creates an isolated context for loading code and its dependencies in their own [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance.

## Versioning rules

A single [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance is limited to loading exactly one version of an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) per [simple assembly name](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.Name). When an assembly reference is resolved against an [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance that already has an assembly of that name loaded, the requested version is compared to the loaded version. The resolution will succeed only if the loaded version is equal or higher to the requested version.

## When do you need multiple AssemblyLoadContext instances?

The restriction that a single [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance can load only one version of an assembly can become a problem when loading code modules dynamically. Each module is independently compiled, and the modules may depend on different versions of an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly). This is often a problem when different modules depend on different versions of a commonly used library.

To support dynamically loading code, the [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) API provides for loading conflicting versions of an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) in the same application. Each [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance provides a unique dictionary that maps each [System.Reflection.AssemblyName.Name](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.Name) to a specific [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instance.

It also provides a convenient mechanism for grouping dependencies related to a code module for later unload.

## The AssemblyLoadContext.Default instance

The [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance is automatically populated by the runtime at startup. It uses [default probing](default-probing.md) to locate and find all static dependencies.

It solves the most common dependency loading scenarios.

## Dynamic dependencies

[System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) has various events and virtual functions that can be overridden.

The [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance only supports overriding the events.

The articles
[Managed assembly loading algorithm](loading-managed.md),
[Satellite assembly loading algorithm](loading-resources.md), and
[Unmanaged (native) library loading algorithm](loading-unmanaged.md) refer to all the available events and virtual functions.  The articles show each event and function's relative position in the loading algorithms. This article doesn't reproduce that information.

This section covers the general principles for the relevant events and functions.

- **Be repeatable**. A query for a specific dependency must always result in the same response. The same loaded dependency instance must be returned. This requirement is fundamental  for cache consistency. For managed assemblies in particular, we're creating an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) cache. The cache key is a simple assembly name, [System.Reflection.AssemblyName.Name](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.Name).
- **Typically don't throw**.  It's expected that these functions return `null` rather than throw when unable to find the requested dependency. Throwing will prematurely end the search and propagate an exception to the caller. Throwing should be restricted to unexpected errors like a corrupted assembly or an out of memory condition.
- **Avoid recursion**. Be aware that these functions and handlers implement the loading rules for locating dependencies. Your implementation shouldn't call APIs that trigger recursion. Your code should typically call **AssemblyLoadContext** load functions that require a specific path or memory reference argument.
- **Load into the correct AssemblyLoadContext**. The choice of where to load dependencies is application-specific.  The choice is implemented by these events and functions. When your code calls **AssemblyLoadContext** load-by-path functions call them on the instance where you want the code loaded. Sometime returning `null` and letting the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) handle the load may be the simplest option.
- **Be aware of thread races**. Loading can be triggered by multiple threads. The AssemblyLoadContext handles thread races by atomically adding assemblies to its cache. The race loser's instance is discarded. In your implementation logic, don't add extra logic that doesn't handle multiple threads properly.

## How are dynamic dependencies isolated?

Each [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance represents a unique scope for [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instances and [System.Type](https://learn.microsoft.com/search/?terms=System.Type) definitions.

There's no binary isolation between these dependencies. They're only isolated by not finding each other by name.

In each [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext):

- [System.Reflection.AssemblyName.Name](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.Name) may refer to a different [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instance.
- [System.Type.GetType*](https://learn.microsoft.com/search/?terms=System.Type.GetType*) may return a different type instance for the same type `name`.

## Shared dependencies

Dependencies can easily be shared between [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instances. The general model is for one [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) to load a dependency.  The other shares the dependency by using a reference to the loaded assembly.

This sharing is required of the runtime assemblies. These assemblies can only be loaded into the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default). The same is required for frameworks like `ASP.NET`, `WPF`, or `WinForms`.

It's recommended that shared dependencies be loaded into [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default). This sharing is the common design pattern.

Sharing is implemented in the coding of the custom [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance. [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) has various events and virtual functions that can be overridden. When any of these functions return a reference to an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instance that was loaded in another [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance, the [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instance is shared. The standard load algorithm defers to [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) for loading to simplify the common sharing pattern. For more information, see [Managed assembly loading algorithm](loading-managed.md).

## Type-conversion issues

When two [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instances contain type definitions with the same `name`, they're not the same type. They're the same type if and only if they come from the same [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) instance.

To complicate matters, exception messages about these mismatched types can be confusing. The types are referred to in the exception messages by their simple type names. The common exception message in this case is of the form:

> Object of type 'IsolatedType' cannot be converted to type 'IsolatedType'.

### Debug type-conversion issues

Given a pair of mismatched types, it's important to also know:

- Each type's [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly).
- Each type's [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext), which can be obtained via the [System.Runtime.Loader.AssemblyLoadContext.GetLoadContext(System.Reflection.Assembly)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.GetLoadContext(System.Reflection.Assembly)) function.

Given two objects `a` and `b`, evaluating the following in the debugger will be helpful:

```csharp
// In debugger look at each assembly's instance, Location, and FullName
a.GetType().Assembly
b.GetType().Assembly
// In debugger look at each AssemblyLoadContext's instance and name
System.Runtime.Loader.AssemblyLoadContext.GetLoadContext(a.GetType().Assembly)
System.Runtime.Loader.AssemblyLoadContext.GetLoadContext(b.GetType().Assembly)
```

### Resolve type-conversion issues

There are two design patterns for solving these type conversion issues.

1. Use common shared types. This shared type can either be a primitive runtime type, or it can involve creating a new shared type in a shared assembly.  Often the shared type is an [interface](../../csharp/language-reference/keywords/interface.md) defined in an application assembly. For more information, read about [how dependencies are shared](#shared-dependencies).

2. Use marshalling techniques to convert from one type to another.

## Access static members

Types loaded into a custom [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) are isolated from types in other contexts, so you must use reflection to access their static members from outside the context.

For example, consider this static class in a dynamically loaded assembly:

```csharp
namespace MyPlugin;

public static class Paths
{
    public static DirectoryInfo RootIO { get; private set; }
}
```

Use [System.Reflection.PropertyInfo.GetValue*](https://learn.microsoft.com/search/?terms=System.Reflection.PropertyInfo.GetValue*) to read the property value. Pass `null` as the first argument because static members don't require an instance. Pass the fully qualified type name (including the namespace) to [System.Reflection.Assembly.GetType(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetType(System.String)):

```csharp
// Get the type from the loaded assembly using the fully qualified name
Type pathsType = loadedAssembly.GetType("MyPlugin.Paths")
    ?? throw new InvalidOperationException("Type 'MyPlugin.Paths' not found in loaded assembly.");

// Use PropertyInfo to access a static property
PropertyInfo rootIoProperty = pathsType.GetProperty("RootIO")
    ?? throw new InvalidOperationException("Property 'RootIO' was not found on type 'MyPlugin.Paths'.");
DirectoryInfo rootIo = (DirectoryInfo)rootIoProperty.GetValue(null);
```

Alternatively, C# compiles property accessors into methods with `get_` and `set_` prefixes. You can call these accessor methods directly using [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*). However, [System.Type.GetMethod(System.String)](https://learn.microsoft.com/search/?terms=System.Type.GetMethod(System.String)) only returns public methods. When an accessor is non-public (such as the `private set` in the example), you must use the overload that accepts [System.Reflection.BindingFlags](https://learn.microsoft.com/search/?terms=System.Reflection.BindingFlags):

```csharp
// Public getter — no BindingFlags needed
MethodInfo getRootIo = pathsType.GetMethod("get_RootIO")
    ?? throw new InvalidOperationException("Accessor method 'get_RootIO' was not found on type 'MyPlugin.Paths'.");
DirectoryInfo rootIo = (DirectoryInfo)getRootIo.Invoke(null, null);

// Non-public setter — must use BindingFlags
MethodInfo setRootIo = pathsType.GetMethod(
    "set_RootIO",
    BindingFlags.Static | BindingFlags.NonPublic)
    ?? throw new InvalidOperationException("Accessor method 'set_RootIO' was not found on type 'MyPlugin.Paths'.");
setRootIo.Invoke(null, new object[] { newValue });
```

The same pattern applies to static fields, which you can access via [System.Reflection.FieldInfo.GetValue*](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.GetValue*) and [System.Reflection.FieldInfo.SetValue*](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue*), and to static methods, which you invoke with [System.Reflection.MethodBase.Invoke*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.Invoke*).

> **Note:**
> If you retrieve a value whose type is defined in the loaded assembly, you might encounter type-conversion issues when you try to cast it in the calling context. For more information, see [Type-conversion issues](#type-conversion-issues).
