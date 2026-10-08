# Source code: aspnetcore/fundamentals/middleware/write/snapshot/RequestCultureMiddlewareExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Builder;

namespace Culture
{
    public static class RequestCultureMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestCulture(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestCultureMiddleware>();
        }
    }
}

```
