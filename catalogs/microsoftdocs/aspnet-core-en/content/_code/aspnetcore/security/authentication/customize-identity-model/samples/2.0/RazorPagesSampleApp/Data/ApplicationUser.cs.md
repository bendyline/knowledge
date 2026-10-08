# Source code: aspnetcore/security/authentication/customize-identity-model/samples/2.0/RazorPagesSampleApp/Data/ApplicationUser.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Identity;

namespace RazorPagesSampleApp.Data
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string CustomTag { get; set; }        
    }
}

```
