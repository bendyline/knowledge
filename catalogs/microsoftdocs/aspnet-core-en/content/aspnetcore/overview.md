---
title: Overview of ASP.NET Core
author: tdykstra
description: Get an overview of ASP.NET Core, a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected apps.
ms.author: tdykstra
ms.date: 07/28/2025
uid: index
---
# Overview of ASP.NET Core

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


ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern web apps using [.NET](https://learn.microsoft.com/dotnet/core/introduction). The framework is built for large-scale app development and can handle any size workload, making it a robust choice for enterprise-level apps.

Key features:

**Applies to: \>= aspnetcore-6.0**

* Lightweight and modular HTTP request pipeline.
* [Kestrel](fundamentals/servers/kestrel.md): A [high-performance](https://github.com/aspnet/benchmarks) and cross-platform HTTP server.
* Integrated [dependency injection](fundamentals/dependency-injection.md).
* [Environment-based configuration](fundamentals/configuration/index.md).
* Rich logging, tracing, and runtime metrics.
* [Blazor](blazor/index.md): Create rich interactive web UI components using [C#](https://learn.microsoft.com/dotnet/csharp/)&mdash;no JavaScript required.
* Integrate seamlessly with popular client-side frameworks and libraries, including [Angular](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-angular), [React](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-react), [Vue](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-vue), and [Bootstrap](https://getbootstrap.com/).
* [Minimal APIs](fundamentals/minimal-apis.md): Build fast web APIs with minimal code and configuration by fluently declaring API routes and endpoints.
* [SignalR](https://learn.microsoft.com/search/?terms=signalr%2Findex): Add real-time web functionality.
* [gRPC](grpc/index.md): High performance Remote Procedure Call (RPC) services.
* Security: Built-in security features for [authentication](security/authentication/index.md), [authorization](security/authorization/introduction.md), and [data protection](security/data-protection/introduction.md).
* Testing: Easily create unit and integration tests.
* Tooling: Maximize your development productivity with [Visual Studio](https://visualstudio.microsoft.com/) and [Visual Studio Code](https://code.visualstudio.com/).



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

* Lightweight and modular HTTP request pipeline.
* [Kestrel](fundamentals/servers/kestrel.md): A [high-performance](https://github.com/aspnet/benchmarks) and cross-platform HTTP server.
* Integrated [dependency injection](fundamentals/dependency-injection.md).
* [Environment-based configuration](fundamentals/configuration/index.md).
* Rich logging, tracing, and runtime metrics.
* [Blazor](blazor/index.md): Create rich interactive web UI components using [C#](https://learn.microsoft.com/dotnet/csharp/)&mdash;no JavaScript required.
* Integrate seamlessly with popular client-side frameworks and libraries, including [Angular](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-angular), [React](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-react), [Vue](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-vue), and [Bootstrap](https://getbootstrap.com/).
* [SignalR](https://learn.microsoft.com/search/?terms=signalr%2Findex): Add real-time web functionality.
* [gRPC](grpc/index.md): High performance Remote Procedure Call (RPC) services.
* Security: Built-in security features for [authentication](security/authentication/index.md), [authorization](security/authorization/introduction.md), and [data protection](security/data-protection/introduction.md).
* Testing: Easily create unit and integration tests.
* Tooling: Maximize your development productivity with [Visual Studio](https://visualstudio.microsoft.com/) and [Visual Studio Code](https://code.visualstudio.com/).



**Applies to: < aspnetcore-3.0**

* Lightweight and modular HTTP request pipeline.
* [Kestrel](fundamentals/servers/kestrel.md): A [high-performance](https://github.com/aspnet/benchmarks) and cross-platform HTTP server.
* Integrated [dependency injection](fundamentals/dependency-injection.md).
* [Environment-based configuration](fundamentals/configuration/index.md).
* Rich logging, tracing, and runtime metrics.
* Develop apps and APIs using [Razor Pages](razor-pages/index.md) and [Model-View-Controller (MVC)](mvc/overview.md) frameworks.
* Integrate seamlessly with popular client-side frameworks and libraries, including [Angular](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-angular), [React](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-react), [Vue](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-vue), and [Bootstrap](https://getbootstrap.com/).
* [SignalR](https://learn.microsoft.com/search/?terms=signalr%2Findex): Add real-time web functionality.
* [gRPC](grpc/index.md): High performance Remote Procedure Call (RPC) services.
* Security: Built-in security features for [authentication](security/authentication/index.md), [authorization](security/authorization/introduction.md), and [data protection](security/data-protection/introduction.md).
* Testing: Easily create unit and integration tests.
* Tooling: Maximize your development productivity with [Visual Studio](https://visualstudio.microsoft.com/) and [Visual Studio Code](https://code.visualstudio.com/).



## Why choose ASP.NET Core?

* **Unified framework**: ASP.NET Core is a complete and fully integrated web framework with built-in production-ready components to handle all of your web development needs.
* **Full stack productivity**: Build more apps faster by enabling your team to work full stack, from the frontend to the backend, using a single development framework.
* **Secure by design**: ASP.NET Core is built with security as a top concern and includes built-in support for authentication, authorization, and data protection.
* **Cloud-ready**: Whether you're deploying to your own data centers or to the cloud, ASP.NET Core simplifies deployment, monitoring, and configuration.
* **Performance & scalability**: Handle the most demanding workloads with ASP.NET Core's industry leading performance.
* **Trusted and mature**: ASP.NET Core is used and proven at hyperscale by some of the largest services in the world, including Bing, Xbox, Microsoft 365, and Azure.

## Get started

Are you ready to start your ASP.NET Core learning journey? It's time to build your first web app with ASP.NET Core!

> 
> [get-started](get-started.md)
