# Source code: docs/core/extensions/dependency-injection/snippets/overview/StandaloneWorker.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Standalone;

// <WorkerClass>
public class Worker : BackgroundService
{
    private readonly MessageWriter _messageWriter = new();

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _messageWriter.Write($"Worker running at: {DateTimeOffset.Now}");
            await Task.Delay(1_000, stoppingToken);
        }
    }
}
// </WorkerClass>

```
