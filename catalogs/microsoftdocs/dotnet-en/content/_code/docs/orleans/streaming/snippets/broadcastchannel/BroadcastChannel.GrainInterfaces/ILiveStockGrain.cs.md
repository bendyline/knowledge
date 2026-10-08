# Source code: docs/orleans/streaming/snippets/broadcastchannel/BroadcastChannel.GrainInterfaces/ILiveStockGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace BroadcastChannel.GrainInterfaces;

public interface ILiveStockGrain : IGrainWithGuidKey
{
    ValueTask<Stock> GetStock(StockSymbol symbol);
}
```
