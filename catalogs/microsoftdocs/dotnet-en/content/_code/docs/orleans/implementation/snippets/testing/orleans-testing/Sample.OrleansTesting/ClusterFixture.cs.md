# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterFixture.cs

Complete source file; linked examples may select a region or line range.

```
using Orleans.TestingHost;

public sealed class ClusterFixture : IDisposable
{
    public TestCluster Cluster { get; } = new TestClusterBuilder().Build();

    public ClusterFixture() => Cluster.Deploy();

    void IDisposable.Dispose() => Cluster.StopAllSilos();
}

```
