---
title: Caching in .NET
description: Discover effective ways to implement in-memory and distributed caching in .NET. Boost app performance and scalability with .NET caching.
ms.date: 07/28/2026
ai-usage: ai-assisted
---

# Caching in .NET

In this article, you learn about various caching mechanisms. Caching is the act of storing data in an intermediate-layer, making subsequent data retrievals faster. Conceptually, caching is a performance optimization strategy and design consideration. Caching can significantly improve app performance by making infrequently changing (or expensive to retrieve) data more readily available. This article introduces three caching approaches and provides sample source code for each:

- [Microsoft.Extensions.Caching.Memory](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.memory): In-memory caching for single-server scenarios
- [Microsoft.Extensions.Caching.Hybrid](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.hybrid): Hybrid caching that combines in-memory and distributed caching with additional features
- [Microsoft.Extensions.Caching.Distributed](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.distributed): Distributed caching for multi-server scenarios

> **Important:**
> There are two `MemoryCache` classes within .NET, one in the `System.Runtime.Caching` namespace and the other in the `Microsoft.Extensions.Caching` namespace:
>
> - [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache)
> - [Microsoft.Extensions.Caching.Memory.MemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCache)
>
> While this article focuses on caching, it doesn't include the [`System.Runtime.Caching`](https://www.nuget.org/packages/System.Runtime.Caching) NuGet package. All references to `MemoryCache` are within the `Microsoft.Extensions.Caching` namespace.

