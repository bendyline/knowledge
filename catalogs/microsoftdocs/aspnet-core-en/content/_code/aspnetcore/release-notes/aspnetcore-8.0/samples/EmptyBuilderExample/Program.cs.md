# Source code: aspnetcore/release-notes/aspnetcore-8.0/samples/EmptyBuilderExample/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateEmptyBuilder(new WebApplicationOptions());
builder.WebHost.UseKestrelCore();

var app = builder.Build();

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Hello, World!");
    await next(context);
});

Console.WriteLine("Running...");
app.Run();

```
