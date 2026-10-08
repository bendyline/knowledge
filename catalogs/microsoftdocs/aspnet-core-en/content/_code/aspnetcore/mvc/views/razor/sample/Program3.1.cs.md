# Source code: aspnetcore/mvc/views/razor/sample/Program3.1.cs

Complete source file; linked examples may select a region or line range.

```
#if V3
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace RazorSample
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
                    webBuilder.UseStartup<Startup31>();
                });
    }
}
#endif
```
