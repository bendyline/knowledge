# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.idisposable/cs/derived1.cs

Complete source file; linked examples may select a region or line range.

```
using System.IO;

public class DisposableDerived : DisposableBase
{
    // To detect redundant calls
    private bool _isDisposed;

    // Instantiate a disposable object owned by this class.
    private Stream? _managedResource = new MemoryStream();

    // Protected implementation of Dispose pattern.
    protected override void Dispose(bool disposing)
    {
        if (!_isDisposed)
        {
            _isDisposed = true;

            if (disposing)
            {
                _managedResource?.Dispose();
                _managedResource = null;
            }
        }

        // Call base class implementation.
        base.Dispose(disposing);
    }
}

```
