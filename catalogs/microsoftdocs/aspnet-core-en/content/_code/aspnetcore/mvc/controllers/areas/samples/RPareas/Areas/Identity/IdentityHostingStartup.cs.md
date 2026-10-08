# Source code: aspnetcore/mvc/controllers/areas/samples/RPareas/Areas/Identity/IdentityHostingStartup.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RPareas.Data;

[assembly: HostingStartup(typeof(RPareas.Areas.Identity.IdentityHostingStartup))]
namespace RPareas.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}
```
