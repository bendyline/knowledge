# Source code: aspnetcore/fundamentals/websockets/samples/2.x/WebSocketsSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace EchoApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
              .UseStartup<Startup>();
    }
}

```
