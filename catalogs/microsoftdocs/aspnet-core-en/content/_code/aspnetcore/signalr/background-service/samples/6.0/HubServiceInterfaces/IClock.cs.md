# Source code: aspnetcore/signalr/background-service/samples/6.0/HubServiceInterfaces/IClock.cs

Complete source file; linked examples may select a region or line range.

```
namespace HubServiceInterfaces;

#region IClock
public interface IClock
{
    Task ShowTime(DateTime currentTime);
}
#endregion

```
