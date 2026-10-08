# Source code: aspnetcore/tutorials/signalr/samples/6.x/SignalRChat/Hubs/ChatHub.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
```
