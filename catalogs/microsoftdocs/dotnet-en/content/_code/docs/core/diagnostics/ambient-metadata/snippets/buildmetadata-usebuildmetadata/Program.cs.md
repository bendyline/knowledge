# Source code: docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-usebuildmetadata/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.AmbientMetadata;

var builder = Host.CreateApplicationBuilder(args);

builder.UseBuildMetadata();

var host = builder.Build();
await host.RunAsync();

```
