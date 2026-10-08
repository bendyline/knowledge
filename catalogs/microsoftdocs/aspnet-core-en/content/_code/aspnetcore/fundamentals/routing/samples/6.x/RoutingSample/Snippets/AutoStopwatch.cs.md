# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/AutoStopwatch.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;

namespace RoutingSample.Snippets;

// <snippet_Class>
public sealed class AutoStopwatch : IDisposable
{
    private readonly ILogger _logger;
    private readonly string _message;
    private readonly Stopwatch _stopwatch;
    private bool _disposed;

    public AutoStopwatch(ILogger logger, string message) =>
        (_logger, _message, _stopwatch) = (logger, message, Stopwatch.StartNew());

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        _logger.LogInformation("{Message}: {ElapsedMilliseconds}ms",
            _message, _stopwatch.ElapsedMilliseconds);

        _disposed = true;
    }
}
// </snippet_Class>

```
