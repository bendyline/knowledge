# Source code: aspnetcore/fundamentals/middleware/write/6sample/WebMiddleware/IMessageWriter.cs

Complete source file; linked examples may select a region or line range.

```
namespace Middleware.Example;

public interface IMessageWriter
{
    void Write(string message);
}

public class LoggingMessageWriter : IMessageWriter
{

    private readonly ILogger<LoggingMessageWriter> _logger;

    public LoggingMessageWriter(ILogger<LoggingMessageWriter> logger) =>
        _logger = logger;

    public void Write(string message) =>
        _logger.LogInformation(message);
}
```
