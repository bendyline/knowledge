# Source code: aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet_CreateBuilder>
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
// </snippet_CreateBuilder>

```
