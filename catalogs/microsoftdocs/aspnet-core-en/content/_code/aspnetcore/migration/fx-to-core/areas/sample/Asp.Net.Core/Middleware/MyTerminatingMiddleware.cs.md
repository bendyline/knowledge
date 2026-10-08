# Source code: aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyTerminatingMiddleware.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace MyApp.Middleware
{
    public class MyTerminatingMiddleware
    {
        private readonly RequestDelegate _next;

        public MyTerminatingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        #region snippet_Terminate
        // ASP.NET Core middleware that may terminate the request

        public async Task Invoke(HttpContext context)
        {
            // Do something with context near the beginning of request processing.

            if (!TerminateRequest())
                await _next.Invoke(context);

            // Clean up.
        }
        #endregion

        private bool TerminateRequest()
        {
            return false;
        }
    }

    public static class MyTerminatingMiddlewareExtensions
    {
        public static IApplicationBuilder UseMyTerminatingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MyTerminatingMiddleware>();
        }
    }
}
```
