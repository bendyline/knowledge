# Source code: aspnetcore/signalr/background-service/samples/2.2/HubServiceInterfaces/IClock.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;

namespace HubServiceInterfaces
{
#region IClock
    public interface IClock
    {
        Task ShowTime(DateTime currentTime);
    }
#endregion
}

```
