---
title: Publish ASP.NET Core Blazor Hybrid apps
author: guardrex
description: Learn about publishing ASP.NET Core Blazor Hybrid apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/publish/index
---
# Publish ASP.NET Core Blazor Hybrid apps

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


This article explains how to publish Blazor Hybrid apps.

## Publish for a specific framework

Blazor Hybrid supports .NET MAUI, WPF, and Windows Forms. The publishing steps for apps using Blazor Hybrid are nearly identical to the publishing steps for the target platform.

* WPF and Windows Forms
  * [.NET application publishing overview](https://learn.microsoft.com/dotnet/core/deploying/)
* .NET MAUI
  * [Windows](https://learn.microsoft.com/dotnet/maui/windows/deployment/overview)
  * [Android](https://learn.microsoft.com/dotnet/maui/android/deployment/overview)
  * [iOS](https://learn.microsoft.com/dotnet/maui/ios/deployment/overview)
  * [macOS](https://learn.microsoft.com/dotnet/maui/macos/deployment/overview)

## Blazor-specific considerations

Blazor Hybrid apps require a Web View on the host platform. For more information, see [Keep the Web View current in deployed Blazor Hybrid apps](https://learn.microsoft.com/search/?terms=blazor%2Fhybrid%2Fsecurity%2Fsecurity-considerations%23keep-the-web-view-current-in-deployed-apps).
