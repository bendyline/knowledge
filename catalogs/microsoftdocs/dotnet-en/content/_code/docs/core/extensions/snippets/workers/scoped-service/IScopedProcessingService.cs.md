# Source code: docs/core/extensions/snippets/workers/scoped-service/IScopedProcessingService.cs

Complete source file; linked examples may select a region or line range.

```
namespace App.ScopedService;

public interface IScopedProcessingService
{
    Task DoWorkAsync(CancellationToken stoppingToken);
}

```
