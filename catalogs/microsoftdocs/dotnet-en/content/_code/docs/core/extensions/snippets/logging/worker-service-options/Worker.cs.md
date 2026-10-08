# Source code: docs/core/extensions/snippets/logging/worker-service-options/Worker.cs

Complete source file; linked examples may select a region or line range.

```
using WorkerServiceOptions.Example.Extensions;

namespace WorkerServiceOptions.Example;

public sealed class Worker(
    ILogger<Worker> logger,
    PriorityQueue priorityQueue) : BackgroundService
{
    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        using (IDisposable? scope = logger.ProcessingWorkScope(DateTime.Now))
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    WorkItem? nextItem = priorityQueue.ProcessNextHighestPriority();

                    if (nextItem is not null)
                    {
                        logger.PriorityItemProcessed(nextItem);
                    }
                }
                catch (Exception ex)
                {
                    logger.FailedToProcessWorkItem(ex);
                }

                await Task.Delay(1_000, stoppingToken);
            }
        }
    }
}

```
