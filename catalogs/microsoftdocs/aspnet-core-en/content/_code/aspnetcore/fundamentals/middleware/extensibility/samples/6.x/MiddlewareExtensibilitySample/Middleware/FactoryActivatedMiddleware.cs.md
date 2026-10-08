# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Middleware/FactoryActivatedMiddleware.cs

Complete source file; linked examples may select a region or line range.

```
using MiddlewareExtensibilitySample.Data;

namespace MiddlewareExtensibilitySample.Middleware;

// <snippet_Class>
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly SampleDbContext _dbContext;

    public FactoryActivatedMiddleware(SampleDbContext dbContext)
        => _dbContext = dbContext;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var keyValue = context.Request.Query["key"];

        if (!string.IsNullOrWhiteSpace(keyValue))
        {
            _dbContext.Requests.Add(new Request("Factory", keyValue));

            await _dbContext.SaveChangesAsync();
        }

        await next(context);
    }
}
// </snippet_Class>

```
