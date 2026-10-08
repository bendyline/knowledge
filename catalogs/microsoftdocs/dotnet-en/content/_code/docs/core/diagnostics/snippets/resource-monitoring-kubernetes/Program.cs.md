# Source code: docs/core/diagnostics/snippets/resource-monitoring-kubernetes/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var app = Host.CreateDefaultBuilder()
    .ConfigureServices(services =>
    {
        services.AddKubernetesResourceMonitoring("MY_APP_");
    })
    .Build();

await app.RunAsync();

```
