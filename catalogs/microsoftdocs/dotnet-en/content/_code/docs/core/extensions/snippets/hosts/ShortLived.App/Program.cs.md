# Source code: docs/core/extensions/snippets/hosts/ShortLived.App/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<JobRunner>();

using var host = builder.Build();

try
{
    var runner = host.Services.GetRequiredService<JobRunner>();

    await runner.RunAsync();

    return 0; // success
}
catch (Exception ex)
{
    var logger = host.Services.GetRequiredService<ILogger<Program>>();
    
    logger.LogError(ex, "Unhandled exception occurred during job execution.");

    return 1; // failure
}

```
