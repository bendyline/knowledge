# Source code: docs/core/extensions/snippets/logging/log-sampling/code-config/Log.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace LogSamplingCodeConfig;

internal static partial class Log
{
    [LoggerMessage(EventId = 1001, Level = LogLevel.Information, Message = "Noisy log message in my application.")]
    public static partial void NoisyMessage(this ILogger logger);
}

```
