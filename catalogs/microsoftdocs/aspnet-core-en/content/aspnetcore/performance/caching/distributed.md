---
title: Distributed caching in ASP.NET Core
ai-usage: ai-assisted
author: tdykstra
description: Learn how to use an ASP.NET Core distributed cache to improve app performance and scalability, especially in a cloud or server farm environment.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 10/07/2026
ms.sfi.ropc: t
uid: performance/caching/distributed

# customer intent: As an ASP.NET developer, I want to use an ASP.NET Core distributed cache, so I can improve app performance and scalability.
---
# Distributed caching in ASP.NET Core

By [Mohsin Nasir](https://github.com/mohsinnasir) and [smandia](https://github.com/smandia)

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


**Applies to: \>= aspnetcore-8.0**

A distributed cache is a cache shared by multiple app servers. The cache is typically maintained as an external service for the app servers that access it. A distributed cache can improve the performance and scalability of an ASP.NET Core app, especially when a cloud service or a server farm hosts the app.

A distributed cache has several advantages over other caching scenarios where cached data is stored on individual app servers.

When cached data is distributed, the data:

* Is *coherent* (consistent) across requests to multiple servers.
* Survives server restarts and app deployments.
* Doesn't use local memory.

Distributed cache configuration is implementation specific. This article describes how to configure SQL Server, Redis, or Postgres distributed caches. Non-Microsoft implementations are also available, such as [NCache](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache)), Azure Cosmos DB, and Postgres. Regardless of which implementation is selected, the app interacts with the cache by using the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/distributed/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


## Prerequisites

Add a package reference for the distributed cache provider used:

* For a Redis distributed cache, [Microsoft.Extensions.Caching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis).
* For SQL Server, [Microsoft.Extensions.Caching.SqlServer](https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer).
* For Postgres, [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres).
* For Azure Cosmos DB, [Microsoft.Extensions.Caching.Cosmos](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Cosmos).
* For the NCache distributed cache, [NCache.Microsoft.Extensions.Caching.OpenSource](https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource).

## Use the IDistributedCache interface

The [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface provides the following methods to manipulate items in the distributed cache implementation:

* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*): Accepts a string key and retrieves a cached item as a `byte[]` array if found in the cache.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*): Adds an item (as `byte[]` array) to the cache by using a string key.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*): Refreshes an item in the cache based on its key, resetting its sliding expiration timeout (if any).
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*): Removes a cache item based on its string key.

### Store objects other than byte arrays

[Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) stores values as `byte[]` arrays. To cache other types, serialize them first. The following extension methods use [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) to store any serializable type as UTF-8 JSON:

```csharp
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

public static class DistributedCacheExtensions
{
    public static Task SetAsync<T>(this IDistributedCache cache, string key, T value,
        DistributedCacheEntryOptions options, CancellationToken token = default) =>
        cache.SetAsync(key, JsonSerializer.SerializeToUtf8Bytes(value), options, token);

    public static async Task<T?> GetAsync<T>(this IDistributedCache cache, string key,
        CancellationToken token = default)
    {
        var bytes = await cache.GetAsync(key, token);
        return bytes is null ? default : JsonSerializer.Deserialize<T>(bytes);
    }
}
```

`GetAsync<T>` returns the type's default value, such as `null`, when the key isn't in the cache.

> **Tip:**
> The [`HybridCache` library](hybrid.md) serializes values for you and adds an in-process primary cache and stampede protection on top of the distributed cache.

## Establish distributed caching services

Register an implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) in the _Program.cs_ file. The following framework-provided implementations are described in this article:

