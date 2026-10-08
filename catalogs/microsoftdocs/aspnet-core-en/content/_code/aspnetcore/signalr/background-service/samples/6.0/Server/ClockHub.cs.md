# Source code: aspnetcore/signalr/background-service/samples/6.0/Server/ClockHub.cs

Complete source file; linked examples may select a region or line range.

```
using HubServiceInterfaces;
using Microsoft.AspNetCore.SignalR;

namespace Server;

#region ClockHub
public class ClockHub : Hub<IClock>
{
    public async Task SendMyLocalTimeToOtherClients(DateTime dateTime)
    {
        await Clients.All.ShowTime(dateTime);
    }
}
#endregion

```
