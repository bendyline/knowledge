# Source code: docs/orleans/tutorials-and-samples/snippets/minimal/GrainInterfaces/IHello.cs

Complete source file; linked examples may select a region or line range.

```
namespace GrainInterfaces;

public interface IHello : IGrainWithIntegerKey
{
    ValueTask<string> SayHello(string greeting);
}

```
