# Source code: docs/csharp/language-reference/statements/snippets/using/AsyncDisposableExample.cs

Complete source file; linked examples may select a region or line range.

```
public sealed class AsyncDisposableExample : IAsyncDisposable
{
    ValueTask IAsyncDisposable.DisposeAsync() => ValueTask.CompletedTask;
}
```
