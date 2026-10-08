---
title: HttpClient guidelines for .NET
description: Learn about using HttpClient instances to send HTTP requests and how you can manage clients using IHttpClientFactory in your .NET apps.
author: gewarren
ms.author: gewarren
ms.date: 10/22/2025
ai-usage: ai-assisted
---

# Guidelines for using HttpClient

The [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) class sends HTTP requests and receives HTTP responses from a resource identified by a URI. An [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance is a collection of settings that's applied to all requests executed by that instance, and each instance uses its own connection pool, which isolates its requests from others. Starting in .NET Core 2.1, the [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler) class provides the implementation, making behavior consistent across all platforms.

## DNS behavior

[System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) only resolves DNS entries when a connection is created. It doesn't track any time to live (TTL) durations specified by the DNS server. If DNS entries change regularly, which can happen in some scenarios, the client won't respect those updates. To solve this issue, limit the lifetime of the connection by setting the [System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime) property, so that DNS lookup is repeated when the connection is replaced. Consider this example:

```csharp
var handler = new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromMinutes(15) // Recreate every 15 minutes
};
var sharedClient = new HttpClient(handler);
```

The preceding `HttpClient` is configured to reuse connections for 15 minutes. After the timespan specified by [System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime) has elapsed and the connection has completed its last associated request (if any), the connection is closed. If there are any requests waiting in the queue, a new connection is created as needed.

The 15-minute interval was chosen arbitrarily for illustration purposes. You should choose the value based on the expected frequency of DNS or other network changes.

## Pooled connections

The connection pool for an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is linked to the underlying [System.Net.Http.SocketsHttpHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler). Disposing an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) disposes the pool only when the client owns and disposes the underlying handler. If a client uses a handler that it doesn't own, disposing the client doesn't affect the handler or its connections. [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) creates clients with handlers that it manages, so it can reuse handlers and their connection pools. Sending another request to the same server using a different handler requires a new connection. As a result, there's a performance penalty for unnecessary connection creation. Moreover, TCP ports aren't released immediately after connection closure. (For more information on that, see TCP `TIME-WAIT` in [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.3.2).) If the rate of requests is high, the operating system limit of available ports might be exhausted. To avoid port exhaustion problems, [reuse](#recommended-use) [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances for as many HTTP requests as possible.

## Recommended use

To summarize recommended `HttpClient` use in terms of lifetime management, you should use either *long-lived* clients and set `PooledConnectionLifetime` (.NET Core and .NET 5+) or *short-lived* clients created by `IHttpClientFactory`.

- In .NET Core and .NET 5+:

  - Use a `static` or *singleton* [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance with [System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime) set to the desired interval, such as 2 minutes, depending on expected DNS changes. This solves both the port exhaustion and DNS changes problems without adding the overhead of [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory). If you need to be able to mock your handler, you can register it separately.

  > **Tip:**
  > If you only use a limited number of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances, that's also an acceptable strategy. What matters is that they're not created and disposed with each request, as they each contain a connection pool. Using more than one instance is necessary for scenarios with multiple proxies or to separate cookie containers without completely disabling cookie handling.

  - Using [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory), you can have multiple, differently configured clients for different use cases. However, be aware that the factory-created clients are intended to be short-lived, and once the client is created, the factory no longer has control over it.

    The factory pools [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) instances, and, if its lifetime hasn't expired, a handler can be reused from the pool when the factory creates a new [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance. This reuse avoids any socket exhaustion issues.

    If you desire the configurability that [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) provides, we recommend using the [typed-client approach](../../../core/extensions/httpclient-factory.md#typed-clients).

- In .NET Framework, use [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) to manage your `HttpClient` instances. If you don't use the factory and instead create a new client instance for each request yourself, you can exhaust available ports.

    > **Warning:**
    > If your app requires cookies, it's recommended to avoid using [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory). Pooling the [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) instances results in sharing of [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) objects. Unanticipated [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) sharing might leak cookies between unrelated parts of the application. Moreover, when [Microsoft.Extensions.Http.HttpClientFactoryOptions.HandlerLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Http.HttpClientFactoryOptions.HandlerLifetime) expires, the handler is recycled, meaning that all cookies stored in its [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) are lost.

For more information about managing `HttpClient` lifetime with `IHttpClientFactory`, see [`IHttpClientFactory` guidelines](../../../core/extensions/httpclient-factory.md#httpclient-lifetime-management).

## Resilience with static clients

It's possible to configure a `static` or *singleton* client to use any number of resilience pipelines using the following pattern:

[language="csharp" source="snippets/httpclient-guidelines/MyClass.cs"::: (complete source file; reference: snippets/httpclient-guidelines/MyClass.cs)](../../../../_code/docs/fundamentals/networking/http/snippets/httpclient-guidelines/MyClass.cs.md)

The preceding code:

- Relies on [Microsoft.Extensions.Http.Resilience](https://www.nuget.org/packages/Microsoft.Extensions.Http.Resilience) NuGet package.
- Specifies a transient HTTP error handler, configured with retry pipeline that with each attempt will exponentially backoff delay intervals.
- Defines a pooled connection lifetime of fifteen minutes for the `socketHandler`.
- Passes the `socketHandler` to the `resilienceHandler` with the retry logic.
- Instantiates a shared `HttpClient` given the `resilienceHandler`.

## See also

- [HTTP support in .NET](http-overview.md)
- [HTTP client factory with .NET](../../../core/extensions/httpclient-factory.md)
- [Make HTTP requests with the HttpClient](httpclient.md)
- [Use IHttpClientFactory to implement resilient HTTP requests](../../../architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests.md)
