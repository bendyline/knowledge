# Source code: docs/core/extensions/logging/snippets/source-generation/csharp/BasicUsage/InstanceLog.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace BasicUsage.InstanceField;

// <InstanceLogWithField>
public partial class InstanceLoggingExample
{
    private readonly ILogger _logger;

    public InstanceLoggingExample(ILogger logger)
    {
        _logger = logger;
    }

    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public partial void CouldNotOpenSocket(string hostName);
}
// </InstanceLogWithField>

```
