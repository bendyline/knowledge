# Source code: docs/core/extensions/snippets/configuration/console-env/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddEnvironmentVariables(prefix: "CustomPrefix_");

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();

```
