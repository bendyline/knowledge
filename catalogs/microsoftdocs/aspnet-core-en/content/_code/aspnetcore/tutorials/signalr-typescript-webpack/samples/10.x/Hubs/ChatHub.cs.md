# Source code: aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Hubs/ChatHub.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", username, message);
}
```
