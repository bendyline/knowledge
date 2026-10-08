# Source code: docs/core/extensions/logging/snippets/source-generation/csharp/BasicUsage/PrimaryCtorLog.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace BasicUsage.PrimaryConstructor;

// <InstanceLogWithPrimaryCtor>
public partial class InstanceLoggingExample(ILogger logger)
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Critical,
        Message = "Could not open socket to `{HostName}`")]
    public partial void CouldNotOpenSocket(string hostName);
}
// </InstanceLogWithPrimaryCtor>

```
