# Source code: aspnetcore/security/authentication/customize-identity-model/samples/2.1/RazorPagesSampleApp/Data/ApplicationUser.cs

Complete source file; linked examples may select a region or line range.

```
namespace RazorPagesSampleApp.Data
{
    #region snippet_ApplicationUser
    using System;
    using Microsoft.AspNetCore.Identity;
    
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string CustomTag { get; set; }
    }
    #endregion
}

```
