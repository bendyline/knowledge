# Source code: aspnetcore/mvc/views/partial/sample/PartialViewsSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace PartialViewsSample
{
    public class Program
    {
        public static void Main(string[] args) =>
            CreateWebHostBuilder(args).Build().Run();

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

```
