---
title: "Breaking change: ConcurrencyLimiterMiddleware is obsolete"
description: Learn about the breaking change in ASP.NET Core 8.0 where ConcurrencyLimiterMiddleware has been obsoleted.
ms.date: 05/03/2023
ms.custom: https://github.com/aspnet/Announcements/issues/502
---
# ConcurrencyLimiterMiddleware is obsolete

[Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware) and its associated methods and types have been marked as obsolete.

If you require rate-limiting capabilities, switch to the newer and more capable rate-limiting middleware that was introduced in .NET 7 (for example, [Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%252A)). The .NET 7 rate-limiting API includes a concurrency limiter and several other rate-limiting algorithms that you can apply to your application.

## Version introduced

ASP.NET Core 8.0 Preview 4

## Previous behavior

Developers could use [Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware) to control concurrency by adding a policy to dependency injection (DI) and enabling the middleware:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddStackPolicy<options => {
    options.MaxConcurrentRequests = 2;
    options.RequestQueueLimit = 25;
    });

var app = builder.Build();
app.UseConcurrencyLimiter();
// Map endpoints.
app.Run();
```

## New behavior

If you use the [Affected APIs](#affected-apis) in your code, you'll get warning [`CS0618`](https://learn.microsoft.com/dotnet/csharp/language-reference/compiler-messages/cs0618) at compile time.

## Type of breaking change

This change affects [source compatibility](https://learn.microsoft.com/dotnet/core/compatibility/categories#source-compatibility).

## Reason for change

[Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware) is infrequently used and undocumented. The newer rate-limiting API has more extensive functionality.

## Recommended action

If you're using the older [Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware), we recommend moving to the newer rate-limiting middleware. Here's an example usage of the newer API, [Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter%252A):

```csharp
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRateLimiter(new RateLimiterOptions()
    .AddConcurrencyLimiter("only-one-at-a-time-stacked", (options) =>
    {
        options.PermitLimit = 2;
        options.QueueLimit = 25;
        options.QueueProcessingOrder = QueueProcessingOrder.NewestFirst;
    }));

app.MapGet("/", async () =>
{
    await Task.Delay(10000);
    return "Hello World";
}).RequireRateLimiting("only-one-at-a-time-stacked");

app.Run();
```

## Affected APIs

- [Microsoft.AspNetCore.Builder.ConcurrencyLimiterExtensions.UseConcurrencyLimiter(Microsoft.AspNetCore.Builder.IApplicationBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ConcurrencyLimiterExtensions.UseConcurrencyLimiter(Microsoft.AspNetCore.Builder.IApplicationBuilder))
- [Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ConcurrencyLimiter.ConcurrencyLimiterMiddleware)
- [System.Threading.RateLimiting.ConcurrencyLimiterOptions](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.ConcurrencyLimiterOptions)

## See also

- [Rate limiting middleware in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/rate-limit)
