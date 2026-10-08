# Source code: aspnetcore/host-and-deploy/health-checks/samples/7.x/HealthChecksSample/HealthCheckPublishers/SampleHealthCheckPublisher.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthChecksSample.HealthCheckPublishers;

// <snippet_Class>
public class SampleHealthCheckPublisher : IHealthCheckPublisher
{
    public Task PublishAsync(HealthReport report, CancellationToken cancellationToken)
    {
        if (report.Status == HealthStatus.Healthy)
        {
            // ...
        }
        else
        {
            // ...
        }

        return Task.CompletedTask;
    }
}
// </snippet_Class>

```
