---
title: "Breaking change - Specifying DllImportSearchPath.AssemblyDirectory only searches the assembly directory"
description: "Learn about the breaking change in .NET 10 where specifying DllImportSearchPath.AssemblyDirectory as the only search flag restricts the search to the assembly directory."
ms.date: 5/9/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/45911
---

# Specifying DllImportSearchPath.AssemblyDirectory only searches the assembly directory

Starting in .NET 10, if you specify [System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory) as the only search flag, the runtime searches exclusively in the assembly directory. This change affects the behavior of P/Invokes and the [System.Runtime.InteropServices.NativeLibrary](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.NativeLibrary) class.

## Version introduced

.NET 10

## Previous behavior

Previously, when [System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory) was specified as the only search flag, the runtime searched the assembly directory first. If the library was not found, it fell back to the operating system's default library search behavior.

For example, with the following code, the runtime would search the assembly directory and then fall back to the OS search paths.

```csharp
[DllImport("example.dll", DllImportSearchPath = DllImportSearchPath.AssemblyDirectory)]
public static extern void ExampleMethod();
```

## New behavior

Starting in .NET 10, when [System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory) is specified as the only search flag, the runtime searches only in the assembly directory. It *doesn't* fall back to the operating system's default library search behavior.

The previous code example now only searches the assembly directory for *example.dll*. If the library is not found there, a [System.DllNotFoundException](https://learn.microsoft.com/search/?terms=System.DllNotFoundException) is thrown.

## Type of breaking change

This is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The fallback behavior when specifying [System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory) caused confusion and was inconsistent with the design of search flags. This change ensures clarity and consistency in behavior.

## Recommended action

If fallback behavior is required, avoid specifying an explicit [System.Runtime.InteropServices.DllImportSearchPath](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportSearchPath). By default, when no flags are specified, the runtime searches the assembly directory and then falls back to the operating system's default library search behavior.

Example:

```csharp
[DllImport("example.dll")]
public static extern void ExampleMethod();
```

## Affected APIs

- P/Invokes using [System.Runtime.InteropServices.DefaultDllImportSearchPathsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DefaultDllImportSearchPathsAttribute)
- [System.Runtime.InteropServices.NativeLibrary.Load*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.NativeLibrary.Load*)
- [System.Runtime.InteropServices.NativeLibrary.TryLoad*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.NativeLibrary.TryLoad*)

## See also

- [Single-file apps no longer look for native libraries in executable directory](native-library-search.md)
