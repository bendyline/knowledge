# Source code: aspnetcore/mvc/advanced/app-parts/3.0sample1/WebAppParts/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace WebAppParts
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
                    webBuilder
                     .UseStartup<Startup>();
                    // .UseStartup<Startup2>();
                    //.UseStartup<StartupRm>();
                });
    }
}

```
