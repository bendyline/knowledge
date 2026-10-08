# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/HelloGrainTests.cs

Complete source file; linked examples may select a region or line range.

```
using Orleans.TestingHost;

namespace Tests;

public class HelloGrainTests
{
    [Fact]
    public async Task SaysHelloCorrectly()
    {
        var builder = new TestClusterBuilder();
        var cluster = builder.Build();
        cluster.Deploy();

        var hello = cluster.GrainFactory.GetGrain<IHelloGrain>(Guid.NewGuid());
        var greeting = await hello.SayHello("World");

        cluster.StopAllSilos();

        Assert.Equal("Hello, World!", greeting);
    }
}

```