* [Distributed Redis cache](#distributed-redis-cache)
* [Distributed memory cache](#distributed-memory-cache)
* [Distributed SQL Server cache](#distributed-sql-server-cache)
* [Distributed Postgres cache](#distributed-postgres-cache)
* [Distributed NCache cache](#distributed-ncache-cache)
* [Distributed Azure Cosmos DB cache](#distributed-azure-cosmos-db-cache)

### Distributed Redis cache

The distributed Redis cache delivers the best performance and is recommended for production apps. [Redis](https://redis.io/) is an open source in-memory data store, which is often used as a distributed cache. You can configure an [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview) for an Azure-hosted ASP.NET Core app, and use an Azure Cache for Redis for local development. For more information, see [Review cache recommendations](#review-cache-recommendations).

An app configures the cache implementation with a [Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache) instance by calling the [Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache%252A) method. For [output caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Foutput%23cache-storage), use the [Microsoft.Extensions.DependencyInjection.StackExchangeRedisOutputCacheServiceCollectionExtensions.AddStackExchangeRedisOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.StackExchangeRedisOutputCacheServiceCollectionExtensions.AddStackExchangeRedisOutputCache%252A) method.

1. Create an instance of Azure Cache for Redis.

1. Copy the primary connection string (StackExchange.Redis) to [Configuration](../../fundamentals/configuration/index.md).

   - **For local development**: Save the connection string with [Secret Manager](https://learn.microsoft.com/search/?terms=security%2Fapp-secrets%23secret-manager).

   - **For Azure**: Save the connection string in a secure store such as [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview).

The following code enables the Azure Cache for Redis:

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddStackExchangeRedisCache)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs.md)

The preceding code assumes the primary connection string (StackExchange.Redis) is saved in configuration with the key name `MyRedisConStr`.

For more information, see [Azure Managed Redis](https://learn.microsoft.com/azure/redis/overview).

For a discussion on alternative approaches to a local Redis cache, see [GitHub /dotnet/aspnetcore issue #19542](https://github.com/dotnet/AspNetCore.Docs/issues/19542).

### Distributed memory cache

The distributed memory cache ([Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*)) is a framework-provided implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) that stores items in memory. However, the distributed memory cache isn't an actual distributed cache. The app instance stores the cached items on the server where the app is running.

The distributed memory cache is a useful implementation for development and testing scenarios. It's also useful for a single server in a production scenario where memory consumption isn't an issue. Implementing the distributed memory cache abstracts cached data storage. It allows for implementing a true distributed caching solution in the future if multiple nodes or fault tolerance become necessary.

The sample app makes use of the distributed memory cache when the app runs in the `Development` environment in the _Program.cs_ file.

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddDistributedMemoryCache)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs.md)

### Distributed SQL Server cache

The distributed SQL Server cache implementation ([Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*)) allows the distributed cache to use a SQL Server database as its backing store. To create a SQL Server cached item table in a SQL Server instance, you can use the `sql-cache` tool. The tool creates a table with the name and schema that you specify.

Create a table in SQL Server by running the `sql-cache create` command. Provide the SQL Server instance (`Data Source`), database (`Initial Catalog`), schema (for example, `dbo`), and table name (for example, `TestCache`):

```dotnetcli
dotnet sql-cache create "Data Source=(localdb)/MSSQLLocalDB;Initial Catalog=DistCache;Integrated Security=True;" dbo TestCache
```

When the tool succeeds, a message is logged:

```console
Table and index were created successfully.
```

The table created by the `sql-cache` tool has the following schema:

Screenshot that shows the schema of a SQL Server cache table created with the 'sql-cache create' command.

> **Note:**
> An app should manipulate cache values by using an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache), not an instance of [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache).

The sample app implements the [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache) class in a nondevelopment (`Development`) environment in the _Program.cs_ file:

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddDistributedSqlServerCache)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs.md)

> **Note:**
> Properties like [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*) (and optionally, [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*) and [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*)) are typically stored outside of source control. For example, the [Secret Manager](../../security/app-secrets.md) or the _appsettings.json_ or _appsettings.{Environment}.json_ file might store the properties. The connection string can contain credentials that should be kept out of source control systems.

For more information, see [SQL Database on Azure](https://learn.microsoft.com/azure/sql-database/).

### Distributed Postgres cache

[Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql) can be used as a distributed cache backing store via the `IDistributedCache` interface. Azure Database for PostgreSQL is a fully managed, AI-ready Database-as-a-Service (DBaaS) offering built on the open-source PostgreSQL engine. The design supports mission-critical workloads with predictable performance, robust security, high availability, and seamless scalability. 

After installing the [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres) NuGet package, configure your distributed cache as follows:

1. Register the Service.

   ```csharp
   using Microsoft.Extensions.DependencyInjection;

   var builder = WebApplication.CreateBuilder(args);

   // Register the Postgres distributed cache.
   builder.Services.AddDistributedPostgresCache(options => {
      options.ConnectionString = builder.Configuration.GetConnectionString("PostgresCache");
      options.SchemaName = builder.Configuration.GetValue<string>("PostgresCache:SchemaName", "public");
      options.TableName = builder.Configuration.GetValue<string>("PostgresCache:TableName", "cache");
      options.CreateIfNotExists = builder.Configuration.GetValue<bool>("PostgresCache:CreateIfNotExists", true);
      options.UseWAL = builder.Configuration.GetValue<bool>("PostgresCache:UseWAL", false);
    
      // Optional: Configure expiration settings.

      var expirationInterval = builder.Configuration.GetValue<string>("PostgresCache:ExpiredItemsDeletionInterval");
      if (!string.IsNullOrEmpty(expirationInterval) && TimeSpan.TryParse(expirationInterval, out var interval)) {
          options.ExpiredItemsDeletionInterval = interval;
      }
    
      var slidingExpiration = builder.Configuration.GetValue<string>("PostgresCache:DefaultSlidingExpiration");
      if (!string.IsNullOrEmpty(slidingExpiration) && TimeSpan.TryParse(slidingExpiration, out var sliding)) {
          options.DefaultSlidingExpiration = sliding;
      }
   });

   var app = builder.Build();
   ```

1. Use the cache.

   ```csharp
   public class MyService {
       private readonly IDistributedCache _cache; 

       public MyService(IDistributedCache cache) {
           _cache = cache;
       }

       public async Task<string> GetDataAsync(string key) {
           var cachedData = await _cache.GetStringAsync(key);
        
           if (cachedData == null) {

               // Fetch the data from source.
               var data = await FetchDataFromSource();
            
               // Cache the data with options.
               var options = new DistributedCacheEntryOptions {
                  AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30),
                  SlidingExpiration = TimeSpan.FromMinutes(5)
               };
            
               await _cache.SetStringAsync(key, data, options);
               return data;
           }
        
           return cachedData;
       }
   }
   ```

### Distributed NCache cache

[NCache](https://github.com/Alachisoft/NCache) is an open source in-memory distributed cache developed natively in .NET. NCache works both locally and configured as a distributed cache cluster for an ASP.NET Core app running in Azure or on other hosting platforms.

To install and configure NCache on your local machine, see the [Getting Started Guide](https://www.alachisoft.com/resources/docs/ncache/getting-started/).

To configure NCache:

1. Install the [NCache SDK NuGet package](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/), which supports NCache Opensource for .NET Framework and .NET Core apps.

1. Configure the cache cluster in the [client configuration](https://www.alachisoft.com/resources/docs/ncache/admin-guide/client-config.html) (the _client.ncconf_ file).

1. Add the following code to the _Program.cs_ file:

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddNCache_Cache)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs.md)

### Distributed Azure Cosmos DB cache

[Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/overview) can be configured in ASP.NET Core as a session state provider by using the `IDistributedCache` interface. Azure Cosmos DB is a fully managed NoSQL and relational database for modern app development that offers high availability, scalability, and low-latency access to data for mission-critical applications.

After you install the [Microsoft.Extensions.Caching.Cosmos](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Cosmos) NuGet package, configure an Azure Cosmos DB distributed cache. You can use an existing Azure Cosmos DB client or create a new one, as described in the following sections.

For more information, see the [Microsoft Caching Extension using Azure Cosmos DB](https://github.com/Azure/Microsoft.Extensions.Caching.Cosmos/blob/master/README.md), the GitHub repository README file for the NuGet package.

#### Reuse an existing client

The easiest way to configure a distributed cache is by reusing an existing Azure Cosmos DB client. In this case, the `CosmosClient` instance isn't disposed when the provider is disposed.

```csharp
services.AddCosmosCache((CosmosCacheOptions cacheOptions) =>
{
    cacheOptions.ContainerName = Configuration["CosmosCacheContainer"];
    cacheOptions.DatabaseName = Configuration["CosmosCacheDatabase"];
    cacheOptions.CosmosClient = existingCosmosClient;
    cacheOptions.CreateIfNotExists = true;
});
```

#### Create a new client

Alternatively, instantiate a new client. In this case, the `CosmosClient` instance is disposed when the provider is disposed.

```csharp
services.AddCosmosCache((CosmosCacheOptions cacheOptions) =>
{
    cacheOptions.ContainerName = Configuration["CosmosCacheContainer"];
    cacheOptions.DatabaseName = Configuration["CosmosCacheDatabase"];
    cacheOptions.ClientBuilder = new CosmosClientBuilder(Configuration["CosmosConnectionString"]);
    cacheOptions.CreateIfNotExists = true;
});
```

## Use the distributed cache

To use the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface, request an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) in the app. The instance is provided by [dependency injection (DI)](../../fundamentals/dependency-injection.md).

When the sample app starts, the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instance is injected into the _Program.cs_ file. The current time is cached by using the [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime) interface. (For more information, see [.NET Generic Host: IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23ihostapplicationlifetime).)

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_Configure)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs.md)

The sample app injects the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instance into the `IndexModel` object for use by the Index page.

Each time the Index page loads, the cache is checked for the cached time by using the `OnGetAsync` method. If the cached time isn't expired, the time is displayed. If 20 seconds elapsed since the last time the cached time was accessed (the last time this page loaded), the page displays the message, _Cached Time Expired_.

Immediately update the cached time to the current time by selecting the **Reset Cached Time** option. This action triggers the `OnPostResetCachedTime` handler method.

[Code example (complete source file; reference: \~/performance/caching/distributed/samples/6.x/DistCacheSample/Pages/Index.cshtml.cs?name=snippet_IndexModel\&highlight=7,14-20,25-29)](../../../_code/aspnetcore/performance/caching/distributed/samples/6.x/DistCacheSample/Pages/Index.cshtml.cs.md)

> **Note:**
> You don't need to use a Singleton or Scoped lifetime for [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instances with a built-in implementation.
>
> You can also create an [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instance wherever you might need one instead of using DI. However, creating an instance in code can make your code harder to test and violates the [Explicit Dependencies Principle](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/architectural-principles#explicit-dependencies).

## Review cache recommendations

When deciding which implementation of the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface is best for your app, consider the following points:

* Existing infrastructure
* Performance requirements
* Cost
* Team experience

Caching solutions usually rely on in-memory storage to provide fast retrieval of cached data, but memory is a limited resource and costly to expand. Only store commonly used data in a cache.

For most apps, a Redis cache provides higher throughput and lower latency than a SQL Server cache. However, benchmarking is recommended to determine the performance characteristics of caching strategies.

If SQL Server is the distributed cache backing store, and the cache and app data storage/retrieval use the same database, performance can be reduced. The recommended approach is to use a dedicated SQL Server instance for the distributed cache backing store.

## Related content

* [Redis Cache on Azure](https://learn.microsoft.com/azure/azure-cache-for-redis/)
* [SQL Database on Azure](https://learn.microsoft.com/azure/sql-database/)
* [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/)
* [ASP.NET Core IDistributedCache Provider for NCache in Web Farms](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache))
* [Repository README file for Microsoft.Extensions.Caching.Cosmos](https://github.com/Azure/Microsoft.Extensions.Caching.Cosmos/blob/master/README.md)
* [fundamentals/change-tokens](../../fundamentals/change-tokens.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)
* [host-and-deploy/web-farm](../../host-and-deploy/web-farm.md)



**Applies to: \>= aspnetcore-6.0 <= aspnetcore-7.0**
<!-- ms.sfi.ropc: t -->

A distributed cache is a cache shared by multiple app servers, typically maintained as an external service to the app servers that access it. A distributed cache can improve the performance and scalability of an ASP.NET Core app, especially when the app is hosted by a cloud service or a server farm.

A distributed cache has several advantages over other caching scenarios where cached data is stored on individual app servers.

When cached data is distributed, the data:

* Is *coherent* (consistent) across requests to multiple servers.
* Survives server restarts and app deployments.
* Doesn't use local memory.

Distributed cache configuration is implementation specific. This article describes how to configure SQL Server,  Redis, and Postgres distributed caches. Third party implementations are also available, such as [NCache](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache)). Regardless of which implementation is selected, the app interacts with the cache using the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/distributed/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

Add a package reference for the distributed cache provider used:

* For a Redis distributed cache, [Microsoft.Extensions.Caching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis).
* For SQL Server, [Microsoft.Extensions.Caching.SqlServer](https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer).
* For Postgres, [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres).
* For the NCache distributed cache, [NCache.Microsoft.Extensions.Caching.OpenSource](https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource).

* > [!WARNING]
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


## IDistributedCache interface

The [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface provides the following methods to manipulate items in the distributed cache implementation:

* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*): Accepts a string key and retrieves a cached item as a `byte[]` array if found in the cache.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*): Adds an item (as `byte[]` array) to the cache using a string key.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*): Refreshes an item in the cache based on its key, resetting its sliding expiration timeout (if any).
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*): Removes a cache item based on its string key.

## Establish distributed caching services

Register an implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) in `Program.cs`. Framework-provided implementations described in this topic include:

* [Distributed Redis cache](#distributed-redis-cache)
* [Distributed Memory Cache](#distributed-memory-cache)
* [Distributed SQL Server cache](#distributed-sql-server-cache)
* [Distributed Postgres cache](#distributed-postgres-cache)
* [Distributed NCache cache](#distributed-ncache-cache)

### Distributed Redis Cache

We recommend production apps use the Distributed Redis Cache because it's the most performant. For more information see [Recommendations](#recommendations).

[Redis](https://redis.io/) is an open source in-memory data store, which is often used as a distributed cache.  You can configure an [Azure Redis Cache](https://azure.microsoft.com/services/cache/) for an Azure-hosted ASP.NET Core app, and use an Azure Redis Cache for local development.

An app configures the cache implementation using a [Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache) instance ([Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache*)).

  1. Create an Azure Cache for Redis.
  1. Copy the Primary connection string (StackExchange.Redis) to [Configuration](../../fundamentals/configuration/index.md).
     * Local development: Save the connection string with [Secret Manager](https://learn.microsoft.com/search/?terms=security%2Fapp-secrets%23secret-manager).
     * Azure: Save the connection string in a secure store such as [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview)

The following code enables the Azure Cache for Redis:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddStackExchangeRedisCache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

The preceding code assumes the Primary connection string (StackExchange.Redis) was saved in configuration with the key name `MyRedisConStr`.

For more information, see [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview).

See [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/19542) for a discussion on alternative approaches to a local Redis cache.

### Distributed Memory Cache

The Distributed Memory Cache ([Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*)) is a framework-provided implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) that stores items in memory. The Distributed Memory Cache isn't an actual distributed cache. Cached items are stored by the app instance on the server where the app is running.

The Distributed Memory Cache is a useful implementation:

* In development and testing scenarios.
* When a single server is used in production and memory consumption isn't an issue. Implementing the Distributed Memory Cache abstracts cached data storage. It allows for implementing a true distributed caching solution in the future if multiple nodes or fault tolerance become necessary.

The sample app makes use of the Distributed Memory Cache when the app is run in the `Development` environment in `Program.cs`:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddDistributedMemoryCache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

### Distributed SQL Server Cache

The Distributed SQL Server Cache implementation ([Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*)) allows the distributed cache to use a SQL Server database as its backing store. To create a SQL Server cached item table in a SQL Server instance, you can use the `sql-cache` tool. The tool creates a table with the name and schema that you specify.

Create a table in SQL Server by running the `sql-cache create` command. Provide the SQL Server instance (`Data Source`), database (`Initial Catalog`), schema (for example, `dbo`), and table name (for example, `TestCache`):

```dotnetcli
dotnet sql-cache create "Data Source=(localdb)/MSSQLLocalDB;Initial Catalog=DistCache;Integrated Security=True;" dbo TestCache
```

A message is logged to indicate that the tool was successful:

```console
Table and index were created successfully.
```

The table created by the `sql-cache` tool has the following schema:

SqlServer Cache Table

> **Note:**
> An app should manipulate cache values using an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache), not a [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache).

The sample app implements [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache) in a non-`Development` environment in `Program.cs`:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddDistributedSqlServerCache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

> **Note:**
> A [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*) (and optionally, [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*) and [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*)) are typically stored outside of source control (for example, stored by the [Secret Manager](../../security/app-secrets.md) or in `appsettings.json`/`appsettings.{Environment}.json` files). The connection string may contain credentials that should be kept out of source control systems.

### Distributed Postgres Cache

[Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql) can be used as a distributed cache backing store via the `IDistributedCache` interface. Azure Database for PostgreSQL is a fully managed, AI-ready Database-as-a-Service (DBaaS) offering built on the open-source PostgreSQL engine, designed to support mission-critical workloads with predictable performance, robust security, high availability, and seamless scalability. 

After installing the [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres) NuGet package, configure your distributed cache as follows:

1. Register the Service

```csharp
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register Postgres distributed cache
builder.Services.AddDistributedPostgresCache(options => {
    options.ConnectionString = builder.Configuration.GetConnectionString("PostgresCache");
    options.SchemaName = builder.Configuration.GetValue<string>("PostgresCache:SchemaName", "public");
    options.TableName = builder.Configuration.GetValue<string>("PostgresCache:TableName", "cache");
    options.CreateIfNotExists = builder.Configuration.GetValue<bool>("PostgresCache:CreateIfNotExists", true);
    options.UseWAL = builder.Configuration.GetValue<bool>("PostgresCache:UseWAL", false);
    
    // Optional: Configure expiration settings

    var expirationInterval = builder.Configuration.GetValue<string>("PostgresCache:ExpiredItemsDeletionInterval");
    if (!string.IsNullOrEmpty(expirationInterval) && TimeSpan.TryParse(expirationInterval, out var interval)) {
        options.ExpiredItemsDeletionInterval = interval;
    }
    
    var slidingExpiration = builder.Configuration.GetValue<string>("PostgresCache:DefaultSlidingExpiration");
    if (!string.IsNullOrEmpty(slidingExpiration) && TimeSpan.TryParse(slidingExpiration, out var sliding)) {
        options.DefaultSlidingExpiration = sliding;
    }
});

var app = builder.Build();
```

2. Use the Cache

```csharp
public class MyService {
    private readonly IDistributedCache _cache; 

    public MyService(IDistributedCache cache) {
        _cache = cache;
    }

    public async Task<string> GetDataAsync(string key) {
        var cachedData = await _cache.GetStringAsync(key);
        
        if (cachedData == null) {
            // Fetch data from source
            var data = await FetchDataFromSource();
            
            // Cache the data with options
            var options = new DistributedCacheEntryOptions {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30),
                SlidingExpiration = TimeSpan.FromMinutes(5)
            };
            
            await _cache.SetStringAsync(key, data, options);
            return data;
        }
        
        return cachedData;
    }
}
```

### Distributed NCache Cache

[NCache](https://github.com/Alachisoft/NCache) is an open source in-memory distributed cache developed natively in .NET and .NET Core. NCache works both locally and configured as a distributed cache cluster for an ASP.NET Core app running in Azure or on other hosting platforms.

To install and configure NCache on your local machine, see [Getting Started Guide for Windows (.NET and .NET Core)](https://www.alachisoft.com/resources/docs/ncache/getting-started-guide-windows/).

To configure NCache:

1. Install [NCache open source NuGet](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/).
1. Configure the cache cluster in [client.ncconf](https://www.alachisoft.com/resources/docs/ncache/admin-guide/client-config.html).
1. Add the following code to `Program.cs`:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_AddNCache_Cache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

## Use the distributed cache

To use the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface, request an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) in the app. The instance is provided by [dependency injection (DI)](../../fundamentals/dependency-injection.md).

When the sample app starts, [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) is injected into `Program.cs`. The current time is cached using [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime) (for more information, see [Generic Host: IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23ihostapplicationlifetime)):

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Program.cs?name=snippet_Configure](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

The sample app injects [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) into the `IndexModel` for use by the Index page.

Each time the Index page is loaded, the cache is checked for the cached time in `OnGetAsync`. If the cached time hasn't expired, the time is displayed. If 20 seconds have elapsed since the last time the cached time was accessed (the last time this page was loaded), the page displays *Cached Time Expired*.

Immediately update the cached time to the current time by selecting the **Reset Cached Time** button. The button triggers the `OnPostResetCachedTime` handler method.

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/6.x/DistCacheSample/Pages/Index.cshtml.cs?name=snippet_IndexModel\\&highlight=7,14-20,25-29](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

> There's  ***no*** need to use a Singleton or Scoped lifetime for [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instances with the built-in implementations.
>
> You can also create an [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instance wherever you might need one instead of using DI, but creating an instance in code can make your code harder to test and violates the [Explicit Dependencies Principle](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#explicit-dependencies).

## Recommendations

When deciding which implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) is best for your app, consider the following:

* Existing infrastructure
* Performance requirements
* Cost
* Team experience

Caching solutions usually rely on in-memory storage to provide fast retrieval of cached data, but memory is a limited resource and costly to expand. Only store commonly used data in a cache.

For most apps, a Redis cache provides higher throughput and lower latency than a SQL Server cache. However, benchmarking is recommended to determine the performance characteristics of caching strategies.

When SQL Server is used as a distributed cache backing store, use of the same database for the cache and the app's ordinary data storage and retrieval can negatively impact the performance of both. We recommend using a dedicated SQL Server instance for the distributed cache backing store.

## Additional resources

* [Redis Cache on Azure](https://learn.microsoft.com/azure/azure-cache-for-redis/)
* [SQL Database on Azure](https://learn.microsoft.com/azure/sql-database/)
* [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/)
* [ASP.NET Core IDistributedCache Provider for NCache in Web Farms](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache))
* [performance/caching/memory](memory.md)
* [fundamentals/change-tokens](../../fundamentals/change-tokens.md)
* [performance/caching/response](response.md)
* [performance/caching/middleware](middleware.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)
* [host-and-deploy/web-farm](../../host-and-deploy/web-farm.md)



**Applies to: < aspnetcore-6.0**
<!-- ms.sfi.ropc: t -->

A distributed cache is a cache shared by multiple app servers, typically maintained as an external service to the app servers that access it. A distributed cache can improve the performance and scalability of an ASP.NET Core app, especially when the app is hosted by a cloud service or a server farm.

A distributed cache has several advantages over other caching scenarios where cached data is stored on individual app servers.

When cached data is distributed, the data:

* Is *coherent* (consistent) across requests to multiple servers.
* Survives server restarts and app deployments.
* Doesn't use local memory.

Distributed cache configuration is implementation specific. This article describes how to configure SQL Server,  Redis, and Postgres distributed caches. Third party implementations are also available, such as [NCache](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache)). Regardless of which implementation is selected, the app interacts with the cache using the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/distributed/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

To use a SQL Server distributed cache, add a package reference to the [Microsoft.Extensions.Caching.SqlServer](https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer) package.

To use a Redis distributed cache, add a package reference to the [Microsoft.Extensions.Caching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis) package.

To use a Postgres distributed cache, add a package reference to the [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres) package.

To use NCache distributed cache, add a package reference to the [NCache.Microsoft.Extensions.Caching.OpenSource](https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource) package.

## IDistributedCache interface

The [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface provides the following methods to manipulate items in the distributed cache implementation:

* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*): Accepts a string key and retrieves a cached item as a `byte[]` array if found in the cache.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*): Adds an item (as `byte[]` array) to the cache using a string key.
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*): Refreshes an item in the cache based on its key, resetting its sliding expiration timeout (if any).
* [Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*), [Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*): Removes a cache item based on its string key.

## Establish distributed caching services

Register an implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) in `Startup.ConfigureServices`. Framework-provided implementations described in this topic include:

* [Distributed Memory Cache](#distributed-memory-cache)
* [Distributed SQL Server cache](#distributed-sql-server-cache)
* [Distributed Redis cache](#distributed-redis-cache)
* [Distributed Postgres cache](#distributed-postgres-cache)
* [Distributed NCache cache](#distributed-ncache-cache)

### Distributed Memory Cache

The Distributed Memory Cache ([Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*)) is a framework-provided implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) that stores items in memory. The Distributed Memory Cache isn't an actual distributed cache. Cached items are stored by the app instance on the server where the app is running.

The Distributed Memory Cache is a useful implementation:

* In development and testing scenarios.
* When a single server is used in production and memory consumption isn't an issue. Implementing the Distributed Memory Cache abstracts cached data storage. It allows for implementing a true distributed caching solution in the future if multiple nodes or fault tolerance become necessary.

The sample app makes use of the Distributed Memory Cache when the app is run in the `Development` environment in `Startup.ConfigureServices`:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/3.x/DistCacheSample/Startup.cs?name=snippet_AddDistributedMemoryCache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

### Distributed SQL Server Cache

The Distributed SQL Server Cache implementation ([Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*)) allows the distributed cache to use a SQL Server database as its backing store. To create a SQL Server cached item table in a SQL Server instance, you can use the `sql-cache` tool. The tool creates a table with the name and schema that you specify.

Create a table in SQL Server by running the `sql-cache create` command. Provide the SQL Server instance (`Data Source`), database (`Initial Catalog`), schema (for example, `dbo`), and table name (for example, `TestCache`):

```dotnetcli
dotnet sql-cache create "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=DistCache;Integrated Security=True;" dbo TestCache
```

A message is logged to indicate that the tool was successful:

```console
Table and index were created successfully.
```

The table created by the `sql-cache` tool has the following schema:

SqlServer Cache Table

> **Note:**
> An app should manipulate cache values using an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache), not a [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache).

The sample app implements [Microsoft.Extensions.Caching.SqlServer.SqlServerCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCache) in a non-`Development` environment in `Startup.ConfigureServices`:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/3.x/DistCacheSample/Startup.cs?name=snippet_AddDistributedSqlServerCache](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

> **Note:**
> A [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString*) (and optionally, [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName*) and [Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName*)) are typically stored outside of source control (for example, stored by the [Secret Manager](../../security/app-secrets.md) or in `appsettings.json`/`appsettings.{Environment}.json` files). The connection string may contain credentials that should be kept out of source control systems.

### Distributed Redis Cache

[Redis](https://redis.io/) is an open source in-memory data store, which is often used as a distributed cache.  You can configure an [Azure Redis Cache](https://azure.microsoft.com/services/cache/) for an Azure-hosted ASP.NET Core app, and use an Azure Redis Cache for local development.

An app configures the cache implementation using a [Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache) instance ([Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache*)).

  1. Create an Azure Cache for Redis.
  1. Copy the Primary connection string (StackExchange.Redis) to [Configuration](../../fundamentals/configuration/index.md).
     * Local development: Save the connection string with [Secret Manager](https://learn.microsoft.com/search/?terms=security%2Fapp-secrets%23secret-manager).
     * Azure: Save the connection string in a secure store such as [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview)

The following code enables the Azure Cache for Redis:

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/5.x/DistCacheSample/StartupRedis.cs?name=snippet_AddStackExchangeRedisCache\\&highlight=10-14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

The preceding code assumes the Primary connection string (StackExchange.Redis) was saved in configuration with the key name `MyRedisConStr`.

For more information, see [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview).

See [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/19542) for a discussion on alternative approaches to a local Redis cache.

### Distributed Postgres Cache

[Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql) can be used as a distributed cache backing store via the `IDistributedCache` interface. Azure Database for PostgreSQL is a fully managed, AI-ready Database-as-a-Service (DBaaS) offering built on the open-source PostgreSQL engine, designed to support mission-critical workloads with predictable performance, robust security, high availability, and seamless scalability. 

After installing the [Microsoft.Extensions.Caching.Postgres](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Postgres) NuGet package, configure your distributed cache as follows:

1. Register the Service

```csharp
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register Postgres distributed cache
builder.Services.AddDistributedPostgresCache(options => {
    options.ConnectionString = builder.Configuration.GetConnectionString("PostgresCache");
    options.SchemaName = builder.Configuration.GetValue<string>("PostgresCache:SchemaName", "public");
    options.TableName = builder.Configuration.GetValue<string>("PostgresCache:TableName", "cache");
    options.CreateIfNotExists = builder.Configuration.GetValue<bool>("PostgresCache:CreateIfNotExists", true);
    options.UseWAL = builder.Configuration.GetValue<bool>("PostgresCache:UseWAL", false);
    
    // Optional: Configure expiration settings

    var expirationInterval = builder.Configuration.GetValue<string>("PostgresCache:ExpiredItemsDeletionInterval");
    if (!string.IsNullOrEmpty(expirationInterval) && TimeSpan.TryParse(expirationInterval, out var interval)) {
        options.ExpiredItemsDeletionInterval = interval;
    }
    
    var slidingExpiration = builder.Configuration.GetValue<string>("PostgresCache:DefaultSlidingExpiration");
    if (!string.IsNullOrEmpty(slidingExpiration) && TimeSpan.TryParse(slidingExpiration, out var sliding)) {
        options.DefaultSlidingExpiration = sliding;
    }
});

var app = builder.Build();
```

2. Use the Cache

```csharp
public class MyService {
    private readonly IDistributedCache _cache; 

    public MyService(IDistributedCache cache) {
        _cache = cache;
    }

    public async Task<string> GetDataAsync(string key) {
        var cachedData = await _cache.GetStringAsync(key);
        
        if (cachedData == null) {
            // Fetch data from source
            var data = await FetchDataFromSource();
            
            // Cache the data with options
            var options = new DistributedCacheEntryOptions {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30),
                SlidingExpiration = TimeSpan.FromMinutes(5)
            };
            
            await _cache.SetStringAsync(key, data, options);
            return data;
        }
        
        return cachedData;
    }
}
```

### Distributed NCache Cache

[NCache](https://github.com/Alachisoft/NCache) is an open source in-memory distributed cache developed natively in .NET and .NET Core. NCache works both locally and configured as a distributed cache cluster for an ASP.NET Core app running in Azure or on other hosting platforms.

To install and configure NCache on your local machine, see [Getting Started Guide for Windows (.NET and .NET Core)](https://www.alachisoft.com/resources/docs/ncache/getting-started-guide-windows/).

To configure NCache:

1. Install [NCache open source NuGet](https://www.nuget.org/packages/Alachisoft.NCache.OpenSource.SDK/).
1. Configure the cache cluster in [client.ncconf](https://www.alachisoft.com/resources/docs/ncache/admin-guide/client-config.html).
1. Add the following code to `Startup.ConfigureServices`:

   ```csharp
   services.AddNCacheDistributedCache(configuration =>    
   {        
       configuration.CacheName = "demoClusteredCache";
       configuration.EnableLogs = true;
       configuration.ExceptionsEnabled = true;
   });
   ```

## Use the distributed cache

To use the [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface, request an instance of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) from any constructor in the app. The instance is provided by [dependency injection (DI)](../../fundamentals/dependency-injection.md).

When the sample app starts, [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) is injected into `Startup.Configure`. The current time is cached using [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime) (for more information, see [Generic Host: IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23ihostapplicationlifetime)):

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/3.x/DistCacheSample/Startup.cs?name=snippet_Configure\\&highlight=10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

The sample app injects [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) into the `IndexModel` for use by the Index page.

Each time the Index page is loaded, the cache is checked for the cached time in `OnGetAsync`. If the cached time hasn't expired, the time is displayed. If 20 seconds have elapsed since the last time the cached time was accessed (the last time this page was loaded), the page displays *Cached Time Expired*.

Immediately update the cached time to the current time by selecting the **Reset Cached Time** button. The button triggers the `OnPostResetCachedTime` handler method.

[Code reference unavailable in this source snapshot: distributed/includes/~/performance/caching/distributed/samples/3.x/DistCacheSample/Pages/Index.cshtml.cs?name=snippet_IndexModel\\&highlight=7,14-20,25-29](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/caching/distributed.md)

> **Note:**
> There's no need to use a Singleton or Scoped lifetime for [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instances  (at least for the built-in implementations).
>
> You can also create an [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) instance wherever you might need one instead of using DI, but creating an instance in code can make your code harder to test and violates the [Explicit Dependencies Principle](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#explicit-dependencies).

## Recommendations

When deciding which implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) is best for your app, consider the following:

* Existing infrastructure
* Performance requirements
* Cost
* Team experience

Caching solutions usually rely on in-memory storage to provide fast retrieval of cached data, but memory is a limited resource and costly to expand. Only store commonly used data in a cache.

Generally, a Redis cache provides higher throughput and lower latency than a SQL Server cache. However, benchmarking is usually required to determine the performance characteristics of caching strategies.

When SQL Server is used as a distributed cache backing store, use of the same database for the cache and the app's ordinary data storage and retrieval can negatively impact the performance of both. We recommend using a dedicated SQL Server instance for the distributed cache backing store.

## Additional resources

* [Redis Cache on Azure](https://learn.microsoft.com/azure/azure-cache-for-redis/)
* [SQL Database on Azure](https://learn.microsoft.com/azure/sql-database/)
* [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/)
* [ASP.NET Core IDistributedCache Provider for NCache in Web Farms](http://www.alachisoft.com/ncache/aspnet-core-idistributedcache-ncache.html) ([NCache on GitHub](https://github.com/Alachisoft/NCache))
* [performance/caching/memory](memory.md)
* [fundamentals/change-tokens](../../fundamentals/change-tokens.md)
* [performance/caching/response](response.md)
* [performance/caching/middleware](middleware.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)
* [host-and-deploy/web-farm](../../host-and-deploy/web-farm.md)
