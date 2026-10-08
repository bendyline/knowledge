# Source code: aspnetcore/security/authentication/customize-identity-model/samples/2.0/RazorPagesSampleApp/Data/ApplicationRole.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Identity;

namespace RazorPagesSampleApp.Data
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public string Description { get; set; }
    }
}

```
