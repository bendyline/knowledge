# Source code: docs/orleans/streaming/snippets/broadcastchannel/BroadcastChannel.GrainInterfaces/Stock.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace BroadcastChannel.GrainInterfaces;

[GenerateSerializer]
public sealed class Stock
{
    [Id(0), JsonPropertyName("Global Quote")]
    public GlobalQuote GlobalQuote { get; set; } = null!;
}
```
