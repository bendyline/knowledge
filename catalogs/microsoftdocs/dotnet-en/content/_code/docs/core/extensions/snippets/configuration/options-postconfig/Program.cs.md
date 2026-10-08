# Source code: docs/core/extensions/snippets/configuration/options-postconfig/Program.cs

Complete source file; linked examples may select a region or line range.

```
using ExampleLibrary.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMyLibraryService(options =>
{
    // Specify option values
    // options.SomePropertyValue = ...
});

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();

```
