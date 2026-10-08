# Source code: aspnetcore/signalr/groups/sample/CustomUserIdProvider.cs

Complete source file; linked examples may select a region or line range.

```
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

public class CustomUserIdProvider : IUserIdProvider
{
    public virtual string GetUserId(HubConnectionContext connection)
    {
        return connection.User?.FindFirst(ClaimTypes.Email)?.Value;
    }
}
```
