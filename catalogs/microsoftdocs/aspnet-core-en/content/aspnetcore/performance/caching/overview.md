---
title: Overview of caching in ASP.NET Core
author: tdykstra
description: Explore caching in ASP.NET Core, including in-memory, distributed, hybrid, response, and output caching.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 05/01/2026
uid: performance/caching/overview

# customer intent: As an ASP.NET developer, I want to explore caching options in ASP.NET Core, so I can use various types of caching in my apps.
---
# Overview of caching in ASP.NET Core

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


By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Tom Dykstra](https://twitter.com/tdykstra)

This article provides an overview of caching in ASP.NET Core with an introduction to in-memory, distributed, hybrid, response, and output caching.

**Applies to: \>= aspnetcore-9.0**

## In-memory caching

In-memory caching uses server memory to store cached data. This type of caching is suitable for a single server or multiple servers that use session affinity. Session affinity is also known as *sticky sessions*. Session affinity means that the requests from a client are always routed to the same server for processing.

For more information, see [Cache in-memory in ASP.NET Core](memory.md) and [Troubleshoot Azure Application Gateway session affinity issues](https://learn.microsoft.com/azure/application-gateway/how-to-troubleshoot-application-gateway-session-affinity-issues).

## Distributed cache

Use a distributed cache to store data when the app is hosted in a cloud or server farm. The cache is shared across the servers that process requests. A client can submit a request that gets handled by any server in the group when cached data for the client is available. ASP.NET Core works with SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), [Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres), and [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) distributed caches.

For more information, see [Distributed caching in ASP.NET Core](distributed.md).

## HybridCache

The [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache) API bridges gaps in the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) and [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) APIs. `HybridCache` is an abstract class with a default implementation that handles most aspects of saving to cache and retrieving from cache.

### Features of HybridCache

`HybridCache` provides the following features that aren't available with other APIs:

* A unified API for both in-process and out-of-process caching.

  `HybridCache` is designed to be a drop-in replacement for existing `IDistributedCache` and `IMemoryCache` usage, and it provides a 
simple API for adding new caching code. If the app has an `IDistributedCache` implementation, the `HybridCache` service uses it for secondary caching. This two-level caching strategy allows `HybridCache` to provide the speed of an in-memory cache and the durability of a distributed or persistent cache.

* Stampede protection.

  *Cache stampede* happens when a frequently used cache entry is revoked, and too many requests try to repopulate the same cache entry at the same time. `HybridCache` combines concurrent operations that use the same `HybridCache` instance, which ensures that all requests for a given response wait for the first request to populate the cache. This coordination doesn't extend to other `HybridCache` instances.

* Configurable serialization.

  Serialization is configured as part of registering the service, with support for type-specific and generalized serializers via the `WithSerializer` and `WithSerializerFactory` methods, chained from the `AddHybridCache` call. By default, the service handles `string` and `byte[]` types internally, and uses the `System.Text.Json` namespace for everything else. `HybridCache` can be configured for other types of serializers, such as protobuf or XML.

To see the relative simplicity of the `HybridCache` API, compare code that uses it to code that uses `IDistributedCache`. Here's an example of what using `IDistributedCache` looks like:

```csharp
public class SomeService(IDistributedCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        var key = $"someinfo:{name}:{id}"; // Unique key for this combination.
        var bytes = await cache.GetAsync(key, token); // Try to get from cache.
        SomeInformation info;
        if (bytes is null)
        {
            // Cache miss; get the data from the real source.
            info = await SomeExpensiveOperationAsync(name, id, token);

            // Serialize and cache it.
            bytes = SomeSerializer.Serialize(info);
            await cache.SetAsync(key, bytes, token);
        }
        else
        {
            // Cache hit; deserialize it.
            info = SomeSerializer.Deserialize<SomeInformation>(bytes);
        }
        return info;
    }

    // This is the work we're trying to cache.
    private async Task<SomeInformation> SomeExpensiveOperationAsync(string name, int id,
        CancellationToken token = default)
    { /* ... */ }
}
```

