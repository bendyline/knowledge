# Source code: docs/core/extensions/snippets/workers/signal-completion-service/App.SignalCompletionService/Worker.cs

Complete source file; linked examples may select a region or line range.

```
namespace App.SignalCompletionService;

public sealed class Worker(
    IHostApplicationLifetime hostApplicationLifetime,
    ILogger<Worker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // TODO: implement single execution logic here.
        logger.LogInformation(
            "Worker running at: {Time}", DateTimeOffset.Now);

        await Task.Delay(1_000, stoppingToken);

        // When completed, the entire app host will stop.
        hostApplicationLifetime.StopApplication();
    }
}

```
