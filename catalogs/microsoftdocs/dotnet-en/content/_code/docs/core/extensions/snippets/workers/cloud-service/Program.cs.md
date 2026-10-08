# Source code: docs/core/extensions/snippets/workers/cloud-service/Program.cs

Complete source file; linked examples may select a region or line range.

```
using App.CloudService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

IHost host = builder.Build();
host.Run();

```
