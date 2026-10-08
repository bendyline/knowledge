# Source code: docs/core/extensions/snippets/logging/log-sampling/trace-based/Log.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace LogSamplingTraceBased;

internal static partial class Log
{
    [LoggerMessage(EventId = 1001, Level = LogLevel.Information, Message = "Count: {count}. Noisy log message.")]
    public static partial void NoisyMessage(this ILogger logger, int count);
}

```
