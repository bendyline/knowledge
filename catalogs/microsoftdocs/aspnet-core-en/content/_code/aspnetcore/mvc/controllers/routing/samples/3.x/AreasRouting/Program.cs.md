# Source code: aspnetcore/mvc/controllers/routing/samples/3.x/AreasRouting/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace AreasRouting
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
                    //webBuilder.UseStartup<Startup>();
                   // webBuilder.UseStartup<Startup2>();

                    // webBuilder.UseStartup<Startup4>();
                    //  webBuilder.UseStartup<Startup5>();
                      webBuilder.UseStartup<Startup3>();
                     //  webBuilder.UseStartup<Startup6>();



                });
    }
}

```
