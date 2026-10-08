# Source code: aspnetcore/signalr/background-service/samples/3.x/Clients.ConsoleTwo/Program.cs

Complete source file; linked examples may select a region or line range.

```
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

 namespace Clients.ConsoleTwo
{
    class Program
    {
        public static void Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureLogging(logging =>
                {
                    logging.AddConsole();
                })
                .ConfigureServices((services) =>
                {
                    services.AddHostedService<ClockHubClient>();
                })
                .Build();

            host.Run();
        }
    }
}

```
