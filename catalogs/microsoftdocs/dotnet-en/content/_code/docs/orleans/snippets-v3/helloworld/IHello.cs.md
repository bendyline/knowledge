# Source code: docs/orleans/snippets-v3/helloworld/IHello.cs

Complete source file; linked examples may select a region or line range.

```
namespace HelloWorld.Interfaces;

// <ihello_interface>
public interface IHello : Orleans.IGrainWithIntegerKey
{
    Task<string> SayHello(string greeting);
}
// </ihello_interface>

```
