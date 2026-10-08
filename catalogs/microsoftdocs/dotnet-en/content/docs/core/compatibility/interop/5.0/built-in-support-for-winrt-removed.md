---
title: "Breaking change: Built-in support for WinRT is removed from .NET"
description: Learn about the interop breaking change in .NET 5 where built-in support for WinRT is removed from .NET.
ms.date: 03/29/2022
---
# Built-in support for WinRT is removed from .NET

Built-in support for consumption of [Windows runtime (WinRT)](https://learn.microsoft.com/uwp/winrt-cref/winrt-type-system) APIs in .NET is removed.

## Version introduced

5.0

## Change description

Previously, CoreCLR could consume [Windows metadata (WinMD) files](https://learn.microsoft.com/uwp/winrt-cref/winmd-files) to active and consume WinRT types. Starting in .NET 5, CoreCLR can no longer consume WinMD files directly.

If you attempt to reference an unsupported assembly, you'll get a [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException). If you activate a WinRT class, you'll get a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

This breaking change was made for the following reasons:

- So WinRT can be developed and improved separately from the .NET runtime.
- For symmetry with interop systems provided for other operating systems, such as iOS and Android.
- To take advantage of other .NET features, such as C# features, intermediate language (IL) trimming, and ahead-of-time (AOT) compilation.
- To simplify the .NET runtime codebase.

## Recommended action

- Remove references to the [Microsoft.Windows.SDK.Contracts package](https://www.nuget.org/packages/Microsoft.Windows.SDK.Contracts).  Instead, specify the version of the Windows APIs that you want to access via the `TargetFramework` property of the project.  For example:

  ```xml
  <TargetFramework>net5.0-windows10.0.19041.0</TargetFramework>
  ```

- If you're consuming a third-party runtime component that's defined in a *.winmd* file, add a reference to the [Microsoft.Windows.CsWinRT NuGet package](https://www.nuget.org/packages/Microsoft.Windows.CsWinRT/). For information on how to generate the C# projection, see the [C#/WinRT](https://learn.microsoft.com/windows/uwp/csharp-winrt/) documentation.

For more information, see [Call Windows Runtime APIs in desktop apps](https://learn.microsoft.com/windows/apps/desktop/modernize/desktop-to-uwp-enhance).

## Affected APIs

- [System.IO.WindowsRuntimeStorageExtensions](https://learn.microsoft.com/search/?terms=System.IO.WindowsRuntimeStorageExtensions)
- [System.IO.WindowsRuntimeStreamExtensions](https://learn.microsoft.com/search/?terms=System.IO.WindowsRuntimeStreamExtensions)
- [System.Runtime.InteropServices.WindowsRuntime](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.WindowsRuntime)
- [System.WindowsRuntimeSystemExtensions](https://learn.microsoft.com/search/?terms=System.WindowsRuntimeSystemExtensions)
- [Windows.Foundation.Point](https://learn.microsoft.com/search/?terms=Windows.Foundation.Point)
- [Windows.Foundation.Size](https://learn.microsoft.com/search/?terms=Windows.Foundation.Size)
- [Windows.UI.Color](https://learn.microsoft.com/search/?terms=Windows.UI.Color)

<!--

### Affected APIs

- `T:System.IO.WindowsRuntimeStorageExtensions`
- `T: System.IO.WindowsRuntimeStreamExtensions`
- `N:System.Runtime.InteropServices.WindowsRuntime`
- `T:System.WindowsRuntimeSystemExtensions`
- `T:Windows.Foundation.Point`
- `T:Windows.Foundation.Size`
- `T:Windows.UI.Color`

### Category

Interop

-->
