---
title: Host and deploy ASP.NET Core
author: tdykstra
description: Learn how to set up hosting environments and deploy ASP.NET Core apps.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 04/22/2026
uid: host-and-deploy/index
---
# Host and deploy ASP.NET Core

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


**Applies to: \>= aspnetcore-2.2**

In general, to deploy an ASP.NET Core app to a hosting environment:

* Deploy the published app to a folder on the hosting server.
* Set up a process manager that starts the app when requests arrive and restarts the app after it crashes or the server reboots.
* For configuration of a reverse proxy, set up a reverse proxy to forward requests to the app.

For Blazor host and deploy guidance, which adds to or supersedes the guidance in this node, see [blazor/host-and-deploy/index](../blazor/host-and-deploy/index.md).

## Publish to a folder

The [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command compiles app code and copies the files required to run the app into a *publish* folder. When deploying from Visual Studio, the `dotnet publish` step occurs automatically before the files are copied to the deployment destination.

### Run the published app locally

To run the published app locally, run `dotnet <ApplicationName>.dll` from the *publish* folder.

## Publish settings files

`*.json` files are published by default. To publish other settings files, specify them in an [`<ItemGroup><Content Include= ... />`](https://learn.microsoft.com/visualstudio/msbuild/common-msbuild-project-items#content) element in the project file. The following example publishes XML files:

```xml
<ItemGroup>
  <Content Include="**\*.xml" Exclude="bin\**\*;obj\**\*"
    CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

### Folder contents

The *publish* folder contains one or more app assembly files, dependencies, and optionally the .NET runtime.

A .NET Core app can be published as *self-contained deployment* or *framework-dependent deployment*. If the app is self-contained, the assembly files that contain the .NET runtime are included in the *publish* folder. If the app is framework-dependent, the .NET runtime files aren't included because the app has a reference to a version of .NET that's installed on the server. The default deployment model is framework-dependent. For more information, see [.NET Core application deployment](https://learn.microsoft.com/dotnet/core/deploying/).

In addition to *.exe* and *.dll* files, the *publish* folder for an ASP.NET Core app typically contains configuration files, static assets, and MVC views. For more information, see [host-and-deploy/directory-structure](directory-structure.md).

## Set up a process manager

An ASP.NET Core app is a console app that must be started when a server boots and restarted if it crashes. To automate starts and restarts, a process manager is required. The most common process managers for ASP.NET Core are:

* Linux
  * [Nginx](linux-nginx.md)
* Windows
  * [IIS](iis/index.md)
  * [Windows Service](windows-service.md)

## Set up a reverse proxy

If the app uses the [Kestrel](../fundamentals/servers/kestrel.md) server, [Nginx](linux-nginx.md), or [IIS](iis/index.md) can be used as a reverse proxy server. A reverse proxy server receives HTTP requests from the Internet and forwards them to Kestrel.



**Applies to: \>= aspnetcore-5.0**
Either configuration&mdash;with or without a reverse proxy server&mdash;is a supported hosting configuration. For more information, see [When to use Kestrel with a reverse proxy](../fundamentals/servers/kestrel/when-to-use-a-reverse-proxy.md).


**Applies to: \>= aspnetcore-2.2 < aspnetcore-5.0**
Either configuration&mdash;with or without a reverse proxy server&mdash;is a supported hosting configuration. For more information, see [When to use Kestrel with a reverse proxy](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23when-to-use-kestrel-with-a-reverse-proxy).


**Applies to: \>= aspnetcore-2.2**

## Proxy server and load balancer scenarios

Additional configuration might be required for apps hosted behind proxy servers and load balancers. Without additional configuration, an app might not have access to the scheme (HTTP/HTTPS) and the remote IP address where a request originated. For more information, see [Configure ASP.NET Core to work with proxy servers and load balancers](proxy-load-balancer.md).

## Use Visual Studio and MSBuild to automate deployments

Deployment often requires additional tasks besides copying the output from [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) to a server. For example, extra files might be required or excluded from the *publish* folder. Visual Studio uses [MSBuild](https://learn.microsoft.com/visualstudio/msbuild/msbuild) for web deployment, and MSBuild can be customized to do many other tasks during deployment. For more information, see [host-and-deploy/visual-studio-publish-profiles](visual-studio-publish-profiles.md) and the [Using MSBuild and Team Foundation Build](https://www.microsoftpressstore.com/store/inside-the-microsoft-build-engine-using-msbuild-and-9780735645240) book.

By using [the Publish Web feature](../tutorials/publish-to-azure-webapp-using-vs.md), apps can be deployed directly from Visual Studio to the Azure App Service. Azure DevOps Services supports [continuous deployment to Azure App Service](https://learn.microsoft.com/azure/devops/pipelines/targets/webapp). For more information, see [DevOps for ASP.NET Core Developers](https://learn.microsoft.com/dotnet/architecture/devops-for-aspnet-developers).

## Publish to Azure

See [tutorials/publish-to-azure-webapp-using-vs](../tutorials/publish-to-azure-webapp-using-vs.md) for instructions on how to publish an app to Azure using Visual Studio. An additional example is provided by [Create an ASP.NET Core web app in Azure](https://learn.microsoft.com/azure/app-service/app-service-web-get-started-dotnet).

## Publish with MSDeploy on Windows

See [host-and-deploy/visual-studio-publish-profiles](visual-studio-publish-profiles.md) for instructions on how to publish an app with a Visual Studio publish profile, including from a Windows command prompt using the [dotnet msbuild](https://learn.microsoft.com/dotnet/core/tools/dotnet-msbuild) command.

## Internet Information Services (IIS)

For deployments to Internet Information Services (IIS) with configuration provided by the *web.config* file, see the articles under [host-and-deploy/iis/index](iis/index.md).

## Host in a web farm

For information on configuration for hosting ASP.NET Core apps in a web farm environment (for example, deployment of multiple instances of your app for scalability), see [host-and-deploy/web-farm](web-farm.md).

## Host on Docker

For more information, see [host-and-deploy/docker/index](docker/index.md).

## Perform health checks

Use health checks middleware to perform health checks on an app and its dependencies. For more information, see [host-and-deploy/health-checks](health-checks.md).

## Additional resources

* [.NET application publishing overview](https://learn.microsoft.com/dotnet/core/deploying)
* [test/troubleshoot](../test/troubleshoot.md)
* [ASP.NET Hosting](https://dotnet.microsoft.com/apps/aspnet/hosting)



**Applies to: < aspnetcore-2.2**

In general, to deploy an ASP.NET Core app to a hosting environment:

* Deploy the published app to a folder on the hosting server.
* Set up a process manager that starts the app when requests arrive and restarts the app after it crashes or the server reboots.
* For configuration of a reverse proxy, set up a reverse proxy to forward requests to the app.

## Publish to a folder

The [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command compiles app code and copies the files required to run the app into a *publish* folder. When deploying from Visual Studio, the `dotnet publish` step occurs automatically before the files are copied to the deployment destination.

### Folder contents

The *publish* folder contains one or more app assembly files, dependencies, and optionally the .NET runtime.

A .NET Core app can be published as *self-contained deployment* or *framework-dependent deployment*. If the app is self-contained, the assembly files that contain the .NET runtime are included in the *publish* folder. If the app is framework-dependent, the .NET runtime files aren't included because the app has a reference to a version of .NET that's installed on the server. The default deployment model is framework-dependent. For more information, see [.NET Core application deployment](https://learn.microsoft.com/dotnet/core/deploying/).

In addition to *.exe* and *.dll* files, the *publish* folder for an ASP.NET Core app typically contains configuration files, static assets, and MVC views. For more information, see [host-and-deploy/directory-structure](directory-structure.md).

## Set up a process manager

An ASP.NET Core app is a console app that must be started when a server boots and restarted if it crashes. To automate starts and restarts, a process manager is required. The most common process managers for ASP.NET Core are:

* Linux
  * [Nginx](linux-nginx.md)
* Windows
  * [IIS](iis/index.md)
  * [Windows Service](windows-service.md)

## Set up a reverse proxy

If the app uses the [Kestrel](../fundamentals/servers/kestrel.md) server, [Nginx](linux-nginx.md), or [IIS](iis/index.md) can be used as a reverse proxy server. A reverse proxy server receives HTTP requests from the Internet and forwards them to Kestrel.

Either configuration&mdash;with or without a reverse proxy server&mdash;is a supported hosting configuration. For more information, see [When to use Kestrel with a reverse proxy](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23when-to-use-kestrel-with-a-reverse-proxy).

## Proxy server and load balancer scenarios

Additional configuration might be required for apps hosted behind proxy servers and load balancers. Without additional configuration, an app might not have access to the scheme (HTTP/HTTPS) and the remote IP address where a request originated. For more information, see [Configure ASP.NET Core to work with proxy servers and load balancers](proxy-load-balancer.md).

## Use Visual Studio and MSBuild to automate deployments

Deployment often requires additional tasks besides copying the output from [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) to a server. For example, extra files might be required or excluded from the *publish* folder. Visual Studio uses MSBuild for web deployment, and MSBuild can be customized to do many other tasks during deployment. For more information, see [host-and-deploy/visual-studio-publish-profiles](visual-studio-publish-profiles.md) and the [Using MSBuild and Team Foundation Build](https://www.microsoftpressstore.com/store/inside-the-microsoft-build-engine-using-msbuild-and-9780735645240) book.

By using [the Publish Web feature](../tutorials/publish-to-azure-webapp-using-vs.md), apps can be deployed directly from Visual Studio to the Azure App Service. Azure DevOps Services supports [continuous deployment to Azure App Service](https://learn.microsoft.com/azure/devops/pipelines/targets/webapp). For more information, see [DevOps for ASP.NET Core Developers](https://learn.microsoft.com/dotnet/architecture/devops-for-aspnet-developers).

## Publish to Azure

See [tutorials/publish-to-azure-webapp-using-vs](../tutorials/publish-to-azure-webapp-using-vs.md) for instructions on how to publish an app to Azure using Visual Studio. An additional example is provided by [Create an ASP.NET Core web app in Azure](https://learn.microsoft.com/azure/app-service/app-service-web-get-started-dotnet).

## Publish with MSDeploy on Windows

See [host-and-deploy/visual-studio-publish-profiles](visual-studio-publish-profiles.md) for instructions on how to publish an app with a Visual Studio publish profile, including from a Windows command prompt using the [dotnet msbuild](https://learn.microsoft.com/dotnet/core/tools/dotnet-msbuild) command.

## Internet Information Services (IIS)

For deployments to Internet Information Services (IIS) with configuration provided by the *web.config* file, see the articles under [host-and-deploy/iis/index](iis/index.md).

## Host in a web farm

For information on configuration for hosting ASP.NET Core apps in a web farm environment (for example, deployment of multiple instances of your app for scalability), see [host-and-deploy/web-farm](web-farm.md).

## Host on Docker

For more information, see [host-and-deploy/docker/index](docker/index.md).

## Additional resources

* [.NET application publishing overview](https://learn.microsoft.com/dotnet/core/deploying)
* [test/troubleshoot](../test/troubleshoot.md)
* [ASP.NET Hosting](https://dotnet.microsoft.com/apps/aspnet/hosting)
