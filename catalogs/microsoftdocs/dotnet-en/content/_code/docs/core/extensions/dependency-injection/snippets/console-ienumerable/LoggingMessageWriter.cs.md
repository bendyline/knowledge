# Source code: docs/core/extensions/dependency-injection/snippets/console-ienumerable/LoggingMessageWriter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace ConsoleDI.IEnumerableExample;

public sealed class LoggingMessageWriter(
    ILogger<LoggingMessageWriter> logger)
    : IMessageWriter
{
    public void Write(string message) =>
        logger.LogInformation("Info: {Msg}", message);
}

```
