# Source code: docs/core/extensions/snippets/workers/scoped-service/Program.cs

Complete source file; linked examples may select a region or line range.

```
using App.ScopedService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<ScopedBackgroundService>();
builder.Services.AddScoped<IScopedProcessingService, DefaultScopedProcessingService>();

IHost host = builder.Build();
host.Run();

```
