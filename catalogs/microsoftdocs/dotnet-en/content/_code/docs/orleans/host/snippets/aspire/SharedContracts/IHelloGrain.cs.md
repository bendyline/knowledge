# Source code: docs/orleans/host/snippets/aspire/SharedContracts/IHelloGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace Orleans.Docs.Snippets.Aspire.SharedContracts;

// Simple grain interface for Aspire integration examples
public interface IHelloGrain : IGrainWithStringKey
{
    Task<string> SayHelloAsync(string name);
}

```
