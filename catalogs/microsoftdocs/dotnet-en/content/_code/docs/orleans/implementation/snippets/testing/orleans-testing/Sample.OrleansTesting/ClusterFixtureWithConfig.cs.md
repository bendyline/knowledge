# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterFixtureWithConfig.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;
using Orleans.TestingHost;

namespace Tests;

public sealed class ClusterFixtureWithConfig : IDisposable
{
    public TestCluster Cluster { get; } = new TestClusterBuilder()
        .AddSiloBuilderConfigurator<TestSiloConfigurations>()
        .Build();

    public ClusterFixtureWithConfig() => Cluster.Deploy();

    void IDisposable.Dispose() => Cluster.StopAllSilos();
}

file sealed class TestSiloConfigurations : ISiloConfigurator
{
    public void Configure(ISiloBuilder siloBuilder)
    {
        // TODO: Call required service registrations here.
        // siloBuilder.Services.AddSingleton<T, Impl>(/* ... */);
    }
}

```
