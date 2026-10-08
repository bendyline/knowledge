# Source code: docs/standard/garbage-collection/snippets/dispose-async/NoopAsyncDisposable.cs

Complete source file; linked examples may select a region or line range.

```
public sealed class NoopAsyncDisposable : IAsyncDisposable
{
    ValueTask IAsyncDisposable.DisposeAsync() => ValueTask.CompletedTask;
}
```
