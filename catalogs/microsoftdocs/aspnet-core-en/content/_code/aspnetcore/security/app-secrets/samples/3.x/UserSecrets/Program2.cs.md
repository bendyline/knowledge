# Source code: aspnetcore/security/app-secrets/samples/3.x/UserSecrets/Program2.cs

Complete source file; linked examples may select a region or line range.

```
#if never
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace UserSecrets
{
    #region snippet_Program
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureAppConfiguration((hostContext, builder) =>
                {
                    // Add other providers for JSON, etc.

                    if (hostContext.HostingEnvironment.IsDevelopment())
                    {
                        builder.AddUserSecrets<Program>();
                    }
                })
                .Build();
            
            host.Run();
        }
    }
    #endregion snippet_Program
}
#endif

```
