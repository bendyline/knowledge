# Source code: aspnetcore/release-notes/sample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.Extensions.Hosting;

namespace WebApplication61
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
        #region snippet
        public static IHostBuilder CreateHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    // ...
                    webBuilder.UseHttpSys(options =>
                    {
                        options.RequestQueueName = "MyExistingQueue";
                        options.RequestQueueMode = RequestQueueMode.CreateOrAttach;
                    });
                });
        #endregion

    }
}

```
