---
title: ASP.NET Core Blazor supported platforms
author: guardrex
description: Learn about the supported platforms for ASP.NET Core Blazor.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/supported-platforms
---
# ASP.NET Core Blazor supported platforms

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


**Applies to: \>= aspnetcore-5.0**

Blazor is supported in the browsers shown in the following table on both mobile and desktop platforms.

| Browser | Version |
| --- | --- |
| Apple Safari | Current&dagger; |
| Google Chrome | Current&dagger; |
| Microsoft Edge | Current&dagger; |
| Mozilla Firefox | Current&dagger; |

&dagger;*Current* refers to the latest version of the browser.



**Applies to: < aspnetcore-5.0**

## Blazor WebAssembly

| Browser | Version |
| --- | --- |
| Apple Safari | Current&dagger; |
| Google Chrome | Current&dagger; |
| Microsoft Edge | Current&dagger; |
| Microsoft Internet Explorer | Not Supported |
| Mozilla Firefox | Current&dagger; |

&dagger;*Current* refers to the latest version of the browser.

## Blazor Server

| Browser | Version |
| --- | --- |
| Apple Safari | Current&dagger; |
| Google Chrome | Current&dagger; |
| Microsoft Edge | Current&dagger; |
| Microsoft Internet Explorer | Not Supported |
| Mozilla Firefox | Current&dagger; |

&dagger;*Current* refers to the latest version of the browser.



**Applies to: \>= aspnetcore-6.0**

For [Blazor Hybrid apps](hybrid/index.md), we test on and support the latest platform Web View control versions:

* [Microsoft Edge `WebView2` on Windows](https://learn.microsoft.com/microsoft-edge/webview2/)
* [Chrome on Android](https://play.google.com/store/apps/details?id=com.android.chrome)
* [Safari on iOS and macOS](https://www.apple.com/safari/)



## Additional resources

* [blazor/hosting-models](hosting-models.md)
* [signalr/supported-platforms](../signalr/supported-platforms.md)
