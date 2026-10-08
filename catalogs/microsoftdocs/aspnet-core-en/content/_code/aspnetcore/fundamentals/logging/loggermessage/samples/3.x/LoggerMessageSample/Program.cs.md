# Source code: aspnetcore/fundamentals/logging/loggermessage/samples/3.x/LoggerMessageSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace LoggerMessageSample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

```
