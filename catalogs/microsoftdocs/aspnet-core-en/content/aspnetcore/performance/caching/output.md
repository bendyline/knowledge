---
title: Output caching middleware in ASP.NET Core
author: tdykstra
description: Learn how to configure and use output caching middleware in ASP.NET Core.
monikerRange: '>= aspnetcore-7.0'
ms.author: tdykstra
ms.date: 06/09/2026
uid: performance/caching/output

# customer intent: As an ASP.NET developer, I want to configure output caching middleware in ASP.NET Core, so I can use output caching in my apps.
---
# Output caching middleware in ASP.NET Core

By [Tom Dykstra](https://github.com/tdykstra)

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

This article explains how to configure output caching middleware in an ASP.NET Core app. For an introduction to output caching, see [Output caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Foverview%23output-caching).

The output caching middleware can be used in all types of ASP.NET Core apps: [Minimal APIs](../../fundamentals/minimal-apis.md), [Web API with controllers](../../web-api/index.md), [MVC](../../mvc/overview.md), and [Razor Pages](../../razor-pages/index.md). Code examples are provided for Minimal APIs and controller-based APIs. The controller-based API examples show how to use attributes to configure caching. These attributes can also be used in MVC and Razor Pages apps.

The code examples refer to a [Gravatar class](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/performance/caching/output/samples/7.x/Gravatar.cs) that generates an image and provides a "generated at" date and time. The class is defined and used only in [the sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/performance/caching/output/samples/7.x). Its purpose is to make it easy to see when cached output is being used. For more information, see [How to download a sample](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample) and [Preprocessor directives](https://learn.microsoft.com/dotnet/csharp/fundamentals/program-structure/preprocessor-directives).

## Add the middleware to the app

Add the output caching middleware to the service collection by calling the [Microsoft.Extensions.DependencyInjection.OutputCacheServiceCollectionExtensions.AddOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OutputCacheServiceCollectionExtensions.AddOutputCache%252A) method. For example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies4" highlight="1"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Add the middleware to the request processing pipeline by calling the [Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%252A) method. For example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="snippet_use" highlight="6"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Calling the `AddOutputCache`and `UseOutputCache` methods doesn't start caching behavior, it makes caching available. To make the app cache responses, caching must be configured as described in the following sections.

> **Note:**
> * In apps that use [Cross-Origin Requests (CORS) middleware](../../security/cors.md), the `UseOutputCache` method must be called after the [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) method.
> * In Razor Pages apps and apps with controllers, the `UseOutputCache` method must be called after the `UseRouting` method.
> * In apps that use [authentication](../../security/authentication/index.md) or [authorization](../../security/authorization/introduction.md), the `UseOutputCache` method must be called after the [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) methods. Otherwise, the output caching middleware can serve content cached for unauthorized users instead of content for authorized users.

## Configure one endpoint or page

For Minimal API apps, configure an endpoint to do caching by calling the [CacheOutput](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OutputCacheConventionBuilderExtensions.CacheOutput%252A) method, or by applying the [[OutputCache](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheAttribute)] attribute, as shown in the following examples:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="oneendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

For apps with controllers, apply the `[OutputCache]` attribute to the action method as shown in the following code:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/CachedController.cs" id="snippet_oneendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/CachedController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/CachedController.cs.md)

For Razor Pages apps, apply the attribute to the Razor page class.

## Configure multiple endpoints or pages

Create *policies* when calling the `AddOutputCache` method to specify caching configuration that applies to multiple endpoints. A policy can be selected for specific endpoints, while a base policy provides default caching configuration for a collection of endpoints.

The following highlighted code configures caching for all of the app's endpoints, with an expiration time of 10 seconds. If an expiration time isn't specified, it defaults to one minute.

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies1" highlight="3-4"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following highlighted code creates two policies, each specifying a different expiration time. Selected endpoints can use the 20-second expiration, and others can use the 30-second expiration.

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies1" highlight="5-8"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

You can select a policy for an endpoint when calling the `CacheOutput` method or by using the `[OutputCache]` attribute.

In a Minimal API app, the following code configures one endpoint with a 20-second expiration and one with a 30-second expiration:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectpolicy"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

For apps with controllers, apply the `[OutputCache]` attribute to the action method to select a policy:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/Expire20Controller.cs" id="snippet_selectpolicy"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/Expire20Controller.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/Expire20Controller.cs.md)

For Razor Pages apps, apply the attribute to the Razor page class.

## Work with the default output caching policy

By default, output caching follows these rules:

* Only HTTP 200 responses are cached.
* Only HTTP GET or HEAD requests are cached.
* Responses that set cookies aren't cached.
* Responses to authenticated requests aren't cached.

The following code applies all of the default caching rules to all of an app's endpoints:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

### Override the default policy

The following code shows how to override the default policy rules. The highlighted lines in the following custom policy code enable caching for HTTP POST methods and HTTP 301 responses:

[language="csharp" source="\~/performance/caching/output/samples/7.x/MyCustomPolicy.cs" highlight="50,68"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/MyCustomPolicy.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/MyCustomPolicy.cs.md)

To use this custom policy, create a named policy:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3b"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

And, select the named policy for an endpoint. The following code selects the custom policy for an endpoint in a Minimal API app:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="post"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following code does the same for a controller action:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/PostController.cs" id="snippet_post"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/PostController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/PostController.cs.md)

### Use an alternative default policy override 

Alternatively, use Dependency Injection (DI) to initialize an instance with the following changes to the custom policy class:

* Use a public constructor instead of a private constructor.
* Eliminate the `Instance` property in the custom policy class.

For example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/MyCustomPolicy2.cs" id="fordi"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/MyCustomPolicy2.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/MyCustomPolicy2.cs.md)

The remainder of the class is the same as shown previously. Add the custom policy as shown in the following example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3c"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The preceding code uses DI to create the instance of the custom policy class. Any public arguments in the constructor are resolved.

When using a custom policy as a base policy, don't call the `OutputCache()` method (with no arguments) or use the `[OutputCache]` attribute on any endpoint that the base policy should apply to. Calling the `OutputCache()` method or using the attribute adds the default policy to the endpoint.

## Specify the cache key

By default, every part of the URL is included as the key to a cache entry, that is, the scheme, host, port, path, and query string. However, you might want to explicitly control the cache key. For example, suppose you have an endpoint that returns a unique response only for each unique value of the `culture` query string. Variation in other parts of the URL, such as other query strings, shouldn't result in different cache entries. You can specify such rules in a policy, as shown in the following highlighted code:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="7"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

You can then select the `VaryByQuery` policy for an endpoint. In a Minimal API app, the following code selects the `VaryByQuery` policy for an endpoint that returns a unique response only for each unique value of the `culture` query string:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectquery"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following code does the same for a controller action:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/QueryController.cs" id="snippet_selectquery"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/QueryController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/QueryController.cs.md)

