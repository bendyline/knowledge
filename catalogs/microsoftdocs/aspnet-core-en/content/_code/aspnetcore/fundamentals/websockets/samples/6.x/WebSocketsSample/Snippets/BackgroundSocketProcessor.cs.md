# Source code: aspnetcore/fundamentals/websockets/samples/6.x/WebSocketsSample/Snippets/BackgroundSocketProcessor.cs

Complete source file; linked examples may select a region or line range.

```
using System.Net.WebSockets;

namespace WebSocketsSample.Snippets;

internal class BackgroundSocketProcessor
{
    internal static void AddSocket(WebSocket webSocket, TaskCompletionSource<object> socketFinishedTcs) { }
}

```
