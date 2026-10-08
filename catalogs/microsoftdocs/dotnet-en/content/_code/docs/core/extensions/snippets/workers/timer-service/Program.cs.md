# Source code: docs/core/extensions/snippets/workers/timer-service/Program.cs

Complete source file; linked examples may select a region or line range.

```
using App.TimerHostedService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<TimerService>();

IHost host = builder.Build();
host.Run();

```
