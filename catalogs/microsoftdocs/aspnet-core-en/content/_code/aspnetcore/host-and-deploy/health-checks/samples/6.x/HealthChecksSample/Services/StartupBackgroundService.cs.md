# Source code: aspnetcore/host-and-deploy/health-checks/samples/6.x/HealthChecksSample/Services/StartupBackgroundService.cs

Complete source file; linked examples may select a region or line range.

```
using HealthChecksSample.HealthChecks;

namespace HealthChecksSample.Services;

// <snippet_Class>
public class StartupBackgroundService : BackgroundService
{
    private readonly StartupHealthCheck _healthCheck;

    public StartupBackgroundService(StartupHealthCheck healthCheck)
        => _healthCheck = healthCheck;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Simulate the effect of a long-running task.
        await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);

        _healthCheck.StartupCompleted = true;
    }
}
// </snippet_Class>

```
