# Source code: docs/core/extensions/snippets/logging/worker-service-options/Program.cs

Complete source file; linked examples may select a region or line range.

```
using WorkerServiceOptions.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();
builder.Services.AddTransient<PriorityQueue>();

using IHost host = builder.Build();

host.Run();

```
