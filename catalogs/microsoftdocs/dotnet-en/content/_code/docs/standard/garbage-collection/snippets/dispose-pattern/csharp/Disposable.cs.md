# Source code: docs/standard/garbage-collection/snippets/dispose-pattern/csharp/Disposable.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Disposable : IDisposable
{
    private bool _disposed;
    // <SnippetDispose>
    public void Dispose()
    {
        // Dispose of unmanaged resources.
        Dispose(true);
        // Suppress finalization.
        GC.SuppressFinalize(this);
    }
    // </SnippetDispose>

    // <SnippetDisposeBool>
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            // Dispose managed state (managed objects).
            // ...
        }

        // Free unmanaged resources.
        // ...

        _disposed = true;
    }
    // </SnippetDisposeBool>
}

```
