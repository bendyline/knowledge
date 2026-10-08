# Source code: aspnetcore/performance/caching/distributed/samples/5.x/DistCacheSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SampleApp
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
                    webBuilder.UseStartup<StartupRedis>();
                    //webBuilder.UseStartup<Startup>();
                });
    }
}

```
