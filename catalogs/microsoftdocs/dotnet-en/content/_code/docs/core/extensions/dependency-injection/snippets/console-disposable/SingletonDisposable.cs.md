# Source code: docs/core/extensions/dependency-injection/snippets/console-disposable/SingletonDisposable.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDisposable.Example;

public sealed class SingletonDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(SingletonDisposable)}.Dispose()");
}

```
