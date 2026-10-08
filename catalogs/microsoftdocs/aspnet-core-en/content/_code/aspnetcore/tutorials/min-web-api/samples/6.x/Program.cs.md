# Source code: aspnetcore/tutorials/min-web-api/samples/6.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
