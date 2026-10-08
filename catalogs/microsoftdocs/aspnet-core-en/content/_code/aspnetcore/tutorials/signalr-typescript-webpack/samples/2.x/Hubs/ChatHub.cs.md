# Source code: aspnetcore/tutorials/signalr-typescript-webpack/samples/2.x/Hubs/ChatHub.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRWebPack.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}

```