All of the `Microsoft.Extensions.*` packages come dependency injection (DI) ready. The [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache), [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache), and [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interfaces can be used as services.

## In-memory caching

In this section, you learn about the [Microsoft.Extensions.Caching.Memory](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.memory) package. The current implementation of the [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) is a wrapper around the [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602), exposing a feature-rich API. Entries within the cache are represented by the [Microsoft.Extensions.Caching.Memory.ICacheEntry](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry) and can be any `object`. The in-memory cache solution is great for apps that run on a single server, where the cached data rents memory in the app's process.

> **Tip:**
> For multi-server caching scenarios, consider the [Distributed caching](#distributed-caching) approach as an alternative to in-memory caching.

### In-memory caching API

The consumer of the cache has control over both sliding and absolute expirations:

- [Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpiration)
- [Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpirationRelativeToNow](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpirationRelativeToNow)
- [Microsoft.Extensions.Caching.Memory.ICacheEntry.SlidingExpiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry.SlidingExpiration)

Setting an expiration causes entries in the cache to be *evicted* if they're not accessed within the expiration time allotment. Consumers have additional options for controlling cache entries, through [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions). Each [Microsoft.Extensions.Caching.Memory.ICacheEntry](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry) is paired with [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions), which exposes expiration eviction functionality with [Microsoft.Extensions.Primitives.IChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken), priority settings with [Microsoft.Extensions.Caching.Memory.CacheItemPriority](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheItemPriority), and controlling the [Microsoft.Extensions.Caching.Memory.ICacheEntry.Size](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.ICacheEntry.Size). The relevant extension methods are:

- [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.AddExpirationToken*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.AddExpirationToken*)
- [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.RegisterPostEvictionCallback*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.RegisterPostEvictionCallback*)
- [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetSize*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetSize*)
- [Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetPriority*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetPriority*)

### In-memory cache example

To use the default [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) implementation, call the [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*) extension method to register all the required services with DI. In the following code sample, the generic host is used to expose DI functionality:

[source="snippets/caching/memory-apis/Program.cs" range="1-7" highlight="6"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

Depending on your .NET workload, you might access the `IMemoryCache` differently, such as constructor injection. In this sample, you use the `IServiceProvider` instance on the `host` and call generic [Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService``1(System.IServiceProvider)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%60%601(System.IServiceProvider)) extension method:

[source="snippets/caching/memory-apis/Program.cs" range="9-10"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

With in-memory caching services registered, and resolved through DI, you're ready to start caching. This sample iterates through the letters in the English alphabet 'A' through 'Z'. The `record AlphabetLetter` type holds the reference to the letter, and generates a message.

[source="snippets/caching/memory-apis/Program.cs" range="70-74"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

> **Tip:**
> The `file` access modifier is used on the `AlphabetLetter` type, as it's defined within and only accessed from the _Program.cs_ file. For more information, see [file (C# Reference)](../../csharp/language-reference/keywords/file.md). To see the full source code, see the [Program.cs](#put-it-all-together) section.

The sample includes a helper function that iterates through the alphabet letters:

[source="snippets/caching/memory-apis/Program.cs" range="24-33"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

In the preceding C# code:

- The `Func<char, Task> asyncFunc` is awaited on each iteration, passing the current `letter`.
- After all letters have been processed, a blank line is written to the console.

To add items to the cache call one of the `Create`, or `Set` APIs:

[source="snippets/caching/memory-apis/Program.cs" range="35-54" highlight="12-13"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

In the preceding C# code:

- The variable `addLettersToCacheTask` delegates to `IterateAlphabetAsync` and is awaited.
- The `Func<char, Task> asyncFunc` is argued with a lambda.
- The `MemoryCacheEntryOptions` is instantiated with an absolute expiration relative to now.
- A post eviction callback is registered.
- An `AlphabetLetter` object is instantiated, and passed into [Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*) along with `letter` and `options`.
- The letter is written to the console as being cached.
- Finally, a [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) is returned.

For each letter in the alphabet, a cache entry is written with an expiration and post-eviction callback.

The post-eviction callback writes the details of the value that was evicted to the console:

[source="snippets/caching/memory-apis/Program.cs" range="15-22"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

Now that the cache is populated, another call to `IterateAlphabetAsync` is awaited, but this time you call [Microsoft.Extensions.Caching.Memory.IMemoryCache.TryGetValue*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache.TryGetValue*):

[source="snippets/caching/memory-apis/Program.cs" range="56-66"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

If the `cache` contains the `letter` key, and the `value` is an instance of an `AlphabetLetter` it's written to the console. When the `letter` key isn't in the cache, it was evicted and its post eviction callback was invoked.

#### Additional extension methods

The `IMemoryCache` comes with many convenience-based extension methods, including an asynchronous `GetOrCreateAsync`:

- [Microsoft.Extensions.Caching.Memory.CacheExtensions.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.Get*)
- [Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*)
- [Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*)
- [Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*)
- [Microsoft.Extensions.Caching.Memory.CacheExtensions.TryGetValue*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.CacheExtensions.TryGetValue*)

#### Put it all together

The entire sample app source code is a top-level program and requires two NuGet packages:

- [`Microsoft.Extensions.Caching.Memory`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.memory)
- [`Microsoft.Extensions.Hosting`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.hosting)

[source="snippets/caching/memory-apis/Program.cs"::: (complete source file; reference: snippets/caching/memory-apis/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-apis/Program.cs.md)

You can adjust the `MillisecondsDelayAfterAdd` and `MillisecondsAbsoluteExpiration` values to observe the changes in behavior to the expiration and eviction of cached entries. The following is sample output from running this code. (Due to the nondeterministic nature of .NET events, your output might be different.)

```console
A was cached.
B was cached.
C was cached.
D was cached.
E was cached.
F was cached.
G was cached.
H was cached.
I was cached.
J was cached.
K was cached.
L was cached.
M was cached.
N was cached.
O was cached.
P was cached.
Q was cached.
R was cached.
S was cached.
T was cached.
U was cached.
V was cached.
W was cached.
X was cached.
Y was cached.
Z was cached.

A was evicted for Expired.
C was evicted for Expired.
B was evicted for Expired.
E was evicted for Expired.
D was evicted for Expired.
F was evicted for Expired.
H was evicted for Expired.
K was evicted for Expired.
L was evicted for Expired.
J was evicted for Expired.
G was evicted for Expired.
M was evicted for Expired.
N was evicted for Expired.
I was evicted for Expired.
P was evicted for Expired.
R was evicted for Expired.
O was evicted for Expired.
Q was evicted for Expired.
S is still in cache. The 'S' character is the 19 letter in the English alphabet.
T is still in cache. The 'T' character is the 20 letter in the English alphabet.
U is still in cache. The 'U' character is the 21 letter in the English alphabet.
V is still in cache. The 'V' character is the 22 letter in the English alphabet.
W is still in cache. The 'W' character is the 23 letter in the English alphabet.
X is still in cache. The 'X' character is the 24 letter in the English alphabet.
Y is still in cache. The 'Y' character is the 25 letter in the English alphabet.
Z is still in cache. The 'Z' character is the 26 letter in the English alphabet.
```

Since the absolute expiration ([Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.AbsoluteExpirationRelativeToNow](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.AbsoluteExpirationRelativeToNow)) is set, all the cached items will eventually be evicted.

## Worker Service caching

One common strategy for caching data is updating the cache independently from the consuming data services. The *Worker Service* template is a great example, as the [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) runs independently (or in the background) from the other application code. When an application starts running that hosts an implementation of the [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService), the corresponding implementation (in this case the `BackgroundService` or "worker") start running in the same process. These hosted services are registered with DI as singletons, through the [Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)) extension method. Other services can be registered with DI with any [service lifetime](dependency-injection/service-lifetimes.md).

> **Important:**
> The service lifetimes are important to understand. When you call [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*) to register all of the in-memory caching services, the services are registered as singletons.

### Photo service scenario

Imagine you're developing a photo service that relies on third-party API accessible via HTTP. This photo data doesn't change often, but there's a lot of it. Each photo is represented by a simple `record`:

[source="snippets/caching/memory-worker/Photo.cs"::: (complete source file; reference: snippets/caching/memory-worker/Photo.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-worker/Photo.cs.md)

In the following example, you see several services being registered with DI. Each service has a single responsibility.

[source="snippets/caching/memory-worker/Program.cs" range="1-14"::: (complete source file; reference: snippets/caching/memory-worker/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-worker/Program.cs.md)

In the preceding C# code:

- The generic host is created with [defaults](generic-host.md#host-builder-settings).
- In-memory caching services are registered with [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*).
- An `HttpClient` instance is registered for the `CacheWorker` class with [Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)).
- The `CacheWorker` class is registered with [Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)).
- The `PhotoService` class is registered with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)).
- The `CacheSignal<T>` class is registered with [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*).
- The `host` is instantiated from the builder and started asynchronously.

The `PhotoService` is responsible for getting photos that match given criteria (or `filter`):

[source="snippets/caching/memory-worker/PhotoService.cs"::: (complete source file; reference: snippets/caching/memory-worker/PhotoService.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-worker/PhotoService.cs.md)

In the preceding C# code:

- The constructor requires an `IMemoryCache`, `CacheSignal<Photo>`, and `ILogger`.
- The `GetPhotosAsync` method:
  - Defines a `Func<Photo, bool> filter` parameter, and returns an `IAsyncEnumerable<Photo>`.
  - Calls and waits for the `_cacheSignal.WaitAsync()` to release; this ensures that the cache is populated before accessing the cache.
  - Calls `_cache.GetOrCreateAsync()`, asynchronously getting all of the photos in the cache.
  - The `factory` argument logs a warning and returns an empty photo array - this should never happen.
  - Each photo in the cache is iterated, filtered, and materialized with `yield return`.
  - Finally, the cache signal is reset.

Consumers of this service are free to call `GetPhotosAsync` method, and handle photos accordingly. No `HttpClient` is required as the cache contains the photos.

The asynchronous signal is based on an encapsulated [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) instance, within a generic-type constrained singleton. The `CacheSignal<T>` relies on an instance of `SemaphoreSlim`:

[source="snippets/caching/memory-worker/CacheSignal.cs"::: (complete source file; reference: snippets/caching/memory-worker/CacheSignal.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-worker/CacheSignal.cs.md)

In the preceding C# code, the decorator pattern is used to wrap an instance of the `SemaphoreSlim`. Since the `CacheSignal<T>` is registered as a singleton, it can be used across all service lifetimes with any generic type&mdash;in this case, the `Photo`. It's responsible for signaling the seeding of the cache.

The `CacheWorker` is a subclass of [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService):

[source="snippets/caching/memory-worker/CacheWorker.cs"::: (complete source file; reference: snippets/caching/memory-worker/CacheWorker.cs)](../../../_code/docs/core/extensions/snippets/caching/memory-worker/CacheWorker.cs.md)

In the preceding C# code:

- The constructor requires an `ILogger`, `HttpClient`, and `IMemoryCache`.
- The `_updateInterval` is defined for three hours.
- The `ExecuteAsync` method:
  - Loops while the app is running.
  - Makes an HTTP request to `"https://jsonplaceholder.typicode.com/photos"`, and maps the response as an array of `Photo` objects.
  - The array of photos is placed in the `IMemoryCache` under the `"Photos"` key.
  - The `_cacheSignal.Release()` is called, releasing any consumers who were waiting for the signal.
  - The call to [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) is awaited, given the update interval.
  - After delaying for three hours, the cache is again updated.

Consumers in the same process could ask the `IMemoryCache` for the photos, but the `CacheWorker` is responsible for updating the cache.

## Hybrid caching

The [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache) library combines the benefits of in-memory and distributed caching while addressing common challenges with existing caching APIs. Introduced in .NET 9, `HybridCache` provides a unified API that simplifies caching implementation and includes built-in features like stampede protection and configurable serialization.

### Key features

`HybridCache` offers several advantages over using `IMemoryCache` and `IDistributedCache` separately:

- **Two-level caching**: Automatically manages both in-memory (L1) and distributed (L2) cache layers. Data is retrieved from in-memory cache first for speed, then from distributed cache if needed, and finally from the source.
- **Stampede protection**: Prevents multiple concurrent requests that use the same `HybridCache` instance from executing the same expensive operation. Only one request fetches the data while others wait for the result. This coordination doesn't extend to other `HybridCache` instances, even if they use the same distributed cache.
- **Configurable serialization**: Supports multiple serialization formats including JSON (default), protobuf, and XML.
- **Tag-based invalidation**: Groups related cache entries with tags for efficient batch invalidation.
- **Simplified API**: The `GetOrCreateAsync` method handles cache misses, serialization, and storage automatically.

### When to use HybridCache

Consider using `HybridCache` when:

- You need both local (in-memory) and distributed caching in a multi-server environment.
- You want protection against cache stampede scenarios.
- You prefer a simplified API over manually coordinating `IMemoryCache` and `IDistributedCache`.
- You need tag-based cache invalidation for related entries.

> **Tip:**
> For single-server applications with simple caching needs, [in-memory caching](#in-memory-caching) might be sufficient. For multi-server applications without the need for stampede protection or tag-based invalidation, consider [distributed caching](#distributed-caching).

### HybridCache setup

To use `HybridCache`, install the [`Microsoft.Extensions.Caching.Hybrid`](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Hybrid) NuGet package:

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.Hybrid
```

Register the `HybridCache` service with DI by calling [Microsoft.Extensions.DependencyInjection.HybridCacheServiceExtensions.AddHybridCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HybridCacheServiceExtensions.AddHybridCache*):

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="BasicRegistration" highlight="2"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

The preceding code registers `HybridCache` with default options. You can also configure global options:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="ConfigurationWithOptions"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

### Basic usage

The primary method for interacting with `HybridCache` is [Microsoft.Extensions.Caching.Hybrid.HybridCache.GetOrCreateAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache.GetOrCreateAsync*). This method checks the cache for an entry with the specified key and, if not found, calls the factory method to retrieve the data:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="BasicGetOrCreateAsync"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

In the preceding C# code:

- The `GetOrCreateAsync` method takes a unique key and a factory method.
- If the data isn't in the cache, the factory method is called to retrieve it.
- The data is automatically stored in both in-memory and distributed caches.
- Only one concurrent request executes the factory method; others wait for the result.

### Entry options

You can override global defaults for specific cache entries using [Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions):

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="GetOrCreateAsyncWithOptions"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

The entry options allow you to configure:

- [Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Expiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Expiration): How long the entry should be cached in the distributed cache.
- [Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.LocalCacheExpiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.LocalCacheExpiration): How long the entry should be cached in local memory.
- [Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Flags](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Flags): Additional flags for controlling cache behavior.

### Tag-based invalidation

Tags allow you to group related cache entries and invalidate them together. This is useful for scenarios where related data needs to be refreshed as a unit:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="TagBasedCaching"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

To invalidate all entries with a specific tag:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="InvalidateByTag"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

You can also invalidate multiple tags at once:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="InvalidateMultipleTags"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

> **Note:**
> Tag-based invalidation is a logical operation. It doesn't actively remove values from the cache but ensures that tagged entries are treated as cache misses. The entries eventually expire based on their configured lifetime.

### Remove cache entries

To remove a specific cache entry by key, use the [Microsoft.Extensions.Caching.Hybrid.HybridCache.RemoveAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache.RemoveAsync*) method:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="RemoveEntry"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

To invalidate all cached entries, use the reserved wildcard tag `"*"`:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="InvalidateAll"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

### Serialization

For distributed caching scenarios, `HybridCache` requires serialization. By default, it handles `string` and `byte[]` internally and uses `System.Text.Json` for other types. You can configure custom serializers for specific types or use a general-purpose serializer:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="CustomSerialization"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

### Configure distributed cache

`HybridCache` uses the configured [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) implementation for its distributed (L2) cache. Even without an `IDistributedCache` configured, `HybridCache` still provides in-memory caching and stampede protection. To add Redis as a distributed cache:

[source="snippets/caching/hybrid-cache/csharp/Program.cs" id="RedisConfiguration"::: (complete source file; reference: snippets/caching/hybrid-cache/csharp/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/hybrid-cache/csharp/Program.cs.md)

For more information about distributed cache implementations, see [Distributed caching](#distributed-caching).

## Distributed caching

In some scenarios, a distributed cache is required&mdash;such is the case with multiple app servers. A distributed cache supports higher scale-out than the in-memory caching approach. Using a distributed cache offloads the cache memory to an external process, but does require extra network I/O and introduces a bit more latency (even if nominal).

The distributed caching abstractions are part of the [`Microsoft.Extensions.Caching.Memory`](https://learn.microsoft.com/dotnet/api/microsoft.extensions.caching.memory) NuGet package, and there's even an `AddDistributedMemoryCache` extension method.

> **Caution:**
> [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*) should only be used in development or testing scenarios and is **not** a viable production implementation.

Consider any of the available implementations of the `IDistributedCache` from the following packages:

- [`Microsoft.Extensions.Caching.SqlServer`](https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer)
- [`Microsoft.Extensions.Caching.StackExchangeRedis`](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis)
- [`Microsoft.Extensions.Caching.Cosmos`](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Cosmos)
- [`Microsoft.Extensions.Caching.Postgres`](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres)
- [`NCache.Microsoft.Extensions.Caching.OpenSource`](https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource)

### Distributed caching API

The distributed caching APIs are a bit more primitive than their in-memory caching API counterparts. The key-value pairs are a bit more basic. In-memory caching keys are based on an `object`, whereas the distributed keys are a `string`. With in-memory caching, the value can be any strongly typed generic, whereas values in distributed caching are persisted as `byte[]`. That's not to say that various implementations don't expose strongly typed generic values, but that's an implementation detail.

#### Create values

To create values in the distributed cache, call one of the set APIs:

- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*)
- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*)

Using the `AlphabetLetter` record from the in-memory cache example, you could serialize the object to JSON and then encode the `string` as a `byte[]`:

[source="snippets/caching/distributed/Program.cs" id="Create" highlight="7-9"::: (complete source file; reference: snippets/caching/distributed/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/distributed/Program.cs.md)

Much like in-memory caching, cache entries can have options to help fine-tune their existence in the cache&mdash;in this case, the [Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions).

##### Create extension methods

There are several convenience-based extension methods for creating values. These methods help to avoid encoding `string` representations of objects into a `byte[]`:

- [Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetStringAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetStringAsync*)
- [Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetString*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetString*)

#### Read values

To read values from the distributed cache, call one of the `Get` APIs:

- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*)
- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*)

[source="snippets/caching/distributed/Program.cs" id="Read" highlight="5-6"::: (complete source file; reference: snippets/caching/distributed/Program.cs)](../../../_code/docs/core/extensions/snippets/caching/distributed/Program.cs.md)

Once a cache entry is read out of the cache, you can get the UTF8 encoded `string` representation from the `byte[]`.

##### Read extension methods

There are several convenience-based extension methods for reading values. These methods help to avoid decoding `byte[]` into `string` representations of objects:

- [Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetStringAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetStringAsync*)
- [Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetString*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetString*)

#### Update values

There is no way to update the values in the distributed cache with a single API call. Instead, values can have their sliding expirations reset with one of the refresh APIs:

- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*)
- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*)

If the actual value needs to be updated, you must delete the value and then re-add it.

#### Delete values

To delete values in the distributed cache, call one of the `Remove` APIs:

- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*)
- [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*)

> **Tip:**
> While there are synchronous versions of these APIs, consider the fact that implementations of distributed caches are reliant on network I/O. For this reason, it's usually preferable to use the asynchronous APIs.

## See also

- [Dependency injection in .NET](dependency-injection/overview.md)
- [.NET Generic Host](generic-host.md)
- [Worker Services in .NET](workers.md)
- [Azure for .NET developers](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/index.yml)
- [Cache in-memory in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/caching/memory)
- [Distributed caching in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/caching/distributed)
- [HybridCache library in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/caching/hybrid)
