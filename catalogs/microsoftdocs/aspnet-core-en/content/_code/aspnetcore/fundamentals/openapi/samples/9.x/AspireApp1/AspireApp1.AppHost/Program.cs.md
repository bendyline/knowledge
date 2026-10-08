# Source code: aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.AppHost/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.AspireApp1_ApiService>("apiservice");

builder.AddProject<Projects.AspireApp1_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService)
    .WaitFor(apiService);

builder.Build().Run();

```
