# Source code: docs/core/extensions/snippets/logging/log-buffering/global/basic/Log.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace GlobalLogBufferingBasic;

internal static partial class Log
{
    [LoggerMessage(Level = LogLevel.Error, Message = "ERROR log message in my application. {message}")]
    public static partial void ErrorMessage(this ILogger logger, string message);

    [LoggerMessage(Level = LogLevel.Information, Message = "INFORMATION log message in my application.")]
    public static partial void InformationMessage(this ILogger logger);
}

```
