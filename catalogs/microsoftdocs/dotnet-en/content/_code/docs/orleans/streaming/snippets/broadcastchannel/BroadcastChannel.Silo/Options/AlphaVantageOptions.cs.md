# Source code: docs/orleans/streaming/snippets/broadcastchannel/BroadcastChannel.Silo/Options/AlphaVantageOptions.cs

Complete source file; linked examples may select a region or line range.

```
namespace BroadcastChannel.Silo.Options;

public sealed class AlphaVantageOptions
{
    /// <summary>
    /// Get your free API key here: <a href="https://www.alphavantage.co/support/#api-key"></a>.
    /// Set as an environment variable named "AlphaVantageOptions__ApiKey".
    /// </summary>
    public required string ApiKey { get; set; } = "demo";
}

```
