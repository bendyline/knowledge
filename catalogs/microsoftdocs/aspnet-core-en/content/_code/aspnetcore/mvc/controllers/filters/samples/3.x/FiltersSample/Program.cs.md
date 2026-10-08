# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace FiltersSample
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
                    // webBuilder.UseStartup<StartupAF>();
                    //webBuilder.UseStartup<StartupAsync>();
                    //webBuilder.UseStartup<StartupRP>();
                    // webBuilder.UseStartup<StartupGF>();
                    //webBuilder.UseStartup<StartupOrder>();
                    // webBuilder.UseStartup<StartupOrder2>();
                    //webBuilder.UseStartup<Startup>();

                });
    }
}

```
