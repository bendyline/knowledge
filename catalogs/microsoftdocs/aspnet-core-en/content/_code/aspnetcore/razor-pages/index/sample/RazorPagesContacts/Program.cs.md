# Source code: aspnetcore/razor-pages/index/sample/RazorPagesContacts/Program.cs

Complete source file; linked examples may select a region or line range.

```
#define Debug

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace RazorPagesContacts
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
#if Debug
                .UseStartup<StartupDebug>()
#else
                .UseStartup<Startup>()
#endif
                .Build();
    }
}

```
