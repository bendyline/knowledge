---
title: Host ASP.NET Core in Docker containers
author: wadepickett
description: Discover links to resources for learning how to host ASP.NET Core apps in Docker containers.
ms.author: wpickett
ms.date: 01/08/2018
uid: host-and-deploy/docker/index
---
# Host ASP.NET Core in Docker containers

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


The following articles are available for learning about hosting ASP.NET Core apps in Docker:

[Introduction to Containers and Docker](https://learn.microsoft.com/dotnet/standard/microservices-architecture/container-docker-introduction/index)  
See how containerization is an approach to software development in which an application or service, its dependencies, and its configuration are packaged together as a container image. The image can be tested and then deployed to a host.

[What is Docker](https://learn.microsoft.com/dotnet/standard/microservices-architecture/container-docker-introduction/docker-defined)  
Discover how Docker is an open-source project for automating the deployment of apps as portable, self-sufficient containers that can run on the cloud or on-premises.

[Docker Terminology](https://learn.microsoft.com/dotnet/standard/microservices-architecture/container-docker-introduction/docker-terminology)  
Learn terms and definitions for Docker technology.

[Docker containers, images, and registries](https://learn.microsoft.com/dotnet/standard/microservices-architecture/container-docker-introduction/docker-containers-images-registries)  
Find out how Docker container images are stored in an image registry for consistent deployment across environments.

[host-and-deploy/docker/building-net-docker-images](building-net-docker-images.md)
Learn how to build and dockerize an ASP.NET Core app. Explore Docker images maintained by Microsoft and examine use cases.

[.NET Docker samples](https://github.com/dotnet/dotnet-docker/tree/main/samples)
Samples and guidance that demonstrate how to use .NET and Docker for development, testing and production.

[Visual Studio Container Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)  
Discover how Visual Studio supports building, debugging, and running containerized apps, including an ASP.NET Core example. Both Windows and Linux containers are supported.

[Publish to Azure Container Registry](https://learn.microsoft.com/azure/vs-azure-tools-docker-hosting-web-apps-in-docker)  
Find out how to use the Visual Studio Container Tools extension to deploy an ASP.NET Core app to a Docker host on Azure using PowerShell.

[Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)  
Additional configuration might be required for apps hosted behind proxy servers and load balancers. Passing requests through a proxy often obscures information about the original request, such as the scheme and client IP. It might be necessary to forward some information about the request manually to the app.

[GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
Discusses GC selection with small containers.

<a name="d128"></a>

## System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached

Disabling `reloadOnChange` can significantly reduce the number of opened files. To disable reloading configuration files, set the environment variable `DOTNET_HOSTBUILDER__RELOADCONFIGONCHANGE=false`

For alternative approaches or to leave feedback on this problem, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/19814).
