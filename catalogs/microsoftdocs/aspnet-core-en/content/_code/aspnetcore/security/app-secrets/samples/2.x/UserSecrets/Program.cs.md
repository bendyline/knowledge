# Source code: aspnetcore/security/app-secrets/samples/2.x/UserSecrets/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace UserSecrets
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        #region snippet_CreateWebHostBuilder
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        #endregion
    }
}

```
