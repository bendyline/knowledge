---
title: Rate limiting middleware samples
author: wadepickett
ms.author: wpickett
monikerRange: '>= aspnetcore-7.0'
description: Samples for using ASP.NET rate limitng middleware
ms.date: 03/05/2025
uid: performance/rate-limit-sample
---

# Rate limiter samples

The following samples aren't production quality, they're examples on how to use the limiters.

## Limiter with `OnRejected`, `RetryAfter`, and `GlobalLimiter`

The following sample:

* Creates a [Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected%252A) callback that's called when a request exceeds the specified limit. `retryAfter` can be used with the [System.Threading.RateLimiting.TokenBucketRateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.TokenBucketRateLimiter), [Fixed Window Limiter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptionsExtensions.AddFixedWindowLimiter%252A), and [Sliding Window Limiter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptionsExtensions.AddSlidingWindowLimiter%252A) because these algorithms are able to estimate when more permits are added. The [System.Threading.RateLimiting.ConcurrencyLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.ConcurrencyLimiter) has no way of calculating when permits are available.
* Adds the following limiters:

  * A `SampleRateLimiterPolicy` that implements the [Microsoft.AspNetCore.RateLimiting.IRateLimiterPolicy%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.IRateLimiterPolicy%25601) interface. The `SampleRateLimiterPolicy` class is shown later in this article.
  * A `SlidingWindowLimiter`:
    * With a partition for each authenticated user.
    * One shared partition for all anonymous users.
  * A [Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.GlobalLimiter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.GlobalLimiter) that's applied to all requests. The global limiter is executed first, followed by the endpoint-specific limiter, if one exists. The `GlobalLimiter` creates a partition for each [System.Net.IPAddress](https://learn.microsoft.com/search/?terms=System.Net.IPAddress).

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/rate-limit-samples.md)

> **Warning:**
> Creating partitions on client IP addresses makes the app vulnerable to Denial of Service Attacks which employ IP Source Address Spoofing. For more information, see [BCP 38 RFC 2827 Network Ingress Filtering: Defeating Denial of Service Attacks which employ IP Source Address Spoofing](https://www.rfc-editor.org/info/bcp38).

For the complete `Program.cs` file, see [the samples repository](https://github.com/dotnet/AspNetCore.Docs.Samples/blob/main/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


The `SampleRateLimiterPolicy` class

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/SampleRateLimiterPolicy.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/rate-limit-samples.md)

In the preceding code, [Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected) uses [Microsoft.AspNetCore.RateLimiting.OnRejectedContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.OnRejectedContext) to set the response status to [429 Too Many Requests](https://developer.mozilla.org/docs/Web/HTTP/Status/429). The default rejected status is [503 Service Unavailable](https://developer.mozilla.org/docs/Web/HTTP/Status/503).

## Limiter with authorization

The following sample uses JSON Web Tokens (JWT) and creates a partition with the JWT [access token](https://github.com/dotnet/aspnetcore/blob/fd1891536f27e959d14a140ff9307b6a21191de9/src/Security/Authentication/JwtBearer/src/JwtBearerHandler.cs#L152-L158). In a production app, the JWT would typically be provided by a server acting as a Security token service (STS). For local development, the dotnet [user-jwts](../security/authentication/jwt-authn.md) command line tool can be used to create and manage app-specific local JWTs.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/rate-limit-samples.md)

## Limiter with `ConcurrencyLimiter`, `TokenBucketRateLimiter`, and authorization

The following sample:

* Adds a `ConcurrencyLimiter` with a policy name of `"get"` that is used on the Razor Pages.
* Adds a `TokenBucketRateLimiter` with a partition for each authorized user and a partition for all anonymous users.
* Sets [RateLimiterOptions.RejectionStatusCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.RejectionStatusCode) to [429 Too Many Requests](https://developer.mozilla.org/docs/Web/HTTP/Status/429).

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/rate-limit-samples.md)

See [the samples repository for the complete `Program.cs`](https://github.com/dotnet/AspNetCore.Docs.Samples/blob/main/fundamentals/middleware/rate-limit/WebRateLimitAuth/Program.cs#L145,L281) file.
