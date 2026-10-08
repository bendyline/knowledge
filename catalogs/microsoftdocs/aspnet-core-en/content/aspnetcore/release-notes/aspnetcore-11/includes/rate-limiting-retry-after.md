### Rate-limiting middleware returns accurate `Retry-After` headers

The [System.Threading.RateLimiting.FixedWindowRateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.FixedWindowRateLimiter) now reports a [System.Threading.RateLimiting.MetadataName.RetryAfter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.MetadataName.RetryAfter) metadata value that accurately reflects the next window boundary. Apps that propagate this metadata to the `Retry-After` response header in their [Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected) callback now produce correct retry intervals automatically, with no code changes required.

Additional fixes in `System.Threading.RateLimiting` resolve an issue where [System.Threading.RateLimiting.TokenBucketRateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.TokenBucketRateLimiter) mishandled partial token refills during zero-permit acquisition, and improve the chained rate limiter returned by [System.Threading.RateLimiting.RateLimiter.CreateChained*](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.RateLimiter.CreateChained*) to correctly forward idle-duration and replenishment behavior from its inner limiters.

For an overview of the rate limiting middleware, see [Rate limiting middleware in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/rate-limit).

Thank you [@asbjornvad](https://github.com/asbjornvad) and [@apoorvdarshan](https://github.com/apoorvdarshan) for these contributions!
