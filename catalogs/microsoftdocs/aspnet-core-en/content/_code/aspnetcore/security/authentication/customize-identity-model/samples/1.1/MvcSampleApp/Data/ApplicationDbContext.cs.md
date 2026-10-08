# Source code: aspnetcore/security/authentication/customize-identity-model/samples/1.1/MvcSampleApp/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using MvcSampleApp.Models;

namespace MvcSampleApp.Data
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
