# Source code: docs/core/extensions/dependency-injection/snippets/overview/LoggingMessageWriter.cs

Complete source file; linked examples may select a region or line range.

```
public class LoggingMessageWriter(
    ILogger<LoggingMessageWriter> logger) : IMessageWriter
{
    public void Write(string message) =>
        logger.LogInformation("Info: {Msg}", message);
}

```
