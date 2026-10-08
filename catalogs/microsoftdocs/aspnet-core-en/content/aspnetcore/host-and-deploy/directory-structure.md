---
title: ASP.NET Core directory structure
author: tdykstra
description: Learn about the directory structure of published ASP.NET Core apps.
monikerRange: '>= aspnetcore-2.2'
ms.author: tdykstra
ms.date: 04/09/2020
uid: host-and-deploy/directory-structure
---
# ASP.NET Core directory structure

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

The *publish* directory contains the app's deployable assets produced by the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command. The directory contains:

* Application files
* Configuration files
* Static assets
* Packages
* A runtime ([self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) only)

| App Type | Directory Structure |
| --- | --- |
| [Framework-dependent Executable (FDE)](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-executables-fde) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps; if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}{.EXTENSION}.exe extension on Windows, no extension on macOS or Linux</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li><li>createdump ([Linux createdump utility](https://github.com/dotnet/coreclr/blob/master/Documentation/botr/xplat-minidump-generation.md#configurationpolicy))</li><li>\*.so (Linux shared object library)</li><li>\*.a (macOS archive)</li><li>\*.dylib (macOS dynamic library)</li></ul></li></ul> |
| [Self-contained Deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps, if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}{.EXTENSION} .exe extension on Windows, no extension on macOS or Linux</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li></ul></li></ul> |

&dagger;Indicates a directory

The *publish* directory represents the *content root path*, also called the *application base path*, of the deployment. Whatever name is given to the *publish* directory of the deployed app on the server, its location serves as the server's physical path to the hosted app.

The *wwwroot* directory, if present, only contains static assets.

## Additional resources

* [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish)
* [.NET application deployment](https://learn.microsoft.com/dotnet/core/deploying/)
* [Target frameworks](https://learn.microsoft.com/dotnet/standard/frameworks)
* [.NET RID Catalog](https://learn.microsoft.com/dotnet/core/rid-catalog)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

The *publish* directory contains the app's deployable assets produced by the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command. The directory contains:

* Application files
* Configuration files
* Static assets
* Packages
* A runtime ([self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) only)

| App Type | Directory Structure |
| --- | --- |
| [Framework-dependent Executable (FDE)](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-executables-fde) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps; if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}{.EXTENSION}.exe extension on Windows, no extension on macOS or Linux</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.Views.dll</li><li>{ASSEMBLY NAME}.Views.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li><li>createdump ([Linux createdump utility](https://github.com/dotnet/coreclr/blob/master/Documentation/botr/xplat-minidump-generation.md#configurationpolicy))</li><li>\*.so (Linux shared object library)</li><li>\*.a (macOS archive)</li><li>\*.dylib (macOS dynamic library)</li></ul></li></ul> |
| [Self-contained Deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps, if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}{.EXTENSION} .exe extension on Windows, no extension on macOS or Linux</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.Views.dll</li><li>{ASSEMBLY NAME}.Views.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li></ul></li></ul> |

&dagger;Indicates a directory

The *publish* directory represents the *content root path*, also called the *application base path*, of the deployment. Whatever name is given to the *publish* directory of the deployed app on the server, its location serves as the server's physical path to the hosted app.

The *wwwroot* directory, if present, only contains static assets.

## Additional resources

* [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish)
* [.NET application deployment](https://learn.microsoft.com/dotnet/core/deploying/)
* [Target frameworks](https://learn.microsoft.com/dotnet/standard/frameworks)
* [.NET RID Catalog](https://learn.microsoft.com/dotnet/core/rid-catalog)



**Applies to: < aspnetcore-3.0**

The *publish* directory contains the app's deployable assets produced by the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command. The directory contains:

* Application files
* Configuration files
* Static assets
* Packages
* A runtime ([self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) only)

| App Type | Directory Structure |
| --- | --- |
| [Framework-dependent Executable (FDE)](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-executables-fde) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps; if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}{.EXTENSION} .exe extension on Windows, no extension on macOS or Linux</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.Views.dll</li><li>{ASSEMBLY NAME}.Views.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li><li>createdump ([Linux createdump utility](https://github.com/dotnet/coreclr/blob/master/Documentation/botr/xplat-minidump-generation.md#configurationpolicy))</li><li>\*.so (Linux shared object library)</li><li>\*.a (macOS archive)</li><li>\*.dylib (macOS dynamic library)</li></ul></li></ul> |
| [Self-contained Deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) | <ul><li>publish&dagger;<ul><li>Views&dagger; MVC apps, if views aren't precompiled</li><li>Pages&dagger; MVC or Razor Pages apps, if pages aren't precompiled</li><li>wwwroot&dagger;</li><li>\*.dll files</li><li>{ASSEMBLY NAME}.deps.json</li><li>{ASSEMBLY NAME}.dll</li><li>{ASSEMBLY NAME}.exe</li><li>{ASSEMBLY NAME}.pdb</li><li>{ASSEMBLY NAME}.Views.dll</li><li>{ASSEMBLY NAME}.Views.pdb</li><li>{ASSEMBLY NAME}.runtimeconfig.json</li><li>web.config (IIS deployments)</li></ul></li></ul> |

&dagger;Indicates a directory

The *publish* directory represents the *content root path*, also called the *application base path*, of the deployment. Whatever name is given to the *publish* directory of the deployed app on the server, its location serves as the server's physical path to the hosted app.

The *wwwroot* directory, if present, only contains static assets.

Creating a *Logs* folder is useful for [ASP.NET Core Module enhanced debug logging](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Flogging-and-diagnostics%23enhanced-diagnostic-logs). Folders in the path provided to the `<handlerSetting>` value aren't created by the module automatically and should pre-exist in the deployment to allow the module to write the debug log.

A *Logs* directory can be created for the deployment using one of the following two approaches:

* Add the following `<Target>` element to the project file:

   ```xml
   <Target Name="CreateLogsFolder" AfterTargets="Publish">
     <MakeDir Directories="$(PublishDir)Logs" 
              Condition="!Exists('$(PublishDir)Logs')" />
     <WriteLinesToFile File="$(PublishDir)Logs\.log" 
                       Lines="Generated file" 
                       Overwrite="True" 
                       Condition="!Exists('$(PublishDir)Logs\.log')" />
   </Target>
   ```

   The `<MakeDir>` element creates an empty *Logs* folder in the published output. The element uses the `PublishDir` property to determine the target location for creating the folder. Several deployment methods, such as Web Deploy, skip empty folders during deployment. The `<WriteLinesToFile>` element generates a file in the *Logs* folder, which guarantees deployment of the folder to the server. Folder creation using this approach fails if the worker process doesn't have write access to the target folder.

* Physically create the *Logs* directory on the server in the deployment.

The deployment directory requires Read/Execute permissions. The *Logs* directory requires Read/Write permissions. Additional directories where files are written require Read/Write permissions.

## Additional resources

* [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish)
* [.NET application deployment](https://learn.microsoft.com/dotnet/core/deploying/)
* [Target frameworks](https://learn.microsoft.com/dotnet/standard/frameworks)
* [.NET RID Catalog](https://learn.microsoft.com/dotnet/core/rid-catalog)
