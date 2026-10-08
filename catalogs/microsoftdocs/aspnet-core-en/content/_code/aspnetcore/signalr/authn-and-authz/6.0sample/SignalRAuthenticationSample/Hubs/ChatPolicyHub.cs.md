# Source code: aspnetcore/signalr/authn-and-authz/6.0sample/SignalRAuthenticationSample/Hubs/ChatPolicyHub.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SignalRAuthenticationSample.Hubs;
#region snippet
[Authorize("MyAuthorizationPolicy")]
public class ChatPolicyHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("ReceiveSystemMessage", 
                                    $"{Context.UserIdentifier} joined.");
        await base.OnConnectedAsync();
    }
    // Code removed for brevity.
    #endregion
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Clients.All.SendAsync("ReceiveSystemMessage",
                                    $"{Context.UserIdentifier} left.");
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendToUser(string user, string message)
    {
        await Clients.User(user).SendAsync("ReceiveDirectMessage",
                                           $"{Context.UserIdentifier}: {message}");
    }

    public async Task Send(string message)
    {
        await Clients.All.SendAsync("ReceiveChatMessage",
                                    $"{Context.UserIdentifier}: {message}");
    }
}


```
