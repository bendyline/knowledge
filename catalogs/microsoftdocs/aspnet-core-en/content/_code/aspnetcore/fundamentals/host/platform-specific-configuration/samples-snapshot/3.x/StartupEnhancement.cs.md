# Source code: aspnetcore/fundamentals/host/platform-specific-configuration/samples-snapshot/3.x/StartupEnhancement.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet1
[assembly: HostingStartup(typeof(StartupEnhancement.StartupEnhancementHostingStartup))]
#endregion

#region snippet2
namespace StartupEnhancement
{
    public class StartupEnhancementHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            // Use the IWebHostBuilder to add app enhancements.
        }
    }
}
#endregion

```
