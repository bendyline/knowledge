# Source code: docs/core/extensions/snippets/channels/LoggingStopwatch.cs

Complete source file; linked examples may select a region or line range.

```
using System.Runtime.CompilerServices;

internal sealed class LoggingStopwatch
{
    internal static IDisposable WriteDurationToConsole(
        [CallerMemberName] string? operation = null) =>
        new StopwatchDisposable(operation);

    private sealed class StopwatchDisposable(string? operation) : IDisposable
    {
        private readonly Stopwatch _stopwatch = Stopwatch.StartNew();

        void IDisposable.Dispose()
        {
            _stopwatch.Stop();

            Console.WriteLine($"Finished {operation} in: {_stopwatch.Elapsed}");
        }
    }
}

```
