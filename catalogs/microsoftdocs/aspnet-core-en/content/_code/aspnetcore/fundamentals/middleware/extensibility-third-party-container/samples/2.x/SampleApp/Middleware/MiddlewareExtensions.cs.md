# Source code: aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Middleware/MiddlewareExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Builder;

namespace MiddlewareExtensibilitySample.Middleware
{
    #region snippet1
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseSimpleInjectorActivatedMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SimpleInjectorActivatedMiddleware>();
        }
    }
    #endregion
}

```
