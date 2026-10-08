# Source code: docs/core/extensions/dependency-injection/snippets/console-disposable/TransientDisposable.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDisposable.Example;

public sealed class TransientDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(TransientDisposable)}.Dispose()");
}

```
