# Source code: aspnetcore/security/authentication/social/additional-claims/samples/2.x/ClaimsSample/Areas/Identity/IdentityHostingStartup.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using ClaimsSample.Areas.Identity.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
                    .AddDefaultUI(UIFramework.Bootstrap4)
                    .AddEntityFrameworkStores<ClaimsSampleIdentityDbContext>();
            });
        }
    }
}
```
