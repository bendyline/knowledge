---
title: ".NET 7 breaking change: Collectible Assembly in non-collectible AssemblyLoadContext"
description: Learn about the .NET 7 breaking change in core .NET libraries where resolving a collectible Assembly in a non-collectible AssemblyLoadContext results in a FileLoadException.
ms.date: 05/10/2022
---
# Collectible Assembly in non-collectible AssemblyLoadContext

.NET incorrectly allowed garbage-collectible assemblies to resolve into a non-collectible [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext). In some cases, this lead to runtime crashes or unexpected [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) exceptions. This change prevents the incorrect behavior by throwing an exception when the [System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)) or [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event returns a collectible [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly) and the [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) is non-collectible.

## Previous behavior

Returning a collectible [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly) in the [System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)) override or the [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event of a non-collectible [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) doesn't cause any exceptions to be thrown.

## New behavior

Returning a collectible [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly) in the [System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)) override or the [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event of a non-collectible [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) throws a [System.IO.FileLoadException](https://learn.microsoft.com/search/?terms=System.IO.FileLoadException) with a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) as the inner exception.

## Version introduced

.NET 7

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

This change fixes a bug. The collectible [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly) would be garbage-collected while the [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) that has a reference to it is alive for the rest of the process lifetime. If the code running in that context references anything from that `Assembly` after it's collected, it would crash the runtime or result in a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), [System.AccessViolationException](https://learn.microsoft.com/search/?terms=System.AccessViolationException), or other kinds of bad behavior.

## Recommended action

Don't return collectible assemblies in [System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)) or the [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event of a non-collectible [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext). A possible workaround is to change the `AssemblyLoadContext` to be collectible by passing `true` for the `isCollectible` parameter in its constructor, and then keep a reference to that `AssemblyLoadContext` forever to make sure it's never collected.

## Affected APIs

- [System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load(System.Reflection.AssemblyName))
- [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event

## See also

- [Use collectible AssemblyLoadContext](../../../../standard/assembly/unloadability.md#use-collectible-assemblyloadcontext)
