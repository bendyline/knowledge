# Source code: aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Services/SampleHostedService.cs

Complete source file; linked examples may select a region or line range.

```
namespace GenericHostSample.Services;

public class SampleHostedService : IHostedService
{
    public Task StartAsync(CancellationToken cancellationToken)
        => Task.CompletedTask;

    public Task StopAsync(CancellationToken cancellationToken)
        => Task.CompletedTask;
}

```
