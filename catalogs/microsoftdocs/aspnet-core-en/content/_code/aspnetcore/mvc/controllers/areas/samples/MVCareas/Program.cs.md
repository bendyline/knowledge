# Source code: aspnetcore/mvc/controllers/areas/samples/MVCareas/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace MVCareas
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                                       //  .UseStartup<Startup>();
                                         .UseStartup<StartupMapAreaRoute>();

    }
}

```
