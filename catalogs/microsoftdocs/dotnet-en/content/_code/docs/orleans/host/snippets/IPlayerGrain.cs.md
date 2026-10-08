# Source code: docs/orleans/host/snippets/IPlayerGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace Client;

public interface IPlayerGrain : IGrainWithGuidKey
{
    Task<GameState> JoinGame(Guid gameId);

    Task<IGameGrain?> GetCurrentGame();

    Task JoinGame(IGameGrain game);

    Task LeaveGame(IGameGrain game);
}

```
