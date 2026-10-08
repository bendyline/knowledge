# Source code: aspnetcore/host-and-deploy/health-checks/samples/6.x/HealthChecksSample/HealthChecks/SampleHealthCheck.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthChecksSample.HealthChecks;

// <snippet_Class>
public class SampleHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var isHealthy = true;

        // ...

        if (isHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            new HealthCheckResult(
                context.Registration.FailureStatus, "An unhealthy result."));
    }
}
// </snippet_Class>

```
