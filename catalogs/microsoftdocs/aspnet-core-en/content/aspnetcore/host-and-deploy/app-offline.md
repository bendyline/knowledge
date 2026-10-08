---
title: App Offline file (app_offline.htm)
author: wadepickett
description: Learn how the App Offline file (`app_offline.htm`) works with the ASP.NET Core Module.
monikerRange: '>= aspnetcore-5.0'
ms.author: wpickett
ms.date: 1/13/2020
uid: host-and-deploy/iis/app-offline
---
# App Offline file (`app_offline.htm`)

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


The App Offline file (`app_offline.htm`) is used by the ASP.NET Core Module to shut down an app.

If a file with the name `app_offline.htm` is detected in the root directory of an app, the ASP.NET Core Module attempts to gracefully shut down the app and stop processing incoming requests. If the app is still running after the number of seconds defined in `shutdownTimeLimit`, the ASP.NET Core Module stops the running process.

While the `app_offline.htm` file is present, the ASP.NET Core Module responds to requests by sending back the contents of the `app_offline.htm` file. The `app_offline.htm` must be less than 4 GB. When the `app_offline.htm` file is removed, the next request starts the app.

When using the out-of-process hosting model, the app might not shut down immediately if there's an open connection. For example, a WebSocket connection may delay app shut down.

## Locked deployment files

Files in the deployment folder are locked when the app is running. Locked files can't be overwritten during deployment.

`app_offline.htm` is the primary mechanism to release locked files. `app_offline.htm` is used by Web Deploy to properly stop and start the app.

`app_offline.htm` can be manually used to start and stop the app (requires PowerShell 5 or later):

```powershell
$pathToApp = '{PATH TO APP}'


New-Item -Path $pathToApp -Name "app_offline.htm" -ItemType "file"

# Provide script commands here to deploy the app

Remove-Item -Path $pathToApp\app_offline.htm
```

In the preceding PowerShell script:

* The placeholder `{PATH TO APP}` is the path to the app.
* The `New-Item` command stops the app pool.
* The `Remove-Item` command starts the app pool.
* Commands between the `New-Item` command and the `Remove-Item` command are provided by the developer to deploy the app.

Files can also be unlocked by manually stopping the app pool in the IIS Manager on the server. Don't use the `app_offline.htm` file when using the IIS Manager to stop and restart the app pool.
