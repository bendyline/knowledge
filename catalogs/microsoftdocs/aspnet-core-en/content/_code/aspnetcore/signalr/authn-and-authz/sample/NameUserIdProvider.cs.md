# Source code: aspnetcore/signalr/authn-and-authz/sample/NameUserIdProvider.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.SignalR;

namespace SignalRAuthenticationSample
{
#region NameUserIdProvider
    public class NameUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.Identity?.Name;
        }
    }
#endregion
}
```
