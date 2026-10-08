---
title: ".NET 8 breaking change: Backslash mapping in Unix file paths"
description: Learn about the .NET 8 breaking change in core .NET libraries where the CoreCLR native runtime no longer maps backslashes to forward slashes in file paths on Unix.
ms.date: 01/30/2023
---
# Backslash mapping in Unix file paths

Backslash (`\`) characters are valid in directory and file names on Unix. Starting in .NET 8, the native CoreCLR runtime no longer converts `\` characters to directory separators&mdash;forward slashes (`/`)&mdash;on Unix. This change enables .NET applications to be located on paths with names that contain backslash characters. It also allows the native runtime, `dotnet` host, and the `ilasm` and `ildasm` tools to access files on paths that contain backslash characters.

## Previous behavior

The native CoreCLR runtime automatically converted backslash (`\`) characters in file paths to forward slashes (`/`) on Unix.

## New behavior

The native CoreCLR runtime doesn't convert any file path characters on Unix.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

Without this change, .NET apps located in directories that contain backslash characters fail to start.

## Recommended action

- Use [System.IO.Path.DirectorySeparatorChar](https://learn.microsoft.com/search/?terms=System.IO.Path.DirectorySeparatorChar) as a directory separator in your app instead of hardcoding it to `\` or `/`.
- Use `/` as a directory separator on Unix in file paths that you pass to the `dotnet` host, hosting APIs, and `ilasm` and `ildasm` tools.
- Use `/` as a directory separator on Unix in file paths in various `DOTNET_xxx` [environment variables](../../../tools/dotnet-environment-variables.md).

## Affected APIs

- Hosting APIs
- [System.Runtime.InteropServices.DllImportAttribute.Value](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute.Value)
- [System.Runtime.InteropServices.NativeLibrary.Load*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.NativeLibrary.Load*)
- [System.Runtime.InteropServices.NativeLibrary.TryLoad*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.NativeLibrary.TryLoad*)
- [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*)
- [System.Reflection.Assembly.LoadFile*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFile*)
- [System.Reflection.Assembly.UnsafeLoadFrom(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.UnsafeLoadFrom(System.String))
- [System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyPath(System.String)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyPath(System.String))
- [System.Runtime.Loader.AssemblyLoadContext.LoadFromNativeImagePath(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadFromNativeImagePath(System.String%2CSystem.String))
- [System.Runtime.Loader.AssemblyLoadContext.LoadUnmanagedDllFromPath(System.String)](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.LoadUnmanagedDllFromPath(System.String))
