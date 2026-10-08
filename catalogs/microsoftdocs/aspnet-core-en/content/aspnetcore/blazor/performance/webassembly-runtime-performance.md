---
title: ASP.NET Core Blazor WebAssembly runtime performance
author: guardrex
description: Learn about ASP.NET Core Blazor WebAssembly runtime performance.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/performance/webassembly-runtime-performance
---
# ASP.NET Core Blazor WebAssembly runtime performance

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


This article provides guidance on Blazor WebAssembly runtime performance.

## Potentially reduced performance with Microsoft Edge enhanced security

The Microsoft Edge browser's WebAssembly (Wasm) interpreter running in [enhanced security mode](https://learn.microsoft.com/DeployEdge/microsoft-edge-security-browse-safer) might not yield the same performance as when Blazor is running without enhanced security. If enhanced security mode is enabled and an app's performance is degraded, we recommend adding the site as an [exception](https://learn.microsoft.com/DeployEdge/microsoft-edge-security-browse-safer#enhanced-security-sites) to opt out of enhanced security mode.

**Applies to: \>= aspnetcore-8.0**

## Trim .NET IL after ahead-of-time (AOT) compilation

The `WasmStripILAfterAOT` MSBuild option enables removing the .NET Intermediate Language (IL) for compiled methods after performing AOT compilation to WebAssembly, which reduces the size of the `_framework` folder.

In the app's project file:

```xml
<PropertyGroup>
  <RunAOTCompilation>true</RunAOTCompilation>
  <WasmStripILAfterAOT>true</WasmStripILAfterAOT>
</PropertyGroup>
```

This setting trims away the IL code for most compiled methods, including methods from libraries and methods in the app. Not all compiled methods can be trimmed, as some are still required by the .NET interpreter at runtime.

To report a problem with the trimming option, [open an issue on the `dotnet/runtime` GitHub repository](https://github.com/dotnet/runtime/issues).

Disable the trimming property if it prevents your app from running normally:

```xml
<WasmStripILAfterAOT>false</WasmStripILAfterAOT>
```



## Heap size for some mobile device browsers

When building a Blazor app that runs on the client and targets mobile device browsers, especially Safari on iOS, decreasing the maximum memory for the app with the MSBuild property `EmccMaximumHeapSize` may be required. For more information, see [blazor/host-and-deploy/webassembly/index#decrease-maximum-heap-size-for-some-mobile-device-browsers](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fwebassembly%2Findex%23decrease-maximum-heap-size-for-some-mobile-device-browsers).

## Runtime relinking

One of the largest parts of a Blazor WebAssembly app is the WebAssembly-based .NET runtime (`dotnet.wasm`) that the browser must download when the app is first accessed by a user's browser. Relinking the .NET WebAssembly runtime trims unused runtime code and thus improves download speed.

Runtime relinking requires installation of the .NET WebAssembly build tools. For more information, see [blazor/tooling#net-webassembly-build-tools](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23net-webassembly-build-tools).

With the .NET WebAssembly build tools installed, runtime relinking is performed automatically when an app is **published** in the `Release` configuration. The size reduction is particularly dramatic when disabling globalization. For more information, see [blazor/globalization-localization#invariant-globalization](https://learn.microsoft.com/search/?terms=blazor%2Fglobalization-localization%23invariant-globalization).

> **Important:**
> Runtime relinking trims class instance JavaScript-invokable .NET methods unless they're protected. For more information, see [blazor/js-interop/call-dotnet-from-javascript#avoid-trimming-javascript-invokable-net-methods](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23avoid-trimming-javascript-invokable-net-methods).

## Single Instruction, Multiple Data (SIMD)

**Applies to: \>= aspnetcore-8.0**

Blazor uses [WebAssembly Single Instruction, Multiple Data (SIMD)](https://wikipedia.org/wiki/Single_instruction,_multiple_data) to improve the throughput of vectorized computations by performing an operation on multiple pieces of data in parallel using a single instruction.

To disable SIMD, for example when targeting old browsers or browsers on mobile devices that don't support SIMD, set the `<WasmEnableSIMD>` property to `false` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <WasmEnableSIMD>false</WasmEnableSIMD>
</PropertyGroup>
```

For more information, see [Configuring and hosting .NET WebAssembly applications: SIMD - Single instruction, multiple data](https://aka.ms/dotnet-wasm-features#simd---single-instruction-multiple-data) and note that the guidance isn't versioned and applies to the latest public release.



**Applies to: < aspnetcore-8.0**

Blazor uses [WebAssembly Single Instruction, Multiple Data (SIMD)](https://wikipedia.org/wiki/Single_instruction,_multiple_data) to improve the throughput of vectorized computations by performing an operation on multiple pieces of data in parallel using a single instruction.

To enable SIMD, add the `<WasmEnableSIMD>` property set to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <WasmEnableSIMD>true</WasmEnableSIMD>
</PropertyGroup>
```

For more information, see [Configuring and hosting .NET WebAssembly applications: SIMD - Single instruction, multiple data](https://aka.ms/dotnet-wasm-features#simd---single-instruction-multiple-data) and note that the guidance isn't versioned and applies to the latest public release.



## Additional resources

* [blazor/performance/webassembly-browser-developer-tools](webassembly-browser-developer-tools-diagnostics.md)
* [blazor/performance/webassembly-event-pipe](webassembly-event-pipe-diagnostics.md)
* [What diagnostic tools are available in .NET Core?](https://learn.microsoft.com/dotnet/core/diagnostics/)
* [.NET diagnostic tools](https://learn.microsoft.com/dotnet/core/diagnostics/tools-overview)
