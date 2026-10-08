---
title: Unit testing
description: Learn how to unit test with .NET Orleans.
ms.date: 01/22/2026
ms.topic: how-to
zone_pivot_groups: orleans-version
---

# Unit testing with Orleans

This tutorial shows how to unit test your grains to ensure they behave correctly. There are two main ways to unit test your grains, and the method you choose depends on the type of functionality you're testing. Use the [Microsoft.Orleans.TestingHost](https://www.nuget.org/packages/Microsoft.Orleans.TestingHost) NuGet package to create test silos for your grains, or use a mocking framework like [Moq](https://github.com/moq/moq) to mock parts of the Orleans runtime your grain interacts with.

**Applies to: orleans-10-0,orleans-9-0**


## Use the `InProcessTestCluster` (recommended)

The `InProcessTestCluster` is the recommended testing infrastructure for Orleans. It provides a streamlined, delegate-based API for configuring test clusters, making it easier to share services between your tests and the cluster.

### Key advantages

The primary advantage of `InProcessTestCluster` over `TestCluster` is **ergonomics**:

- **Delegate-based configuration**: Configure silos and clients using inline delegates instead of separate configuration classes
- **Shared service instances**: Easily share mock services, test doubles, and other instances between your test code and the silo hosts
- **Less boilerplate**: No need to create separate `ISiloConfigurator` or `IClientConfigurator` classes
- **Simpler dependency injection**: Register services directly in the builder fluent API

Both `InProcessTestCluster` and `TestCluster` use the same underlying in-process silo host by default, so memory usage and startup time are equivalent. The `TestCluster` API is designed to also support multi-process scenarios (for production-like simulation), which requires the class-based configuration approach, but by default it runs in-process just like `InProcessTestCluster`.

### Basic usage

```csharp
using Orleans.TestingHost;
using Xunit;

public class HelloGrainTests : IAsyncLifetime
{
    private InProcessTestCluster _cluster = null!;

    public async Task InitializeAsync()
    {
        var builder = new InProcessTestClusterBuilder();
        _cluster = builder.Build();
        await _cluster.DeployAsync();
    }

    public async Task DisposeAsync()
    {
        await _cluster.DisposeAsync();
    }

    [Fact]
    public async Task SaysHello()
    {
        var grain = _cluster.Client.GetGrain<IHelloGrain>(0);
        var result = await grain.SayHello("World");
        Assert.Equal("Hello, World!", result);
    }
}
```

### Configure the test cluster

Use `InProcessTestClusterBuilder` to configure silos, clients, and services:

```csharp
var builder = new InProcessTestClusterBuilder(initialSilosCount: 2);

// Configure silos
builder.ConfigureSilo((options, siloBuilder) =>
{
    siloBuilder.AddMemoryGrainStorage("Default");
    siloBuilder.AddMemoryGrainStorage("PubSubStore");
});

// Configure clients
builder.ConfigureClient(clientBuilder =>
{
    // Client-specific configuration
});

// Configure both silos and clients (shared services)
builder.ConfigureHost(hostBuilder =>
{
    hostBuilder.Services.AddSingleton<IMyService, MyService>();
});

var cluster = builder.Build();
await cluster.DeployAsync();
```

### InProcessTestClusterOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId) | `string` | Auto-generated | Cluster identifier. |
| [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId) | `string` | Auto-generated | Service identifier. |
| `InitialSilosCount` | `int` | 1 | Number of silos to start initially. |
| `InitializeClientOnDeploy` | `bool` | `true` | Whether to auto-initialize the client on deploy. |
| `ConfigureFileLogging` | `bool` | `true` | Enable file logging for debugging. |
| `UseRealEnvironmentStatistics` | `bool` | `false` | Use real memory/CPU statistics instead of simulated values. |
| `GatewayPerSilo` | `bool` | `true` | Whether each silo hosts a gateway for client connections. |

### Share a test cluster between tests

To improve test performance, share a single cluster across multiple test cases using xUnit fixtures:

```csharp
public class ClusterFixture : IAsyncLifetime
{
    public InProcessTestCluster Cluster { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        var builder = new InProcessTestClusterBuilder();
        builder.ConfigureSilo((options, siloBuilder) =>
        {
            siloBuilder.AddMemoryGrainStorageAsDefault();
        });
        
        Cluster = builder.Build();
        await Cluster.DeployAsync();
    }

    public async Task DisposeAsync()
    {
        await Cluster.DisposeAsync();
    }
}

[CollectionDefinition(nameof(ClusterCollection))]
public class ClusterCollection : ICollectionFixture<ClusterFixture>
{
}

[Collection(nameof(ClusterCollection))]
public class HelloGrainTests
{
    private readonly ClusterFixture _fixture;

    public HelloGrainTests(ClusterFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task SaysHello()
    {
        var grain = _fixture.Cluster.Client.GetGrain<IHelloGrain>(0);
        var result = await grain.SayHello("World");
        Assert.Equal("Hello, World!", result);
    }
}
```

### Add and remove silos during tests

The `InProcessTestCluster` supports dynamic silo management for testing cluster behavior:

