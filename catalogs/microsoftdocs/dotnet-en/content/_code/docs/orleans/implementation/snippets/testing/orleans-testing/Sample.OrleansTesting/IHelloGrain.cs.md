# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/IHelloGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace Tests;

public interface IHelloGrain : IGrainWithGuidKey
{
    ValueTask<string> SayHello(string greeting);
}

```