The code demonstrates a significant amount of work to get right each time, including things like serialization. Also in the "cache miss" scenario, you might end up with multiple concurrent threads. These threads might all receive a cache miss, all fetch the underlying data, all serialize it, and all send the data to the cache.

Here's equivalent code that uses the `HybridCache` API:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // Unique key for this entry.
            async cancel => await SomeExpensiveOperationAsync(name, id, cancel),
            token: token
        );
    }
}
```

The code is simpler, and the library provides stampede protection and other features not available with the `IDistributedCache` interface.

### Compatibility

The `HybridCache` library supports older .NET runtimes, including .NET Framework 4.7.2 and .NET Standard 2.0.

### More information

For more information, see the following resources:

* [performance/caching/hybrid](hybrid.md)
* [Hybrid Cache API proposal (GitHub dotnet/aspnetcore issue #54647)](https://github.com/dotnet/aspnetcore/issues/54647)
* [HybridCache source code](https://source.dot.net/#Microsoft.Extensions.Caching.Abstractions/Hybrid/HybridCache.cs,8c0fe94693d1ac8d) <!--keep-->


## Response caching

The response caching middleware enables the caching of server responses based on [HTTP Cache-Control headers](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control).

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the [conditions for caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23cfc) are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  [Output caching](output.md) (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use [Fiddler](https://www.telerik.com/fiddler) or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see [Response caching middleware > Troubleshooting](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23troubleshooting).

For more information, see [Response caching in ASP.NET Core](response.md).

## Output caching

The output caching middleware enables caching of HTTP responses. Output caching differs from [response caching](#response-caching) in the following ways:

* Caching behavior is configurable on the server.

  Response caching behavior is defined with HTTP headers. For example, when you browse a website with Chrome or Microsoft Edge, the browser automatically sends a `Cache-control: max-age=0` header. This header effectively disables response caching because the server follows the directions provided by the client. A new response is returned for every request, even if the server has a fresh cached response. With output caching, the client doesn't override the caching behavior that you configure on the server.

* The cache storage medium is extensible.

  Memory is used by default. Response caching is limited to memory.

* You can programmatically invalidate selected cache entries.

  Response caching is dependent on HTTP headers, which leaves you with few options for invalidating cache entries.

* Resource locking mitigates the risk of cache stampede and thundering herd.

  *Cache stampede* happens when a frequently used cache entry is revoked, and too many requests try to repopulate the same cache entry at the same time. *Thundering herd* is similar: a burst of requests for the same response that isn't already in a cache entry. Resource locking ensures that all requests for a given response wait for the first request to populate the cache. Response caching doesn't have a resource locking feature.

* Cache revalidation minimizes bandwidth usage.

  *Cache revalidation* means the server can return a _304 Not Modified_ HTTP status code instead of a cached response body. This status code informs the client that the response to the request is unchanged from what was previously received. Response caching doesn't do cache revalidation.

For more information, see [Output caching middleware in ASP.NET Core](output.md).

## Cache Tag Helper

Cache the content from an MVC view or Razor Page with the Cache Tag Helper. The Cache Tag Helper uses in-memory caching to store data.

For more information, see [Cache Tag Helper in ASP.NET Core MVC](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md).

## Distributed Cache Tag Helper

Cache the content from an MVC view or Razor Page in distributed cloud or web farm scenarios with the Distributed Cache Tag Helper. The Distributed Cache Tag Helper uses SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), or [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) to store data.

For more information, see [Distributed Cache Tag Helper in ASP.NET Core](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md).



**Applies to: \>= aspnetcore-7.0 <= aspnetcore-8.0**

## In-memory caching

In-memory caching uses server memory to store cached data. This type of caching is suitable for a single server or multiple servers using session affinity. Session affinity is also known as *sticky sessions*. Session affinity means that the requests from a client are always routed to the same server for processing.

For more information, see [performance/caching/memory](memory.md) and [Troubleshoot Azure Application Gateway session affinity issues](https://learn.microsoft.com/azure/application-gateway/how-to-troubleshoot-application-gateway-session-affinity-issues).

## Distributed Cache

Use a distributed cache to store data when the app is hosted in a cloud or server farm. The cache is shared across the servers that process requests. A client can submit a request that's handled by any server in the group if cached data for the client is available. ASP.NET Core works with SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), [Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres), and [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) distributed caches.

For more information, see [performance/caching/distributed](distributed.md).

## HybridCache

The [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache) API bridges gaps in the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) and [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) APIs. `HybridCache` is an abstract class with a default implementation that handles most aspects of saving to cache and retrieving from cache.

### Features of HybridCache

`HybridCache` provides the following features that aren't available with other APIs:

* A unified API for both in-process and out-of-process caching.

  `HybridCache` is designed to be a drop-in replacement for existing `IDistributedCache` and `IMemoryCache` usage, and it provides a 
simple API for adding new caching code. If the app has an `IDistributedCache` implementation, the `HybridCache` service uses it for secondary caching. This two-level caching strategy allows `HybridCache` to provide the speed of an in-memory cache and the durability of a distributed or persistent cache.

* Stampede protection.

  *Cache stampede* happens when a frequently used cache entry is revoked, and too many requests try to repopulate the same cache entry at the same time. `HybridCache` combines concurrent operations that use the same `HybridCache` instance, which ensures that all requests for a given response wait for the first request to populate the cache. This coordination doesn't extend to other `HybridCache` instances.

* Configurable serialization.

  Serialization is configured as part of registering the service, with support for type-specific and generalized serializers via the `WithSerializer` and `WithSerializerFactory` methods, chained from the `AddHybridCache` call. By default, the service handles `string` and `byte[]` types internally, and uses the `System.Text.Json` namespace for everything else. `HybridCache` can be configured for other types of serializers, such as protobuf or XML.

To see the relative simplicity of the `HybridCache` API, compare code that uses it to code that uses `IDistributedCache`. Here's an example of what using `IDistributedCache` looks like:

```csharp
public class SomeService(IDistributedCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        var key = $"someinfo:{name}:{id}"; // Unique key for this combination.
        var bytes = await cache.GetAsync(key, token); // Try to get from cache.
        SomeInformation info;
        if (bytes is null)
        {
            // Cache miss; get the data from the real source.
            info = await SomeExpensiveOperationAsync(name, id, token);

            // Serialize and cache it.
            bytes = SomeSerializer.Serialize(info);
            await cache.SetAsync(key, bytes, token);
        }
        else
        {
            // Cache hit; deserialize it.
            info = SomeSerializer.Deserialize<SomeInformation>(bytes);
        }
        return info;
    }

    // This is the work we're trying to cache.
    private async Task<SomeInformation> SomeExpensiveOperationAsync(string name, int id,
        CancellationToken token = default)
    { /* ... */ }
}
```

The code demonstrates a significant amount of work to get right each time, including things like serialization. Also in the "cache miss" scenario, you might end up with multiple concurrent threads. These threads might all receive a cache miss, all fetch the underlying data, all serialize it, and all send the data to the cache.

Here's equivalent code that uses the `HybridCache` API:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // Unique key for this entry.
            async cancel => await SomeExpensiveOperationAsync(name, id, cancel),
            token: token
        );
    }
}
```