```csharp
// Start with 2 silos
var builder = new InProcessTestClusterBuilder(initialSilosCount: 2);
var cluster = builder.Build();
await cluster.DeployAsync();

// Add a third silo
var newSilo = await cluster.StartSiloAsync();

// Stop a silo
await cluster.StopSiloAsync(newSilo);

// Restart all silos
await cluster.RestartAsync();
```



## Use the `TestCluster`

**Applies to: orleans-10-0,orleans-9-0**


The `TestCluster` uses a class-based configuration approach that requires implementing `ISiloConfigurator` and `IClientConfigurator` interfaces. This design supports multi-process testing scenarios where silos run in separate processes, which is useful for production-like simulation testing. However, by default `TestCluster` also runs in-process with equivalent performance to `InProcessTestCluster`.

Choose `TestCluster` over `InProcessTestCluster` when:

- You need multi-process testing for production simulation
- You have existing tests using the `TestCluster` API
- You need compatibility with Orleans 7.x or 8.x

For new tests, `InProcessTestCluster` is recommended due to its simpler delegate-based configuration.



**Applies to: orleans-8-0,orleans-7-0,orleans-3-x**



The `Microsoft.Orleans.TestingHost` NuGet package contains [Orleans.TestingHost.TestCluster](https://learn.microsoft.com/search/?terms=Orleans.TestingHost.TestCluster), which you can use to create an in-memory cluster (comprised of two silos by default) for testing grains.

[source="snippets/testing/Orleans-testing/Sample.OrleansTesting/HelloGrainTests.cs"::: (complete source file; reference: snippets/testing/Orleans-testing/Sample.OrleansTesting/HelloGrainTests.cs)](../../../_code/docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/HelloGrainTests.cs.md)

Due to the overhead of starting an in-memory cluster, you might want to create a `TestCluster` and reuse it among multiple test cases. For example, achieve this using xUnit's class or collection fixtures.

To share a `TestCluster` between multiple test cases, first create a fixture type:

[source="snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterFixture.cs"::: (complete source file; reference: snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterFixture.cs)](../../../_code/docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterFixture.cs.md)

Next, create a collection fixture:

[source="snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterCollection.cs"::: (complete source file; reference: snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterCollection.cs)](../../../_code/docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterCollection.cs.md)

You can now reuse a `TestCluster` in your test cases:

[source="snippets/testing/Orleans-testing/Sample.OrleansTesting/HelloGrainTestsWithFixture.cs"::: (complete source file; reference: snippets/testing/Orleans-testing/Sample.OrleansTesting/HelloGrainTestsWithFixture.cs)](../../../_code/docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/HelloGrainTestsWithFixture.cs.md)

When all tests complete and the in-memory cluster silos stop, xUnit calls the [System.IDisposable.Dispose](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose) method of the `ClusterFixture` type. `TestCluster` also has a constructor accepting [Orleans.TestingHost.TestClusterOptions](https://learn.microsoft.com/search/?terms=Orleans.TestingHost.TestClusterOptions) that you can use to configure the silos in the cluster.

If you use Dependency Injection in your Silo to make services available to Grains, you can use this pattern as well:

[source="snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterFixtureWithConfig.cs" (complete source file; reference: snippets/testing/Orleans-testing/Sample.OrleansTesting/ClusterFixtureWithConfig.cs)](../../../_code/docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterFixtureWithConfig.cs.md)

## Use mocks

Orleans also allows mocking many parts of the system. For many scenarios, this is the easiest way to unit test grains. This approach has limitations (e.g., around scheduling reentrancy and serialization) and might require grains to include code used only by your unit tests. The [Orleans TestKit](https://github.com/OrleansContrib/OrleansTestKit) provides an alternative approach that sidesteps many of these limitations.

For example, imagine the grain you're testing interacts with other grains. To mock those other grains, you also need to mock the [Orleans.Grain.GrainFactory](https://learn.microsoft.com/search/?terms=Orleans.Grain.GrainFactory) member of the grain under test. By default, `GrainFactory` is a normal `protected` property, but most mocking frameworks require properties to be `public` and `virtual` to enable mocking. So, the first step is to make `GrainFactory` both `public` and `virtual`:

```csharp
public new virtual IGrainFactory GrainFactory
{
    get => base.GrainFactory;
}
```

Now you can create your grain outside the Orleans runtime and use mocking to control the behavior of `GrainFactory`:

```csharp
using Xunit;
using Moq;

namespace Tests;

public class WorkerGrainTests
{
    [Fact]
    public async Task RecordsMessageInJournal()
    {
        var data = "Hello, World";
        var journal = new Mock<IJournalGrain>();
        var worker = new Mock<WorkerGrain>();
        worker
            .Setup(x => x.GrainFactory.GetGrain<IJournalGrain>(It.IsAny<Guid>()))
            .Returns(journal.Object);

        await worker.DoWork(data)

        journal.Verify(x => x.Record(data), Times.Once());
    }
}
```

Here, create the grain under test, `WorkerGrain`, using Moq. This allows overriding the `GrainFactory`'s behavior so it returns a mocked `IJournalGrain`. You can then verify that `WorkerGrain` interacts with `IJournalGrain` as expected.
