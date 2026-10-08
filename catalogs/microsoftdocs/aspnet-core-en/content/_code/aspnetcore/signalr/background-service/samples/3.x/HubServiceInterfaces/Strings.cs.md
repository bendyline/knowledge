# Source code: aspnetcore/signalr/background-service/samples/3.x/HubServiceInterfaces/Strings.cs

Complete source file; linked examples may select a region or line range.

```
namespace HubServiceInterfaces
{
    public static class Strings
    {
        public static string HubUrl => "https://localhost:5001/hubs/clock";

        public static class Events
        {
            public static string TimeSent => nameof(IClock.ShowTime);
        }
    }
}
```
