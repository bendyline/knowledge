---
title: Host ASP.NET Core in a web farm
author: tdykstra
description: Learn how to host multiple instances of an ASP.NET Core app with shared resources in a web farm environment.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 01/13/2020
uid: host-and-deploy/web-farm
---
# Host ASP.NET Core in a web farm

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


By [Chris Ross](https://github.com/Tratcher)

A *web farm* is a group of two or more web servers (or *nodes*) that host multiple instances of an app. When requests from users arrive to a web farm, a *load balancer* distributes the requests to the web farm's nodes. Web farms improve:

* **Reliability/availability**: When one or more nodes fail, the load balancer can route requests to other functioning nodes to continue processing requests.
* **Capacity/performance**: Multiple nodes can process more requests than a single server. The load balancer balances the workload by distributing requests to the nodes.
* **Scalability**: When more or less capacity is required, the number of active nodes can be increased or decreased to match the workload. Web farm platform technologies, such as [Azure App Service](https://azure.microsoft.com/services/app-service/), can automatically add or remove nodes at the request of the system administrator or automatically without human intervention.
* **Maintainability**: Nodes of a web farm can rely on a set of shared services, which results in easier system management. For example, the nodes of a web farm can rely upon a single database server and a common network location for static resources, such as images and downloadable files.

This topic describes configuration and dependencies for ASP.NET core apps hosted in a web farm that rely upon shared resources.

## General configuration

[host-and-deploy/index](index.md)  
Learn how to set up hosting environments and deploy ASP.NET Core apps. Configure a process manager on each node of the web farm to automate app starts and restarts. Each node requires the ASP.NET Core runtime. For more information, see the topics in the [Host and deploy](index.md) area of the documentation.

[host-and-deploy/proxy-load-balancer](proxy-load-balancer.md)  
Learn about configuration for apps hosted behind proxy servers and load balancers, which often obscure important request information.

[host-and-deploy/azure-apps/index](azure-apps/index.md)  
[Azure App Service](https://azure.microsoft.com/services/app-service/) is a [Microsoft cloud computing platform service](https://azure.microsoft.com/) for hosting web apps, including ASP.NET Core. App Service is a fully managed platform that provides automatic scaling, load balancing, patching, and continuous deployment.

## App data

When an app is scaled to multiple instances, there might be app state that requires sharing across nodes. If the state is transient, consider sharing an [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache). If the shared state requires persistence, consider storing the shared state in a database.

## Required configuration

Data Protection and Caching require configuration for apps deployed to a web farm.

### Data Protection

The [ASP.NET Core Data Protection system](../security/data-protection/introduction.md) is used by apps to protect data. Data Protection relies upon a set of cryptographic keys stored in a *key ring*. When the Data Protection system is initialized, it applies [default settings](../security/data-protection/configuration/default-settings.md) that store the key ring locally. Under the default configuration, a unique key ring is stored on each node of the web farm. Consequently, each web farm node can't decrypt data that's encrypted by an app on any other node. The default configuration isn't generally appropriate for hosting apps in a web farm. An alternative to implementing a shared key ring is to always route user requests to the same node. For more information on Data Protection system configuration for web farm deployments, see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md).

### Caching

In a web farm environment, the caching mechanism must share cached items across the web farm's nodes. Caching must either rely upon a common Redis cache, a shared SQL Server database, or a custom caching implementation that shares cached items across the web farm. For more information, see [performance/caching/distributed](../performance/caching/distributed.md).

## Dependent components

The following scenarios don't require additional configuration, but they depend on technologies that require configuration for web farms.

| Scenario | Depends on &hellip; |
| --- | --- |
| Authentication | Data Protection (see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md)).<br><br>For more information, see [security/authentication/cookie](../security/authentication/cookie.md) and [security/cookie-sharing](../security/cookie-sharing.md). |
| Identity | Authentication and database configuration.<br><br>For more information, see [security/authentication/identity](../security/authentication/identity.md). |
| Session | Data Protection (encrypted cookies) (see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md)) and Caching (see [performance/caching/distributed](../performance/caching/distributed.md)).<br><br>For more information, see [Session and state management: Session state](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23session-state). |
| TempData | Data Protection (encrypted cookies) (see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md)) or Session (see [Session and state management: Session state](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23session-state)).<br><br>For more information, see [Session and state management: TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata). |
| Antiforgery | Data Protection (see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md)).<br><br>For more information, see [security/anti-request-forgery](../security/anti-request-forgery.md). |

## Troubleshoot

### Data Protection and caching

When Data Protection or caching isn't configured for a web farm environment, intermittent errors occur when requests are processed. This occurs because nodes don't share the same resources and user requests aren't always routed back to the same node.

Consider a user who signs into the app using cookie authentication. The user signs into the app on one web farm node. If their next request arrives at the same node where they signed in, the app is able to decrypt the authentication cookie and allows access to the app's resource. If their next request arrives at a different node, the app can't decrypt the authentication cookie from the node where the user signed in, and authorization for the requested resource fails.

When any of the following symptoms occur **intermittently**, the problem is usually traced to improper Data Protection or caching configuration for a web farm environment:

* Authentication breaks: The authentication cookie is misconfigured or can't be decrypted. OAuth (Facebook, Microsoft, Twitter) or OpenIdConnect logins fail with the error "Correlation failed."
* Authorization breaks: Identity is lost.
* Session state loses data.
* Cached items disappear.
* TempData fails.
* POSTs fail: The antiforgery check fails.

For more information on Data Protection configuration for web farm deployments, see [security/data-protection/configuration/overview](../security/data-protection/configuration/overview.md). For more information on caching configuration for web farm deployments, see [performance/caching/distributed](../performance/caching/distributed.md).

## Obtain data from apps

If the web farm apps are capable of responding to requests, obtain request, connection, and additional data from the apps using terminal inline middleware. For more information and sample code, see [test/troubleshoot#obtain-data-from-an-app](https://learn.microsoft.com/search/?terms=test%2Ftroubleshoot%23obtain-data-from-an-app).

## Additional resources

* [Custom Script Extension for Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/custom-script-windows): Downloads and executes scripts on Azure virtual machines, which is useful for post-deployment configuration and software installation.
* [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md)
