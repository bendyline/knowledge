# Source code: docs/core/extensions/snippets/caching/memory-worker/CacheSignal.cs

Complete source file; linked examples may select a region or line range.

```
namespace CachingExamples.Memory;

public sealed class CacheSignal<T>
{
    private readonly SemaphoreSlim _semaphore = new(1, 1);

    /// <summary>
    /// Exposes a <see cref="Task"/> that represents the asynchronous wait operation.
    /// When signaled (consumer calls <see cref="Release"/>), the 
    /// <see cref="Task.Status"/> is set as <see cref="TaskStatus.RanToCompletion"/>.
    /// </summary>
    public Task WaitAsync() => _semaphore.WaitAsync();

    /// <summary>
    /// Exposes the ability to signal the release of the <see cref="WaitAsync"/>'s operation.
    /// Callers who were waiting, will be able to continue.
    /// </summary>
    public void Release() => _semaphore.Release();
}

```
