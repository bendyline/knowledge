# Source code: aspnetcore/migration/50-to-60/samples/WebEmpty/ProgramEmpty.cs

Complete source file; linked examples may select a region or line range.

```
#define ORG  // ORG COMMENTS
#if ORG
#region snippet1
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
#endregion
#elif COMMENTS
#region snippet2
var builder = WebApplication.CreateBuilder(args);
// CreateBuilder returns a WebApplicationBuilder
var app = builder.Build();
// Build returns a WebApplication

app.MapGet("/", () => "Hello World!");

app.Run();
#endregion
#endif
```
