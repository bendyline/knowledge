# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/HelloGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace Tests;

public sealed class HelloGrain : Grain, IHelloGrain
{
    public ValueTask<string> SayHello(string greeting) =>
        ValueTask.FromResult($"Hello, {greeting}!");
}

```
