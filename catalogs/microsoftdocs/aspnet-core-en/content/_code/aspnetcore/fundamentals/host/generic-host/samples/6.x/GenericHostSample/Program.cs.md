# Source code: aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using GenericHostSample.Services;

// <snippet_Host>
await Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<SampleHostedService>();
    })
    .Build()
    .RunAsync();
// </snippet_Host>

```
