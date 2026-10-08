# Source code: aspnetcore/security/authentication/customize-identity-model/samples/1.1/MvcSampleApp/Models/ApplicationRole.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MvcSampleApp.Models
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public string Description { get; set; }
    }
}

```
