# Source code: aspnetcore/security/authentication/social/additional-claims/samples/2.x/ClaimsSample/Areas/Identity/Data/ClaimsSampleIdentityDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ClaimsSample.Areas.Identity.Data
{
    public class ClaimsSampleIdentityDbContext : IdentityDbContext<IdentityUser>
    {
        public ClaimsSampleIdentityDbContext(DbContextOptions<ClaimsSampleIdentityDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}

```
