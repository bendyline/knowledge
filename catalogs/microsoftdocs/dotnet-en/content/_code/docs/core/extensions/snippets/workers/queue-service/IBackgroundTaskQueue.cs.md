# Source code: docs/core/extensions/snippets/workers/queue-service/IBackgroundTaskQueue.cs

Complete source file; linked examples may select a region or line range.

```
namespace App.QueueService;

public interface IBackgroundTaskQueue
{
    ValueTask QueueBackgroundWorkItemAsync(
        Func<CancellationToken, ValueTask> workItem);

    ValueTask<Func<CancellationToken, ValueTask>> DequeueAsync(
        CancellationToken cancellationToken);
}

```
