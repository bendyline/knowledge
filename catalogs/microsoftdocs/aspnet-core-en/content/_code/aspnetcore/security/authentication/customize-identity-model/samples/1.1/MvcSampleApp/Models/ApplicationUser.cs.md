# Source code: aspnetcore/security/authentication/customize-identity-model/samples/1.1/MvcSampleApp/Models/ApplicationUser.cs

Complete source file; linked examples may select a region or line range.

```
namespace MvcSampleApp.Models
{
    #region snippet_ApplicationUser
    using System;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class ApplicationUser : IdentityUser<Guid>
    {
        public string CustomTag { get; set; }        
    }
    #endregion
}

```
