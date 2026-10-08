# Source code: docs/orleans/host/snippets/IGameGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace Client;

public interface IGameGrain : IGrainWithGuidKey
{
    Task UpdateGameStatus(GameState state);

    Task ObserveGameUpdates(IGameObserver observer);
    
    Task UnobserveGameUpdates(IGameObserver observer);
}

```
