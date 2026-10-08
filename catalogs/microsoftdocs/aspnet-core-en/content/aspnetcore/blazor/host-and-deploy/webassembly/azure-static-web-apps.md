---
title: Host and deploy ASP.NET Core standalone Blazor WebAssembly with Azure Static Web Apps
author: guardrex
description: Learn how to host and deploy standalone Blazor WebAssembly with Microsoft Azure Static Web Apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/host-and-deploy/webassembly/azure-static-web-apps
---
# Host and deploy ASP.NET Core standalone Blazor WebAssembly with Azure Static Web Apps

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


This article explains how to host and deploy standalone Blazor WebAssembly with [Microsoft Azure Static Web Apps](https://azure.microsoft.com/products/app-service/static).

## App configuration

To ensure that requests for any path return `index.html`, set a navigation fallback route.

Create a file named `staticwebapp.config.json` in the project's root folder with the following content:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

## Deploy from Visual Studio

To deploy a standalone Blazor WebAssembly app from Visual Studio:

* Save any unsaved work in the project, as a Visual Studio restart might be required during the process.
* Follow the guidance at [Deploy a Blazor app on Azure Static Web Apps: Deploy from Visual Studio (Azure Static Web Apps documentation)](https://learn.microsoft.com/azure/static-web-apps/deploy-blazor#deploy-from-visual-studio).

## GitHub deployment scenarios

* Visual Studio Code: [Quickstart: Build your first static site with Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/getting-started?tabs=blazor)
* .NET CLI: [Deploy Blazor websites to the cloud with Azure Static Web Apps (Video)](https://learn.microsoft.com/shows/deploy-websites-to-the-cloud-with-azure-static-web-apps/deploy-blazor-websites-to-the-cloud-with-azure-static-web-apps)
* Deploy from GitHub: [Tutorial: Building a static web app with Blazor in Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/deploy-blazor)
