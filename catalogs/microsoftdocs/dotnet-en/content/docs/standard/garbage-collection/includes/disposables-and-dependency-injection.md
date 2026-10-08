---
ms.topic: include
ms.date: 04/07/2021
ms.custom: include
---

> **Tip:**
> With regard to dependency injection, when registering services in an [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection), the [service lifetime](../../../core/extensions/dependency-injection/service-lifetimes.md) is managed implicitly on your behalf. The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) and corresponding [Microsoft.Extensions.Hosting.IHost](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost) orchestrate resource cleanup. Specifically, implementations of [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) are properly disposed at the end of their specified lifetime.
>
> For more information, see [Dependency injection in .NET](../../../core/extensions/dependency-injection/overview.md).
