# Source code: aspnetcore/mvc/controllers/dependency-injection/sample/ControllerDI/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace ControllerDI
{
    #region snippet
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.AddJsonFile("samplewebsettings.json", 
                                    optional: false,        // File is not optional.
                                    reloadOnChange: false);
            })
            .UseStartup<Startup>();
    }
    #endregion
}

```
