# Source code: aspnetcore/host-and-deploy/health-checks/samples/7.x/HealthChecksSample/HealthChecks/SampleHealthCheckWithDI.cs

Complete source file; linked examples may select a region or line range.

```
using HealthChecksSample.Snippets;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthChecksSample.HealthChecks;

// <snippet_Class>
public class SampleHealthCheckWithDI : IHealthCheck
{
    private readonly SampleHealthCheckWithDiConfig _config;

    // <snippet_ctor>
    public SampleHealthCheckWithDI(SampleHealthCheckWithDiConfig config)
        => _config = config;
    // </snippet_ctor>

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var isHealthy = true;

        // use _config ...

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
