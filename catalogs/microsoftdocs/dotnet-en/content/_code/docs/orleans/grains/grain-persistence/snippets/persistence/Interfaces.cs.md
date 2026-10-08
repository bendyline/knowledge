# Source code: docs/orleans/grains/grain-persistence/snippets/persistence/Interfaces.cs

Complete source file; linked examples may select a region or line range.

```
namespace Orleans.Docs.Snippets.Persistence;

// <persistent_state_interface>
public interface IPersistentState<TState> : IStorage<TState>
{
}

public interface IStorage<TState> : IStorage
{
    TState State { get; set; }
}

public interface IStorage
{
    string Etag { get; }

    bool RecordExists { get; }

    Task ClearStateAsync();

    Task WriteStateAsync();

    Task ReadStateAsync();
}
// </persistent_state_interface>

```
