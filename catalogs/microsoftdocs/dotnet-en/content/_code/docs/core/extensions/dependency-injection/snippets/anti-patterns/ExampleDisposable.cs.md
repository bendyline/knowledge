# Source code: docs/core/extensions/dependency-injection/snippets/anti-patterns/ExampleDisposable.cs

Complete source file; linked examples may select a region or line range.

```
namespace DependencyInjection.AntiPatterns;

public class ExampleDisposable : IDisposable
{
    public void Dispose() =>
        Console.WriteLine($"Disposed: {GetHashCode(),12}");
}

```
