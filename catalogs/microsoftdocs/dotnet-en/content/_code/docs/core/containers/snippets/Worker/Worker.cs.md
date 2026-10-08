# Source code: docs/core/containers/snippets/Worker/Worker.cs

Complete source file; linked examples may select a region or line range.

```
namespace DotNet.ContainerImage;

public sealed class Worker(ILogger<Worker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

            await Task.Delay(
                TimeSpan.FromMilliseconds(1_000), stoppingToken);
        }
    }
}

```
