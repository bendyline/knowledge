# Source code: aspnetcore/fundamentals/error-handling/samples/5.x/ErrorHandlingSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ErrorHandlingSample
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
                    // webBuilder.UseStartup<StartupLambda>();
                    // webBuilder.UseStartup<StartupUseStatusCodePages>();
                    // webBuilder.UseStartup<StartupFormat>();
                    // webBuilder.UseStartup<StartupSCredirect>();
                    // webBuilder.UseStartup<StartupSCreX>();
                });
    }
}

```
