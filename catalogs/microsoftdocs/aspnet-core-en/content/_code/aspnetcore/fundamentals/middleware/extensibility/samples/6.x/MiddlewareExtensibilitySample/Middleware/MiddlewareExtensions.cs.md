# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/MiddlewareExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using MiddlewareExtensibilitySample.Middleware;

namespace Microsoft.AspNetCore.Builder;

// <snippet_Class>
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseConventionalMiddleware(
        this IApplicationBuilder app)
        => app.UseMiddleware<ConventionalMiddleware>();

    public static IApplicationBuilder UseFactoryActivatedMiddleware(
        this IApplicationBuilder app)
        => app.UseMiddleware<FactoryActivatedMiddleware>();
}
// </snippet_Class>

```
