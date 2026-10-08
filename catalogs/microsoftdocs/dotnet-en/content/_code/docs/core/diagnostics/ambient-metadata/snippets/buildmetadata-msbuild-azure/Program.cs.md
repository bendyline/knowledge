# Source code: docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-msbuild-azure/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.AmbientMetadata;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddBuildMetadata();
builder.Services.AddBuildMetadata(builder.Configuration.GetSection("ambientmetadata:build"));

var host = builder.Build();
await host.RunAsync();

```
