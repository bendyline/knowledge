# Source code: aspnetcore/host-and-deploy/health-checks/samples/6.x/HealthChecksSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

```
