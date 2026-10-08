# Source code: aspnetcore/mvc/controllers/filters/samples/6.x/FiltersSample/FilterMiddlewarePipeline.cs

Complete source file; linked examples may select a region or line range.

```
namespace FiltersSample;

// <snippet_Class>
public class FilterMiddlewarePipeline
{
    public void Configure(IApplicationBuilder app)
    {
        app.Use(async (context, next) =>
        {
            context.Response.Headers.Add("Pipeline", "Middleware");

            await next();
        });
    }
}
// </snippet_Class>

```