Here are some of the options for controlling the cache key:

* The [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery%252A) method specifies one or more query string names to add to the cache key.
* The [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader%252A) method specifies one or more HTTP headers to add to the cache key.
* The [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByValue%252A) method provides a value to add to the cache key. The following example uses a value that indicates whether the current server time in seconds is odd or even. A new response is generated only when the number of seconds changes from an odd to even value, or vice versa.

  [language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Program.cs" id="policies2" highlight="10-14"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Program.cs.md)

Use the [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.UseCaseSensitivePaths](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.UseCaseSensitivePaths) property to specify that the path part of the key is case sensitive. The default is case insensitive.

For more options, see the [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder) class.

## Enable cache revalidation

Cache revalidation means the server can return a _304 Not Modified_ HTTP status code instead of the full response body. This status code informs the client that the response to the request is unchanged from what the client previously received.

The following code illustrates the use of an [ETag](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag) header to enable cache revalidation. If the client sends an [If-None-Match](https://developer.mozilla.org/docs/Web/HTTP/Headers/If-None-Match) header with the value for the `ETag` from an earlier response, and the cache entry is fresh, the server returns the [304 Not Modified](https://developer.mozilla.org/docs/Web/HTTP/Status/304) code instead of the full response.

The following code sets the `ETag` value in a policy in a Minimal API app:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="etag"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following code does the same for a controller-based API:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/EtagController.cs" id="snippet_etag"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/EtagController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/EtagController.cs.md)

Another way to do cache revalidation is to check the date of the cache entry creation compared to the date requested by the client. When the request header `If-Modified-Since` is provided, output caching returns the 304 code if the cached entry is older and isn't expired.

Cache revalidation is automatic in response to these headers sent from the client. No special configuration is required on the server to enable this behavior, aside from enabling output caching.

## Use tags to evict cache entries

You can use tags to identify a group of endpoints and evict all cache entries for the group. For example, the following Minimal API code creates a pair of endpoints whose URLs begin with the text `blog` and applies the `tag-blog` tag:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="tagendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following code shows how to assign tags to an endpoint in a controller-based API:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/TagEndpointController.cs" id="snippet_tagendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/TagEndpointController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/TagEndpointController.cs.md)

An alternative way to assign tags for endpoints with routes that begin with `blog` is to define a base policy that applies to all endpoints with that route. The following code demonstrates this approach:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="3-5"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Another alternative for Minimal API apps is to call the [MapGroup](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutebuilderextensions.mapgroup) method:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="taggroup"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

In the preceding tag assignment examples, both endpoints are identified by the `tag-blog` tag. You can then evict the cache entries for those endpoints with a single statement that references that tag:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="evictbytag"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

With this code, an HTTP POST request sent to the `https://localhost:<port>/purge/tag-blog` URL evicts cache entries for these endpoints.

You might want a way to evict all cache entries for all endpoints. You can create a base policy for all endpoints as demonstrated in the following code:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="6"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

This base policy enables you to use the `tag-all` tag to evict everything in cache.

## Disable resource locking

By default, resource locking is enabled to mitigate the risk of [cache stampede and thundering herd](https://wikipedia.org/wiki/Thundering_herd_problem). For more information, see [Output Caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Foverview%23output-caching).

To disable resource locking, call the [SetLocking(false)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetLocking%252A) method while creating a policy, as shown in the following example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="9"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The next example selects the no-locking policy for an endpoint in a Minimal API app:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectnolock"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

In a controller-based API, use the attribute to select the policy:

[language="csharp" source="\~/performance/caching/output/samples/9.x/OCControllers/Controllers/NoLockController.cs" id="snippet_selectnolock"::: (complete source file; reference: \~/performance/caching/output/samples/9.x/OCControllers/Controllers/NoLockController.cs)](../../../_code/aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/NoLockController.cs.md)

## Configure limits

The following properties of the [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions) class let you configure limits that apply to all endpoints:

* The [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.SizeLimit) property sets the maximum size for the cache storage. When the limit is reached, no new responses are cached until older entries are evicted. The default value is 100 MB.
* The [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.MaximumBodySize) property sets the maximum size for the response body. If the response body exceeds the limit, it isn't cached. The default value is 64 MB.
* The [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.DefaultExpirationTimeSpan](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.DefaultExpirationTimeSpan) property sets the maximum duration a response is cached, when a time isn't specified in a policy. The default value is 60 seconds.

## Explore cache storage options

The [Microsoft.AspNetCore.OutputCaching.IOutputCacheStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.IOutputCacheStore) interface is used for storage. By default, it's used with the [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache) class. Cached responses are stored in-process, so each server has a separate cache that is lost whenever the server process restarts.

### Alternative: Redis cache

An alternative is to use [Redis](https://redis.io/) cache. Redis cache provides consistency between server nodes via a shared cache that outlives individual server processes. To use Redis for output caching:

* Install the [Microsoft.AspNetCore.OutputCaching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.AspNetCore.OutputCaching.StackExchangeRedis) NuGet package.

* Call the `builder.Services.AddStackExchangeRedisOutputCache` method (not the `AddStackExchangeRedisCache` method), and provide a connection string that points to a Redis server.

  For example:

  [language="csharp" source="\~/performance/caching/output/samples/8.x/Program.cs" id="redis" highlight="1-6"::: (complete source file; reference: \~/performance/caching/output/samples/8.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/8.x/Program.cs.md)

  * The [options.Configuration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.StackExchangeRedis.RedisCacheOptions.Configuration) property is a connection string to an on-premises Redis server or to a hosted offering such as [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/). For example, `<instance_name>.redis.cache.windows.net:6380,password=,pw,ssl=True,abortConnect=False` for Azure Cache for Redis.

  * (Optional) The [options.InstanceName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.StackExchangeRedis.RedisCacheOptions.InstanceName) property specifies a logical partition for the cache.
 
  The configuration options are identical to the [Redis-based distributed caching options](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Fdistributed%23distributed-redis-cache).

### Not recommended: IDistributedCache

The [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) interface isn't recommended for use with output caching. This interface doesn't provide atomic features, which are required for tagging.

The recommended approach is to use the built-in support for Redis or create a custom [Microsoft.AspNetCore.OutputCaching.IOutputCacheStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.IOutputCacheStore) implementation by using direct dependencies on the underlying storage mechanism.

## Related content

* [Overview of caching in ASP.NET Core](overview.md)
* [ASP.NET Core middleware](../../fundamentals/middleware/index.md)
* [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions)
* [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder)



**Applies to: \= aspnetcore-7.0**

This article explains how to configure output caching middleware in an ASP.NET Core app. For an introduction to output caching, see [Output caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Foverview%23output-caching).

The output caching middleware can be used in all types of ASP.NET Core apps: Minimal API, Web API with controllers, MVC, and Razor Pages. The sample app is a Minimal API, but every caching feature it illustrates is also supported in the other app types.

## Add the middleware to the app

Add the output caching middleware to the service collection by calling [Microsoft.Extensions.DependencyInjection.OutputCacheServiceCollectionExtensions.AddOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OutputCacheServiceCollectionExtensions.AddOutputCache%252A).

Add the middleware to the request processing pipeline by calling [Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache%252A).

> **Note:**
> * In apps that use [CORS middleware](../../security/cors.md), `UseOutputCache` must be called after [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A).
> * In Razor Pages apps and apps with controllers, `UseOutputCache` must be called after `UseRouting`.
> * In apps that use [authentication](../../security/authentication/index.md) or [authorization](../../security/authorization/introduction.md), `UseOutputCache` must be called after [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). Otherwise, the output caching middleware can serve content cached for unauthorized users instead of content for authorized users.
> * Calling `AddOutputCache`and `UseOutputCache` doesn't start caching behavior, it makes caching available. Caching response data must be configured as shown in the following sections.

## Configure one endpoint or page

For Minimal API apps, configure an endpoint to do caching by calling [`CacheOutput`](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OutputCacheConventionBuilderExtensions.CacheOutput%252A), or by applying the [`[OutputCache]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheAttribute) attribute, as shown in the following examples:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="oneendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

For apps with controllers, apply the `[OutputCache]` attribute to the action method. For Razor Pages apps, apply the attribute to the Razor page class.

## Configure multiple endpoints or pages

Create *policies* when calling `AddOutputCache` to specify caching configuration that applies to multiple endpoints. A policy can be selected for specific endpoints, while a base policy provides default caching configuration for a collection of endpoints.

The following highlighted code configures caching for all of the app's endpoints, with expiration time of 10 seconds. If an expiration time isn't specified,  it defaults to one minute.

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies1" highlight="3-4"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following highlighted code creates two policies, each specifying a different expiration time. Selected endpoints can use the 20 second expiration, and others can use the 30 second expiration.

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies1" highlight="5-8"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

You can select a policy for an endpoint when calling the `CacheOutput` method or using the `[OutputCache]` attribute:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectpolicy"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

For apps with controllers, apply the `[OutputCache]` attribute to the action method. For Razor Pages apps, apply the attribute to the Razor page class.

## Default output caching policy

By default, output caching follows these rules:

* Only HTTP 200 responses are cached.
* Only HTTP GET or HEAD requests are cached.
* Responses that set cookies aren't cached.
* Responses to authenticated requests aren't cached.

The following code applies all of the default caching rules to all of an app's endpoints:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

### Override the default policy

The following code shows how to override the default rules. The highlighted lines in the following custom policy code enable caching for HTTP POST methods and HTTP 301 responses:

[language="csharp" source="\~/performance/caching/output/samples/7.x/MyCustomPolicy.cs" highlight="50,68"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/MyCustomPolicy.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/MyCustomPolicy.cs.md)

To use this custom policy, create a named policy:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3b"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

And select the named policy for an endpoint:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="post"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

### Alternative default policy override 

Alternatively, use Dependency Injection (DI) to initialize an instance, with the following changes to the custom policy class:

* A public constructor instead of a private constructor.
* Eliminate the `Instance` property in the custom policy class.

For example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/MyCustomPolicy2.cs" id="fordi"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/MyCustomPolicy2.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/MyCustomPolicy2.cs.md)

The remainder of the class is the same as shown previously. Add the custom policy as shown in the following example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies3c"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The preceding code uses DI to create the instance of the custom policy class. Any public arguments in the constructor are resolved.

When using a custom policy as a base policy, don't call `OutputCache()` (with no arguments) on any endpoint that the base policy should apply to. Calling `OutputCache()` adds the default policy to the endpoint.

## Specify the cache key

By default, every part of the URL is included as the key to a cache entry, that is, the scheme, host, port, path, and query string. However, you might want to explicitly control the cache key. For example, suppose you have an endpoint that returns a unique response only for each unique value of the `culture` query string. Variation in other parts of the URL, such as other query strings, shouldn't result in different cache entries. You can specify such rules in a policy, as shown in the following highlighted code:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="7"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

You can then select the `VaryByQuery` policy for an endpoint:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectquery"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Here are some of the options for controlling the cache key:

* [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery%252A) - Specify one or more query string names to add to the cache key.
* [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader%252A) - Specify one or more HTTP headers to add to the cache key.
* [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByValue%252A)- Specify a value to add to the cache key. The following example uses a value that indicates whether the current server time in seconds is odd or even. A new response is generated only when the number of seconds goes from odd to even or even to odd.

  [language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="varybyvalue"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Use [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.UseCaseSensitivePaths](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.UseCaseSensitivePaths) to specify that the path part of the key is case sensitive. The default is case insensitive.

For more options, see the [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder) class.

## Cache revalidation

Cache revalidation means the server can return a `304 Not Modified` HTTP status code instead of the full response body. This status code informs the client that the response to the request is unchanged from what the client previously received.

The following code illustrates the use of an [`Etag`](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag) header to enable cache revalidation. If the client sends an [`If-None-Match`](https://developer.mozilla.org/docs/Web/HTTP/Headers/If-None-Match) header with the etag value of an earlier response, and the cache entry is fresh, the server returns [304 Not Modified](https://developer.mozilla.org/docs/Web/HTTP/Status/304) instead of the full response:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="etag"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Another way to do cache revalidation is to check the date of the cache entry creation compared to the date requested by the client. When the request header `If-Modified-Since` is provided, output caching returns 304 if the cached entry is older and isn't expired.

Cache revalidation is automatic in response to these headers sent from the client. No special configuration is required on the server to enable this behavior, aside from enabling output caching.

## Use tags to evict cache entries

You can use tags to identify a group of endpoints and evict all cache entries for the group. For example, the following code creates a pair of endpoints whose URLs begin with "blog", and tags them "tag-blog":

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="tagendpoint"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

An alternative way to assign tags for the same pair of endpoints is to define a base policy that applies to endpoints that begin with `blog`:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="3-5"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

Another alternative is to call `MapGroup`:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="taggroup"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

In the preceding tag assignment examples, both endpoints are identified by the `tag-blog` tag. You can then evict the cache entries for those endpoints with a single statement that references that tag:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="evictbytag"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

With this code, an HTTP POST request sent to `https://localhost:<port>/purge/tag-blog` will evict cache entries for these endpoints.

You might want a way to evict all cache entries for all endpoints. To do that, create a base policy for all endpoints as the following code does:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="6"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

This base policy enables you to use the "tag-all" tag to evict everything in cache.

## Disable resource locking

By default, resource locking is enabled to mitigate the risk of [cache stampede and thundering herd](https://en.wikipedia.org/wiki/Thundering_herd_problem). For more information, see [Output Caching](https://learn.microsoft.com/search/?terms=performance%2Fcaching%2Foverview%23output-caching).

To disable resource locking, call [SetLocking(false)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetLocking%252A) while creating a policy, as shown in the following example:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="policies2" highlight="9"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

The following example selects the no-locking policy for an endpoint:

[language="csharp" source="\~/performance/caching/output/samples/7.x/Program.cs" id="selectnolock"::: (complete source file; reference: \~/performance/caching/output/samples/7.x/Program.cs)](../../../_code/aspnetcore/performance/caching/output/samples/7.x/Program.cs.md)

## Limits

The following properties of [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions) let you configure limits that apply to all endpoints:

* [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.SizeLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.SizeLimit) - Maximum size of cache storage. When this limit is reached, no new responses will be cached until older entries are evicted. Default value is 100 MB.
* [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.MaximumBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.MaximumBodySize) - If the response body exceeds this limit, it will not be cached. Default value is 64 MB.
* [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.DefaultExpirationTimeSpan](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.DefaultExpirationTimeSpan) - The expiration time duration that applies when not specified by a policy. Default value is 60 seconds.

## Cache storage

[Microsoft.AspNetCore.OutputCaching.IOutputCacheStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.IOutputCacheStore) is used for storage. By default it's used with [System.Runtime.Caching.MemoryCache](https://learn.microsoft.com/search/?terms=System.Runtime.Caching.MemoryCache). We don't recommend [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) for use with output caching. `IDistributedCache` doesn't have atomic features, which are required for tagging. We recommend that you create custom [Microsoft.AspNetCore.OutputCaching.IOutputCacheStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.IOutputCacheStore) implementations by using direct dependencies on the underlying storage mechanism, such as Redis. Or use the [built-in support for Redis cache in .NET 8.](output.md).

## See also

* [performance/caching/overview](overview.md)
* [fundamentals/middleware/index](../../fundamentals/middleware/index.md)
* [Microsoft.AspNetCore.OutputCaching.OutputCacheOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCacheOptions)
* [Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder)
