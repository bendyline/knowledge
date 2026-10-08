# Source code: docs/core/extensions/snippets/workers/signal-completion-service/App.SignalCompletionService/Program.cs

Complete source file; linked examples may select a region or line range.

```
using App.SignalCompletionService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

IHost host = builder.Build();
host.Run();

```
