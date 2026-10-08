# Source code: docs/orleans/host/snippets/GameState.cs

Complete source file; linked examples may select a region or line range.

```
namespace Client;

[Serializable]
public enum GameState
{
    AwaitingPlayers,
    InPlay,
    Finished
};

```
