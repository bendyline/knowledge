# Source code: aspnetcore/signalr/authn-and-authz/sample/EmailBasedUserIdProvider.cs

Complete source file; linked examples may select a region or line range.

```
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace SignalRAuthenticationSample
{
#region EmailBasedUserIdProvider
    public class EmailBasedUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Email)?.Value;
        }
    }
#endregion
}
```
