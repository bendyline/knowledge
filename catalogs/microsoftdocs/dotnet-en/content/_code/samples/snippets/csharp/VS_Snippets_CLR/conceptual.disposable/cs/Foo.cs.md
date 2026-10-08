# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/Foo.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public sealed class Foo : IDisposable
{
    private readonly IDisposable _bar;

    public Foo()
    {
        _bar = new Bar();
    }

    public void Dispose() => _bar.Dispose();
}

```
