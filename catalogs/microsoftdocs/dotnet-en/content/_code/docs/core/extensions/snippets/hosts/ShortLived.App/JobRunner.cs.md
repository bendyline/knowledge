# Source code: docs/core/extensions/snippets/hosts/ShortLived.App/JobRunner.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

internal sealed class JobRunner(ILogger<JobRunner> logger)
{
    public async Task RunAsync()
    {
        logger.LogInformation("Starting job...");

        // Simulate work
        await Task.Delay(1000);

        // Simulate failure
        // throw new InvalidOperationException("Something went wrong!");

        logger.LogInformation("Job completed successfully.");
    }
}

```
