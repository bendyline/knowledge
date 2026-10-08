# Source code: docs/core/extensions/snippets/configuration/worker-service/Program.cs

Complete source file; linked examples may select a region or line range.

```
using WorkerService.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();

using IHost host = builder.Build();

await host.RunAsync();

```
