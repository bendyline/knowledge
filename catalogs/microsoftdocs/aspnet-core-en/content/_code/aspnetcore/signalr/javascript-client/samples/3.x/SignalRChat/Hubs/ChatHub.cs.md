# Source code: aspnetcore/signalr/javascript-client/samples/3.x/SignalRChat/Hubs/ChatHub.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        #region snippet_SendMessage
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        #endregion
    }
}

```
