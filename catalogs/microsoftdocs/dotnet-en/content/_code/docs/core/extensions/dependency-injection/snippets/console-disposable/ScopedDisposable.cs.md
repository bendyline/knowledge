# Source code: docs/core/extensions/dependency-injection/snippets/console-disposable/ScopedDisposable.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDisposable.Example;

public sealed class ScopedDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(ScopedDisposable)}.Dispose()");
}

```
