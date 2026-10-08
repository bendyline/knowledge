# Source code: aspnetcore/security/authentication/social/additional-claims/samples/3.x/ClaimsSample/Areas/Identity/IdentityHostingStartup.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ClaimsSample.Areas.Identity.Data;

[assembly: HostingStartup(typeof(ClaimsSample.Areas.Identity.IdentityHostingStartup))]
namespace ClaimsSample.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<ClaimsSampleIdentityDbContext>(options => 
                    options.UseInMemoryDatabase("InMemoryDb"));

                services.AddDefaultIdentity<IdentityUser>()
                    .AddEntityFrameworkStores<ClaimsSampleIdentityDbContext>();
            });
        }
    }
}
```
