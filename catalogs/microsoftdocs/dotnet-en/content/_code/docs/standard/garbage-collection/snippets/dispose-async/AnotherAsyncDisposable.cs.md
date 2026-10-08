# Source code: docs/standard/garbage-collection/snippets/dispose-async/AnotherAsyncDisposable.cs

Complete source file; linked examples may select a region or line range.

```
public class AnotherAsyncDisposable : IAsyncDisposable
{
    public AnotherAsyncDisposable() => throw new Exception("Oops, sorry...");

    public ValueTask DisposeAsync() => new();
}

```
