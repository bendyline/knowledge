# Source code: aspnetcore/fundamentals/middleware/write/snapshot/Startup.cs

Complete source file; linked examples may select a region or line range.

```
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.UseRequestCulture();

        app.Run(async (context) =>
        {
            await context.Response.WriteAsync(
                $"Hello {CultureInfo.CurrentCulture.DisplayName}");
        });
    }
}

```
