# Source code: aspnetcore/security/authentication/identity-configuration/sample/Areas/Identity/IdentityHostingStartup.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RPauth.Data;

[assembly: HostingStartup(typeof(RPauth.Areas.Identity.IdentityHostingStartup))]
namespace RPauth.Areas.Identity
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
