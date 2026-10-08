# Source code: docs/standard/garbage-collection/snippets/dispose-async/SealedExampleAsyncDisposable.cs

Complete source file; linked examples may select a region or line range.

```
public sealed class SealedExampleAsyncDisposable : IAsyncDisposable
{
    private readonly IAsyncDisposable _example;

    public SealedExampleAsyncDisposable() =>
        _example = new NoopAsyncDisposable();

    public ValueTask DisposeAsync() => _example.DisposeAsync();
}

```
