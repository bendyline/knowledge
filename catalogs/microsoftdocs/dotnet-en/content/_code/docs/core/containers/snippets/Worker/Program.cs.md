# Source code: docs/core/containers/snippets/Worker/Program.cs

Complete source file; linked examples may select a region or line range.

```
using DotNet.ContainerImage;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

using IHost host = builder.Build();

host.Run();

```
