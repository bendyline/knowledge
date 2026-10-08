# Source code: aspnetcore/signalr/background-service/samples/2.2/Server/ClockHub.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using HubServiceInterfaces;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Server
{
#region ClockHub
    public class ClockHub : Hub<IClock>
    {
        public async Task SendTimeToClients(DateTime dateTime)
        {
            await Clients.All.ShowTime(dateTime);
        }
    }
#endregion
}
```
