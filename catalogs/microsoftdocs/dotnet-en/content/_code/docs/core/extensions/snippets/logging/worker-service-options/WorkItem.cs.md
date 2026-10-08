# Source code: docs/core/extensions/snippets/logging/worker-service-options/WorkItem.cs

Complete source file; linked examples may select a region or line range.

```
namespace WorkerServiceOptions.Example;

public record WorkItem(
    string Name, Priority Priority, bool IsCompleted = false)
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public WorkItem MarkAsComplete() =>
        this with { IsCompleted = true };

    public override string ToString() =>
        $"Priority-{Priority} ({Id}): '{Name}'";
}

```
