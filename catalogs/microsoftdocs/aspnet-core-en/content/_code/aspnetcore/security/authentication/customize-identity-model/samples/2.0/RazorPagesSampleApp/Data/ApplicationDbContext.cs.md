# Source code: aspnetcore/security/authentication/customize-identity-model/samples/2.0/RazorPagesSampleApp/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
namespace RazorPagesSampleApp.Data
{
    #region snippet_ApplicationDbContext
    using System;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : 
        IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
    #endregion
}

```
