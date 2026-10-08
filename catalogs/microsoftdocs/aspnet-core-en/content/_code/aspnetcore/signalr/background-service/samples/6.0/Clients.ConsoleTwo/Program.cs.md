# Source code: aspnetcore/signalr/background-service/samples/6.0/Clients.ConsoleTwo/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Clients.ConsoleTwo;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

#region Program
var host = Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddConsole();
    })
    .ConfigureServices(services =>
    {
        services.AddHostedService<ClockHubClient>();
    })
    .Build();

host.Run();
#endregion

```
