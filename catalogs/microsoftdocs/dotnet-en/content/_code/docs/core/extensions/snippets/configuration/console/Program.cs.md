# Source code: docs/core/extensions/snippets/configuration/console/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Hosting;

using IHost host = Host.CreateApplicationBuilder(args).Build();

// Application code should start here.

await host.RunAsync();

```
