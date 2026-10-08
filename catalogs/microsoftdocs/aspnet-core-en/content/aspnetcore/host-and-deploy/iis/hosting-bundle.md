---
title: Hosting Bundle
author: tdykstra
description: Learn how to configure the .NET Hosting Bundle.  
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 07/29/2025
uid: host-and-deploy/iis/hosting-bundle
---
# The .NET Hosting Bundle

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


The .NET Hosting bundle is an installer for the .NET Runtime and the [ASP.NET Core Module](../aspnet-core-module.md). The bundle allows ASP.NET Core apps to run with IIS.

## Install the .NET Hosting Bundle

> **Important:**
> If the Hosting Bundle is installed before IIS, the bundle installation must be repaired. Run the Hosting Bundle installer again after installing IIS.
>
> If the Hosting Bundle is installed after installing the 64-bit (x64) version of .NET, SDKs might appear to be missing ([No .NET SDKs were detected](https://learn.microsoft.com/search/?terms=test%2Ftroubleshoot%23no-net-sdks-were-detected)). To resolve the problem, see [test/troubleshoot#missing-sdk-after-installing-the-net-hosting-bundle](https://learn.microsoft.com/search/?terms=test%2Ftroubleshoot%23missing-sdk-after-installing-the-net-hosting-bundle).

Breaking changes and security advisories are reported on the [Announcements repo](https://github.com/aspnet/Announcements/issues). Announcements can be limited to a specific version by selecting a **Label** filter.


## Direct download

Download the installer using the following links:

* Current version: [.NET Hosting Bundle installer (direct download)](https://dotnet.microsoft.com/permalink/dotnetcore-current-windows-runtime-bundle-installer)
* [Previous and pre-release versions](https://dotnet.microsoft.com/en-us/download/dotnet)

## Visual C++ Redistributable Requirement

On older versions of Windows, for example Windows Server 2012 R2, install the Visual Studio C++ 2015, 2017, 2019 Redistributable. Otherwise, a confusing error message in the Windows Event Log reports that `The data is the error.`

[Current x64 VS C++ redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe)
[Current x86 VS C++ redistributable](https://aka.ms/vs/17/release/vc_redist.x86.exe)

## Earlier versions of the installer

To obtain an earlier version of the installer:

1. Navigate to the [Download .NET](https://dotnet.microsoft.com/download/dotnet-core) page.
1. Select the desired .NET version.
1. In the **Run apps - Runtime** column, find the row of the .NET runtime version desired.
1. Download the installer using the **Hosting Bundle** link.

> **Warning:**
> Some installers contain release versions that have reached their end of life (EOL) and are no longer supported by Microsoft. For more information, see the [support policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core).
>
> The [ASP.NET Core Module](../aspnet-core-module.md) is forward and backward compatible with [in-support releases of .NET](https://dotnet.microsoft.com/platform/support/policy/dotnet-core#lifecycle).

## Options

1. The following parameters are available when running the installer from an administrator command shell:

   * `OPT_NO_ANCM=1`: Skip installing the ASP.NET Core Module.
   * `OPT_NO_RUNTIME=1`: Skip installing the .NET runtime. Used when the server only hosts [self-contained deployments (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd).
   * `OPT_NO_SHAREDFX=1`: Skip installing the ASP.NET Shared Framework (ASP.NET runtime). Used when the server only hosts [self-contained deployments (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd).
   * `OPT_NO_X86=1`: Skip installing x86 runtimes. Use this parameter when you know that you won't be hosting 32-bit apps. If there's any chance that you will host both 32-bit and 64-bit apps in the future, don't use this parameter and install both runtimes.
   * `OPT_NO_SHARED_CONFIG_CHECK=1`: Disable the check for using an IIS Shared Configuration when the shared configuration (`applicationHost.config`) is on the same machine as the IIS installation. *Only available for ASP.NET Core 2.2 or later Hosting Bundler installers.* For more information, see [host-and-deploy/iis/advanced#aspnet-core-module-with-an-iis-shared-configuration](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Fadvanced%23aspnet-core-module-with-an-iis-shared-configuration).

> **Note:**
> For information on IIS Shared Configuration, see [ASP.NET Core Module with IIS Shared Configuration](https://learn.microsoft.com/search/?terms=host-and-deploy%2Faspnet-core-module%23aspnet-core-module-with-an-iis-shared-configuration).

> **Note:**
> When running the Hosting Bundle installer with options set, the value for each option is saved in the registry. Subsequent installs from the same Major.Minor version band use the same options, unless another set of options is explicitly passed from the command line. If the first install of the hosting bundle has no options passed, each option gets a default value of `0` written in to the registry. A value of `0` implies that the option is off, meaning the user is not opting out of the given component.

## Restart IIS

After the Hosting Bundle is installed, a manual IIS restart may be required. For example, the `dotnet` CLI tooling (command) might not exist on the PATH for running IIS worker processes.

To manually restart IIS, stop the Windows Process Activation Service (WAS) and then restart the World Wide Web Publishing Service (W3SVC) and any dependent services. Execute the following commands in an elevated command shell:

```console
net stop was /y
net start w3svc
```

## Module version and Hosting Bundle installer logs

To determine the version of the installed ASP.NET Core Module:

1. On the hosting system, navigate to `%PROGRAMFILES%\IIS\Asp.Net Core Module\V2`.
1. Locate the `aspnetcorev2.dll` file.
1. Right-click the file and select **Properties** from the contextual menu.
1. Select the **Details** tab. The **File version** and **Product version** represent the installed version of the module.

The Hosting Bundle installer logs for the module are found at `C:\Users\%UserName%\AppData\Local\Temp`. The file is named `dd_DotNetCoreWinSvrHosting__{TIMESTAMP}_000_AspNetCoreModule_x64.log`, where the placeholder `{TIMESTAMP}` is the timestamp of the file.
