---
title: ASP.NET Core Blazor app download size performance best practices
author: guardrex
description: Tips for reducing app download size in ASP.NET Core Blazor apps and avoiding common performance problems.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/performance/app-download-size
---
# ASP.NET Core Blazor app download size performance best practices

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


**Applies to: \>= aspnetcore-6.0**

## Runtime relinking

For information on how runtime relinking minimizes an app's download size, see [blazor/tooling/webassembly#runtime-relinking](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%2Fwebassembly%23runtime-relinking).



## Use `System.Text.Json`

Blazor's JS interop implementation relies on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json), which is a high-performance JSON serialization library with low memory allocation. Using [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) shouldn't result in additional app payload size over adding one or more alternate JSON libraries.

For migration guidance, see [How to migrate from `Newtonsoft.Json` to `System.Text.Json`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to).

## Intermediate Language (IL) trimming

*This section only applies to client-side Blazor scenarios.*

**Applies to: \>= aspnetcore-5.0**

Trimming unused assemblies from a Blazor WebAssembly app reduces the app's size by removing unused code in the app's binaries. For more information, see [blazor/host-and-deploy/configure-trimmer](../host-and-deploy/configure-trimmer.md).



**Applies to: < aspnetcore-5.0**

[Linking a Blazor WebAssembly app](../host-and-deploy/configure-linker.md) reduces the app's size by trimming unused code in the app's binaries. The Intermediate Language (IL) Linker is only enabled when building in `Release` configuration. To benefit from this, publish the app for deployment using the [`dotnet publish`](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command with the [-c|--configuration](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish#options) option set to `Release`:

```dotnetcli
dotnet publish -c Release
```



## Lazy load assemblies

*This section only applies to client-side Blazor scenarios.*

Load assemblies at runtime when the assemblies are required by a route. For more information, see [blazor/webassembly-lazy-load-assemblies](../webassembly-lazy-load-assemblies.md).

## Compression

*This section only applies to Blazor WebAssembly apps.*

When a Blazor WebAssembly app is published, the output is statically compressed during publish to reduce the app's size and remove the overhead for runtime compression. Blazor relies on the server to perform content negotiation and serve statically-compressed files.

After an app is deployed, verify that the app serves compressed files. Inspect the **Network** tab in a browser's [developer tools](https://developer.mozilla.org/docs/Glossary/Developer_Tools) and verify that the files are served with `Content-Encoding: br` (Brotli compression) or `Content-Encoding: gz` (Gzip compression). If the host isn't serving compressed files, follow the instructions in [blazor/host-and-deploy/webassembly/index#compression](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fwebassembly%2Findex%23compression).

## Disable unused features

*This section only applies to client-side Blazor scenarios.*

Blazor WebAssembly's runtime includes the following .NET features that can be disabled for a smaller payload size.

Blazor WebAssembly carries globalization resources required to display values, such as dates and currency, in the user's culture. If the app doesn't require localization, you may configure the app to [support the invariant culture](https://learn.microsoft.com/search/?terms=blazor%2Fglobalization-localization%23invariant-globalization), which is based on the `en-US` culture. Apply the `<InvariantGlobalization>` MSBuild property with a value of `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>
```

**Applies to: \>= aspnetcore-8.0**

Adopting [invariant globalization](https://learn.microsoft.com/search/?terms=blazor%2Fglobalization-localization%23invariant-globalization) only results in using non-localized timezone names. To trim timezone code and data from the app, apply the `<InvariantTimezone>` MSBuild property with a value of `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantTimezone>true</InvariantTimezone>
</PropertyGroup>
```

> **Note:**
> [`<BlazorEnableTimeZoneSupport>`](https://learn.microsoft.com/search/?terms=blazor%2Fperformance%2Fapp-download-size%23disable-unused-features) overrides an earlier `<InvariantTimezone>` setting. We recommend removing the `<BlazorEnableTimeZoneSupport>` setting.



**Applies to: < aspnetcore-8.0**

A data file is included to make timezone information correct. If the app doesn't require this feature, consider disabling it by setting the `<BlazorEnableTimeZoneSupport>` MSBuild property to `false` in the app's project file:

```xml
<PropertyGroup>
  <BlazorEnableTimeZoneSupport>false</BlazorEnableTimeZoneSupport>
</PropertyGroup>
```



**Applies to: < aspnetcore-5.0**

Collation information is included to make APIs such as [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase) work correctly. If you're certain that the app doesn't require the collation data, consider disabling it by setting the `BlazorWebAssemblyPreserveCollationData` MSBuild property in the app's project file to `false`:

```xml
<PropertyGroup>
  <BlazorWebAssemblyPreserveCollationData>false</BlazorWebAssemblyPreserveCollationData>
</PropertyGroup>
```



## Additional resources

[Configuring and hosting .NET WebAssembly applications](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md)