The code is simpler, and the library provides stampede protection and other features not available with the `IDistributedCache` interface.

### Compatibility

The `HybridCache` library supports older .NET runtimes, including .NET Framework 4.7.2 and .NET Standard 2.0.

### More information

For more information, see the following resources:

* [performance/caching/hybrid](hybrid.md)
* [Hybrid Cache API proposal (GitHub dotnet/aspnetcore issue #54647)](https://github.com/dotnet/aspnetcore/issues/54647)
* [HybridCache source code](https://source.dot.net/#Microsoft.Extensions.Caching.Abstractions/Hybrid/HybridCache.cs,8c0fe94693d1ac8d) <!--keep-->


## Cache Tag Helper

Cache the content from an MVC view or Razor Page with the Cache Tag Helper. The Cache Tag Helper uses in-memory caching to store data.

For more information, see [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md).

## Distributed Cache Tag Helper

Cache the content from an MVC view or Razor Page in distributed cloud or web farm scenarios with the Distributed Cache Tag Helper. The Distributed Cache Tag Helper uses SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), or [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) to store data.

For more information, see [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md).

## Response caching

The response caching middleware enables the caching of server responses based on [HTTP Cache-Control headers](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control).

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the [conditions for caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23cfc) are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  [Output caching](output.md) (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use [Fiddler](https://www.telerik.com/fiddler) or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see [Response caching middleware > Troubleshooting](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23troubleshooting).

<a name="oc7"></a>

## Output caching

The output caching middleware enables caching of HTTP responses. Output caching differs from [response caching](#response-caching) in the following ways:

* The caching behavior is configurable on the server.

  Response caching behavior is defined by HTTP headers. For example, when you visit a website with Chrome or Edge, the browser automatically sends a `Cache-control: max-age=0` header. This header effectively disables response caching, since the server follows the directions provided by the client. A new response is returned for every request, even if the server has a fresh cached response. With output caching the client doesn't override the caching behavior that you configure on the server.

* The cache storage medium is extensible.

  Memory is used by default. Response caching is limited to memory.

* You can programmatically invalidate selected cache entries.

  Response caching's dependence on HTTP headers leaves you with few options for invalidating cache entries.

* Resource locking mitigates the risk of cache stampede and thundering herd.

  *Cache stampede* happens when a frequently used cache entry is revoked, and too many requests try to repopulate the same cache entry at the same time. *Thundering herd* is similar: a burst of requests for the same response that isn't already in a cache entry. Resource locking ensures that all requests for a given response wait for the first request to populate the cache. Response caching doesn't have a resource locking feature.

* Cache revalidation minimizes bandwidth usage.

  *Cache revalidation* means the server can return a `304 Not Modified` HTTP status code instead of a cached response body. This status code informs the client that the response to the request is unchanged from what was previously received. Response caching doesn't do cache revalidation.



**Applies to: < aspnetcore-7.0**

## In-memory caching

In-memory caching uses server memory to store cached data. This type of caching is suitable for a single server or multiple servers using session affinity. Session affinity is also known as *sticky sessions*. Session affinity means that the requests from a client are always routed to the same server for processing.

For more information, see [performance/caching/memory](memory.md) and [Troubleshoot Azure Application Gateway session affinity issues](https://learn.microsoft.com/azure/application-gateway/how-to-troubleshoot-application-gateway-session-affinity-issues).

## Distributed Cache

Use a distributed cache to store data when the app is hosted in a cloud or server farm. The cache is shared across the servers that process requests. A client can submit a request that's handled by any server in the group if cached data for the client is available. ASP.NET Core works with SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), [Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres), and [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) distributed caches.

For more information, see [performance/caching/distributed](distributed.md).

## HybridCache

The [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache) API bridges gaps in the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) and [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) APIs. `HybridCache` is an abstract class with a default implementation that handles most aspects of saving to cache and retrieving from cache.

### Features of HybridCache

`HybridCache` provides the following features that aren't available with other APIs:

* A unified API for both in-process and out-of-process caching.

  `HybridCache` is designed to be a drop-in replacement for existing `IDistributedCache` and `IMemoryCache` usage, and it provides a 
simple API for adding new caching code. If the app has an `IDistributedCache` implementation, the `HybridCache` service uses it for secondary caching. This two-level caching strategy allows `HybridCache` to provide the speed of an in-memory cache and the durability of a distributed or persistent cache.

* Stampede protection.

  *Cache stampede* happens when a frequently used cache entry is revoked, and too many requests try to repopulate the same cache entry at the same time. `HybridCache` combines concurrent operations that use the same `HybridCache` instance, which ensures that all requests for a given response wait for the first request to populate the cache. This coordination doesn't extend to other `HybridCache` instances.

* Configurable serialization.

  Serialization is configured as part of registering the service, with support for type-specific and generalized serializers via the `WithSerializer` and `WithSerializerFactory` methods, chained from the `AddHybridCache` call. By default, the service handles `string` and `byte[]` types internally, and uses the `System.Text.Json` namespace for everything else. `HybridCache` can be configured for other types of serializers, such as protobuf or XML.

To see the relative simplicity of the `HybridCache` API, compare code that uses it to code that uses `IDistributedCache`. Here's an example of what using `IDistributedCache` looks like:

```csharp
public class SomeService(IDistributedCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        var key = $"someinfo:{name}:{id}"; // Unique key for this combination.
        var bytes = await cache.GetAsync(key, token); // Try to get from cache.
        SomeInformation info;
        if (bytes is null)
        {
            // Cache miss; get the data from the real source.
            info = await SomeExpensiveOperationAsync(name, id, token);

            // Serialize and cache it.
            bytes = SomeSerializer.Serialize(info);
            await cache.SetAsync(key, bytes, token);
        }
        else
        {
            // Cache hit; deserialize it.
            info = SomeSerializer.Deserialize<SomeInformation>(bytes);
        }
        return info;
    }

    // This is the work we're trying to cache.
    private async Task<SomeInformation> SomeExpensiveOperationAsync(string name, int id,
        CancellationToken token = default)
    { /* ... */ }
}
```

The code demonstrates a significant amount of work to get right each time, including things like serialization. Also in the "cache miss" scenario, you might end up with multiple concurrent threads. These threads might all receive a cache miss, all fetch the underlying data, all serialize it, and all send the data to the cache.

Here's equivalent code that uses the `HybridCache` API:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // Unique key for this entry.
            async cancel => await SomeExpensiveOperationAsync(name, id, cancel),
            token: token
        );
    }
}
```

The code is simpler, and the library provides stampede protection and other features not available with the `IDistributedCache` interface.

### Compatibility

The `HybridCache` library supports older .NET runtimes, including .NET Framework 4.7.2 and .NET Standard 2.0.

### More information

For more information, see the following resources:

* [performance/caching/hybrid](hybrid.md)
* [Hybrid Cache API proposal (GitHub dotnet/aspnetcore issue #54647)](https://github.com/dotnet/aspnetcore/issues/54647)
* [HybridCache source code](https://source.dot.net/#Microsoft.Extensions.Caching.Abstractions/Hybrid/HybridCache.cs,8c0fe94693d1ac8d) <!--keep-->


## Cache Tag Helper

Cache the content from an MVC view or Razor Page with the Cache Tag Helper. The Cache Tag Helper uses in-memory caching to store data.

For more information, see [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md).

## Distributed Cache Tag Helper

Cache the content from an MVC view or Razor Page in distributed cloud or web farm scenarios with the Distributed Cache Tag Helper. The Distributed Cache Tag Helper uses SQL Server, [Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis), or [NCache](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/) to store data.

For more information, see [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md).

## Response caching

The response caching middleware enables the caching of server responses based on [HTTP Cache-Control headers](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control).

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the [conditions for caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23cfc) are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  [Output caching](output.md) (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use [Fiddler](https://www.telerik.com/fiddler) or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see [Response caching middleware > Troubleshooting](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fmiddleware%23troubleshooting).

## Output caching

[Output caching](overview.md) is available in .NET 7 or later.




## Related content

* [Cache in-memory in ASP.NET Core](memory.md)
* [Distributed caching in ASP.NET Core](distributed.md)
* [HybridCache library in ASP.NET Core](hybrid.md)
* [Response caching middleware in ASP.NET Core](middleware.md)
* [Output caching middleware in ASP.NET Core](output.md)
